import {
  call,
  takeLeading,
  SagaGenerator,
  put,
  select,
  takeEvery,
  spawn,
  all
} from 'typed-redux-saga'

import { actions, PayloadTypes } from '@reducers/solanaWallet'
import { getConnection } from './connection'
import { getSolanaWallet, TokenProgramMap } from '@web3/solana/wallet'
import { Account, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { Token } from '@solana/spl-token'
import { network } from '@selectors/solanaConnection'
import { Status } from '@reducers/provider'
import { actions as uiActions } from '@reducers/ui'
import { PayloadAction } from '@reduxjs/toolkit'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { fetchRegisteredAddresses, fetchRegisteredTokens } from './nameService'
import { balance } from '@selectors/solanaWallet'
import { confirmTransaction } from './utils'
// import { createToken } from './token'

export function* getWallet(): SagaGenerator<Account> {
  const wallet = yield* call(getSolanaWallet)
  return wallet
}
export function* getBalance(pubKey: PublicKey): SagaGenerator<number> {
  const connection = yield* call(getConnection)
  const balance = yield* call([connection, connection.getBalance], pubKey)
  return balance
}
export function* handleTransaction(
  action: PayloadAction<PayloadTypes['addTransaction']>
): Generator {
  const connection = yield* call(getConnection)
  const wallet = yield* call(getWallet)
  // Send token
  try {
    if (action.payload.token && action.payload.accountAddress) {
      const signature = yield* call(
        sendToken,
        action.payload.accountAddress,
        action.payload.recipient,
        action.payload.amount * 1e9,
        action.payload.token
      )
      yield put(
        actions.setTransactionTxid({
          txid: signature,
          id: action.payload.id
        })
      )
    } else {
      // Send SOL
      const blockHash = yield* call([connection, connection.getRecentBlockhash])
      const myBalance = yield* select(balance)
      let amountToSend = 0
      if (myBalance <= action.payload.amount * 1e9 + blockHash.feeCalculator.lamportsPerSignature) {
        amountToSend = myBalance - blockHash.feeCalculator.lamportsPerSignature
      } else {
        amountToSend = action.payload.amount * 1e9
      }
      const signature = yield* call(
        confirmTransaction,
        connection,
        new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(action.payload.recipient),
            lamports: amountToSend
          })
        ),
        [wallet]
      )
      yield put(
        actions.setTransactionTxid({
          txid: signature,
          id: action.payload.id
        })
      )
      // Just to make sure we update balance
      const updatedBalance = yield* call(getBalance, wallet.publicKey)
      yield put(actions.setBalance(updatedBalance))
    }
  } catch (error) {
    yield put(
      snackbarsActions.add({
        message: 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
    yield put(
      actions.setTransactionError({
        error: error,
        id: action.payload.id
      })
    )
  }
}
interface IparsedTokenInfo {
  mint: string
  owner: string
  tokenAmount: {
    amount: string
    decimals: number
    uiAmount: number
  }
}
export function* fetchTokensAccounts(): Generator {
  const connection = yield* call(getConnection)
  const currentNetwork = yield* select(network)
  const wallet = yield* call(getWallet)
  const tokensAccounts = yield* call(
    [connection, connection.getParsedTokenAccountsByOwner],
    wallet.publicKey,
    {
      programId: new PublicKey(TokenProgramMap[currentNetwork])
    }
  )

  for (const account of tokensAccounts.value) {
    const info: IparsedTokenInfo = account.account.data.parsed.info
    yield put(
      actions.addTokenAccount({
        programId: info.mint,
        balance: parseInt(info.tokenAmount.amount),
        address: account.pubkey.toString(),
        decimals: info.tokenAmount.decimals
      })
    )
  }
}
interface ITokenInfo {
  decimals: number
  freezeAuthority: string | null
  isInitialized: boolean
  mintAuthority: string | null
  supply: string
}
// Takes kinda lot of time
export function* fetchGovernedTokens(): Generator {
  const connection = yield* call(getConnection)
  const currentNetwork = yield* select(network)
  const wallet = yield* call(getWallet)
  const info = yield* call(
    [connection, connection.getParsedProgramAccounts],
    new PublicKey(TokenProgramMap[currentNetwork])
  )
  for (const acc of info) {
    // @ts-expect-error
    const data = acc.account.data.parsed.info as ITokenInfo
    if (
      data.mintAuthority === wallet.publicKey.toString() ||
      data.freezeAuthority === wallet.publicKey.toString()
    ) {
      yield put(
        actions.addGovernedToken({
          network: currentNetwork,
          tokenData: {
            decimals: data.decimals,
            freezeAuthority: data.freezeAuthority,
            mintAuthority: data.mintAuthority,
            programId: acc.pubkey.toString(),
            supply: parseInt(data.supply)
          }
        })
      )
    }
  }
}
export function* getToken(tokenAddress: string): SagaGenerator<Token> {
  const connection = yield* call(getConnection)
  const wallet = yield* call(getWallet)
  const currentNetwork = yield* select(network)
  const token = new Token(
    connection,
    new PublicKey(tokenAddress),
    new PublicKey(TokenProgramMap[currentNetwork]),
    wallet
  )
  return token
}

export function* handleAirdrop(): Generator {
  const connection = yield* call(getConnection)
  const wallet = yield* call(getWallet)
  yield* call([connection, connection.requestAirdrop], wallet.publicKey, 6.9 * 1e9)
  yield put(
    snackbarsActions.add({
      message: 'You will soon receive airdrop',
      variant: 'success',
      persist: false
    })
  )
}
// export function* getTokenProgram(pubKey: PublicKey): SagaGenerator<number> {
//   const connection = yield* call(getConnection)
//   const balance = yield* call(, pubKey)
//   return balance
// }
export function* sendToken(
  from: string,
  target: string,
  amount: number,
  tokenAddress: string
): SagaGenerator<string> {
  const token = yield* call(getToken, tokenAddress)
  const wallet = yield* call(getWallet)
  const signature = yield* call(
    [token, token.transfer],
    new PublicKey(from),
    new PublicKey(target),
    wallet,
    [],
    amount
  )
  return signature
}
export function* createAccount(tokenAddress: string): SagaGenerator<string> {
  const token = yield* call(getToken, tokenAddress)
  const wallet = yield* call(getWallet)

  const address = yield* call([token, token.createAccount], wallet.publicKey)
  yield* put(
    actions.addTokenAccount({
      programId: tokenAddress,
      balance: 0,
      address: address.toString(),
      decimals: 9
    })
  )
  return address.toString()
}
export function* handleRescanTokens(): Generator {
  yield* put(uiActions.setLoader({ open: true, message: 'Rescaning Tokens' }))
  yield* call(fetchGovernedTokens)
  yield* put(uiActions.setLoader({ open: false, message: '' }))
}

export function* init(): Generator {
  yield put(actions.setStatus(Status.Init))
  const wallet = yield* call(getWallet)
  const balance = yield* call(getBalance, wallet.publicKey)
  yield* call(fetchTokensAccounts)

  yield put(actions.setAddress(wallet.publicKey.toString()))
  yield put(actions.setBalance(balance))
  yield put(actions.setStatus(Status.Initalized))
  yield* call(fetchRegisteredAddresses)
  yield* call(fetchRegisteredTokens)
}

export function* handleWalletInit(): Generator {
  yield* put(
    uiActions.setLoader({
      open: true,
      message: 'Loading wallet.'
    })
  )
  yield* call(init)
  yield* put(
    uiActions.setLoader({
      open: false,
      message: ''
    })
  )
  yield* put(
    snackbarsActions.add({
      message: 'Wallet loaded sucessfully',
      variant: 'info',
      persist: false
    })
  )
}

export function* aridropSaga(): Generator {
  yield takeLeading(actions.airdrop, handleAirdrop)
}
export function* rescanTokensSaga(): Generator {
  yield takeEvery(actions.rescanTokens, handleRescanTokens)
}
export function* transactionsSaga(): Generator {
  yield takeEvery(actions.addTransaction, handleTransaction)
}
export function* initSaga(): Generator {
  yield takeLeading(actions.initWallet, handleWalletInit)
}
export function* walletSaga(): Generator {
  yield all([transactionsSaga, initSaga, rescanTokensSaga, aridropSaga].map(spawn))
}

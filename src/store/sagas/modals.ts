import { call, put, takeEvery, spawn, all, select } from 'typed-redux-saga'

import { actions, PayloadTypes } from '@reducers/modals'
import { PayloadAction } from '@reduxjs/toolkit'
import { actions as snackbarsActions } from '@reducers/snackbars'
import { actions as walletActions } from '@reducers/solanaWallet'
import modalsSelectors from '@selectors/modals'
import { createAccount, getWallet } from './solana/wallet'
import { createToken, freezeAccount, mintToken, thawAccount } from './solana/token'
import { network } from '@selectors/solanaConnection'
import {
  confirmTransaction,
  createCleanAccountTransaction,
  sendSolTransaction
} from './solana/utils'
import {
  AccountNameServiceMap,
  ACCOUNT_NAME_STORAGE_SIZE,
  TokenNameServiceMap,
  TOKEN_NAME_STORAGE_SIZE
} from '@web3/solana/static'
import { PublicKey, Transaction } from '@solana/web3.js'
import { registerAccountTransaction, registerTokenTransaction } from './solana/nameService'
import { getConnection } from './solana/connection'

export function* handleCreateAccount(
  action: PayloadAction<PayloadTypes['createAccount']>
): Generator {
  try {
    const accountAddress = yield* call(createAccount, action.payload.tokenAddress)
    yield* put(
      actions.accountCreated({
        accountAddress: accountAddress
      })
    )
  } catch (error) {
    yield put(
      snackbarsActions.add({
        message: 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
    yield put(
      actions.accountCreatedError({
        error: error
      })
    )
  }
}
export function* handleCreateToken(action: PayloadAction<PayloadTypes['createToken']>): Generator {
  try {
    const connection = yield* call(getConnection)
    const wallet = yield* call(getWallet)
    const currentNetwork = yield* select(network)
    yield* put(
      actions.tokenCreateMessage({
        message: 'Creating token.'
      })
    )
    const tokenAddress = yield* call(
      createToken,
      action.payload.decimals,
      action.payload.freezeAuthority
    )
    if (action.payload.tokenName) {
      yield* put(
        actions.tokenCreateMessage({
          message: 'Registering Token.'
        })
      )
      const { transaction: storageAccountTx, storageAccount } = yield* call(
        createCleanAccountTransaction,
        TOKEN_NAME_STORAGE_SIZE,
        new PublicKey(TokenNameServiceMap[currentNetwork]),
        wallet
      )
      const sendSolTx = yield* call(sendSolTransaction, 1, storageAccount.publicKey, wallet)

      const registerTokenTx = yield* call(registerTokenTransaction, {
        name: action.payload.tokenName,
        tokenAddress: new PublicKey(tokenAddress),
        storageAccount: storageAccount.publicKey,
        wallet
      })
      yield* call(
        confirmTransaction,
        connection,
        new Transaction().add(storageAccountTx).add(sendSolTx).add(registerTokenTx),
        [wallet, storageAccount]
      )
    }
    yield* put(
      actions.tokenCreated({
        tokenAddress: tokenAddress
      })
    )
  } catch (error) {
    yield put(
      snackbarsActions.add({
        message: 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
    yield put(
      actions.tokenCreatedError({
        error: error
      })
    )
  }
}
export function* handleMintToken(action: PayloadAction<PayloadTypes['mintToken']>): Generator {
  try {
    const mintTokenData = yield* select(modalsSelectors.mintToken)
    const currNetwork = yield* select(network)
    yield* call(
      mintToken,
      mintTokenData.tokenAddress,
      action.payload.recipient,
      action.payload.amount * 10 ** mintTokenData.decimals
    )
    yield* put(
      actions.tokenMinted({
        txid: 'Tokens minted'
      })
    )
    yield* put(
      walletActions.increaseGovernedTokenSupply({
        network: currNetwork,
        tokenData: {
          programId: mintTokenData.tokenAddress,
          supply: action.payload.amount * 10 ** mintTokenData.decimals
        }
      })
    )
  } catch (error) {
    yield put(
      snackbarsActions.add({
        message: 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
    yield put(
      actions.tokenMintedError({
        error: error
      })
    )
  }
}
export function* handleFreezeAccount(
  action: PayloadAction<PayloadTypes['freezeAccount']>
): Generator {
  try {
    const mintTokenData = yield* select(modalsSelectors.freezeAccount)
    yield* call(freezeAccount, mintTokenData.tokenAddress, action.payload.accountToFreeze)
    yield* put(
      actions.accountFrozen({
        txid: 'Account has been frozen.'
      })
    )
  } catch (error) {
    yield put(
      snackbarsActions.add({
        message: 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
    yield put(
      actions.accountFrozenError({
        error: error
      })
    )
  }
}

export function* handleThawAccount(action: PayloadAction<PayloadTypes['thawAccount']>): Generator {
  try {
    const thawAccountData = yield* select(modalsSelectors.thawAccount)
    yield* call(thawAccount, thawAccountData.tokenAddress, action.payload.accountToThaw)
    yield* put(
      actions.accountThawed({
        txid: 'Account has been unfrozen.'
      })
    )
  } catch (error) {
    yield put(
      snackbarsActions.add({
        message: 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
    yield put(
      actions.accountThawedError({
        error: error
      })
    )
  }
}
export function* handleRegisterAccount(
  action: PayloadAction<PayloadTypes['registerAccount']>
): Generator {
  try {
    yield* put(
      actions.updateRegisterAccount({
        sending: true,
        message: 'Registering name.'
      })
    )
    const connection = yield* call(getConnection)
    const wallet = yield* call(getWallet)
    const currentNetwork = yield* select(network)

    const { transaction: storageAccountTx, storageAccount } = yield* call(
      createCleanAccountTransaction,
      ACCOUNT_NAME_STORAGE_SIZE,
      new PublicKey(AccountNameServiceMap[currentNetwork]),
      wallet
    )
    const sendSolTx = yield* call(sendSolTransaction, 1, storageAccount.publicKey, wallet)

    const registerAccountTx = yield* call(registerAccountTransaction, {
      name: action.payload.name,
      account: wallet.publicKey,
      storageAccount: storageAccount.publicKey
    })

    const txid = yield* call(
      confirmTransaction,
      connection,
      new Transaction().add(storageAccountTx).add(sendSolTx).add(registerAccountTx),
      [wallet, storageAccount]
    )
    yield* put(
      actions.updateRegisterAccount({
        sending: false,
        message: `Success Txid: ${txid}`
      })
    )
  } catch (error) {
    console.log(error)
    yield put(
      snackbarsActions.add({
        message: 'Failed to send. Please try again.',
        variant: 'error',
        persist: false
      })
    )
    yield put(
      actions.registerAccountError({
        error: error
      })
    )
  }
}

export function* thawAccountAction(): Generator {
  yield takeEvery(actions.thawAccount, handleThawAccount)
}
export function* registerAccountAction(): Generator {
  yield takeEvery(actions.registerAccount, handleRegisterAccount)
}
export function* createAccountAction(): Generator {
  yield takeEvery(actions.createAccount, handleCreateAccount)
}
export function* freezeAccountAction(): Generator {
  yield takeEvery(actions.freezeAccount, handleFreezeAccount)
}
export function* mintTokenAction(): Generator {
  yield takeEvery(actions.mintToken, handleMintToken)
}
export function* createTokenAction(): Generator {
  yield takeEvery(actions.createToken, handleCreateToken)
}
export function* modalsSaga(): Generator {
  yield all(
    [
      createAccountAction,
      createTokenAction,
      mintTokenAction,
      freezeAccountAction,
      thawAccountAction,
      registerAccountAction
    ].map(spawn)
  )
}

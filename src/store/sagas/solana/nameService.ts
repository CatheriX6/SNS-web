/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IAddressRecord, actions, ITokenRecord } from '@reducers/nameService'
import { network } from '@selectors/solanaConnection'
import { PublicKey, Transaction, TransactionInstruction, Account } from '@solana/web3.js'
import { parseTokenRegisterData, parseUserRegisterData } from '@web3/solana/data'
import {
  AccountNameServiceMap,
  CounterPointerAddressMap,
  CounterAddressMap,
  PAYMENT_ACCOUNT_ADDRESS,
  TokenNameServiceMap
} from '@web3/solana/static'
import { call, put, SagaGenerator, select } from 'typed-redux-saga'

import { getConnection } from './connection'

export function* fetchRegisteredAddresses(): Generator {
  const connection = yield* call(getConnection)
  const currentNetwork = yield* select(network)
  const info = yield* call(
    [connection, connection.getProgramAccounts],
    new PublicKey(AccountNameServiceMap[currentNetwork])
  )
  const accountsMaping: Map<string, IAddressRecord> = new Map()
  for (const record of info) {
    if (record.account.data.length === 73) {
      const parsedRecord = parseUserRegisterData(record.account.data)
      if (parsedRecord.initialized) {
        if (accountsMaping.has(parsedRecord.name)) {
          if (accountsMaping.get(parsedRecord.name)!.index > parsedRecord.index) {
            accountsMaping.set(parsedRecord.name, parsedRecord)
          }
        } else {
          accountsMaping.set(parsedRecord.name, parsedRecord)
        }
      }
    }
  }
  yield* put(actions.addAccounts(accountsMaping))
}

export function* fetchRegisteredTokens(): Generator {
  const connection = yield* call(getConnection)
  const currentNetwork = yield* select(network)
  const info = yield* call(
    [connection, connection.getProgramAccounts],
    new PublicKey(TokenNameServiceMap[currentNetwork])
  )
  const tokensMapping: Map<string, ITokenRecord> = new Map()
  for (const record of info) {
    if (record.account.data.length === 64) {
      const parsedRecord = parseTokenRegisterData(record.account.data)
      tokensMapping.set(parsedRecord.pubKey, parsedRecord)
    }
  }
  yield* put(actions.addTokens(tokensMapping))
}
interface IRegisterAccount {
  name: string
  account: PublicKey
  storageAccount: PublicKey
}
export function* registerAccountTransaction({
  name,
  account,
  storageAccount
}: IRegisterAccount): SagaGenerator<Transaction> {
  const currentNetwork = yield* select(network)
  const nameToRegister = Buffer.alloc(32)
  nameToRegister.write(name)
  const instructionData = Buffer.concat([account.toBuffer(), nameToRegister])
  return new Transaction().add(
    new TransactionInstruction({
      keys: [
        // This account must match one in smartcontract
        { pubkey: new PublicKey(PAYMENT_ACCOUNT_ADDRESS), isSigner: false, isWritable: true },
        // This account must match one in smartcontract
        {
          pubkey: new PublicKey(CounterPointerAddressMap[currentNetwork]),
          isSigner: false,
          isWritable: true
        },
        // This account must match one in smartcontract
        {
          pubkey: new PublicKey(CounterAddressMap[currentNetwork]),
          isSigner: false,
          isWritable: true
        },
        { pubkey: storageAccount, isSigner: false, isWritable: true }
      ],
      programId: new PublicKey(AccountNameServiceMap[currentNetwork]),
      data: instructionData
    })
  )
}
interface IRegisterToken {
  wallet: Account
  name: string
  tokenAddress: PublicKey
  storageAccount: PublicKey
}
export function* registerTokenTransaction({
  wallet,
  name,
  tokenAddress,
  storageAccount
}: IRegisterToken): SagaGenerator<Transaction> {
  const currentNetwork = yield* select(network)
  const instructionData = Buffer.alloc(32)
  instructionData.write(name)
  return new Transaction().add(
    new TransactionInstruction({
      keys: [
        // This account must match one in smartcontract
        { pubkey: new PublicKey(PAYMENT_ACCOUNT_ADDRESS), isSigner: false, isWritable: true },
        {
          pubkey: tokenAddress,
          isSigner: false,
          isWritable: true
        },
        {
          pubkey: wallet.publicKey,
          isSigner: true,
          isWritable: true
        },
        { pubkey: storageAccount, isSigner: false, isWritable: true }
      ],
      programId: new PublicKey(TokenNameServiceMap[currentNetwork]),
      data: instructionData
    })
  )
}

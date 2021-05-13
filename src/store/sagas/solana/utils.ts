/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/return-await */
import {
  Account,
  ConfirmOptions,
  Connection,
  PublicKey,
  SystemProgram,
  Transaction
} from '@solana/web3.js'

import { call, SagaGenerator } from 'typed-redux-saga'
import { getConnection } from './connection'

export async function confirmTransaction(
  connection: Connection,
  transaction: Transaction,
  signers: Account[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  options?: ConfirmOptions | undefined
): Promise<string> {
  const signature = await connection.sendTransaction(transaction, signers, {
    skipPreflight: true
  })
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef-init
    let timeout: number | undefined = undefined
    const id = connection.onSignature(
      signature,
      result => {
        console.log('confirm')
        if (timeout) clearTimeout(timeout)
        if (result.err) {
          reject(new Error('failed'))
        } else {
          resolve(signature)
        }
      },
      'singleGossip'
    )
    console.log(id)
    timeout = setTimeout(() => {
      connection.removeSignatureListener(id)
      reject(new Error('timeout'))
    }, 50000)
  })
}

export function* createCleanAccountTransaction(
  numBytes: number,
  programId: PublicKey,
  wallet: Account
): SagaGenerator<{ transaction: Transaction, storageAccount: Account }> {
  const connection = yield* call(getConnection)
  const dataAccount = new Account()
  const rentExemption = yield* call(
    [connection, connection.getMinimumBalanceForRentExemption],
    numBytes
  )

  return {
    transaction: new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: dataAccount.publicKey,
        lamports: rentExemption,
        space: numBytes,
        programId: programId
      })
    ),
    storageAccount: dataAccount
  }
}
export function* sendSolTransaction(
  amount: number,
  recipient: PublicKey,
  wallet: Account
): SagaGenerator<Transaction> {
  return new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: recipient,
      lamports: amount * 1e9
    })
  )
}

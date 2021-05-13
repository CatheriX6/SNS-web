import { IAddressRecord, ITokenRecord } from '@reducers/nameService'
import { PublicKey } from '@solana/web3.js'

export function parseTokenAccountData(data: Buffer) {
  const amountData = data.slice(64, 74)
  const amount = amountData.readUInt32LE(0) + amountData.readUInt32LE(4) * 2 ** 32
  return {
    token: new PublicKey(data.slice(0, 32)),
    owner: new PublicKey(data.slice(32, 64)),
    amount: amount
  }
}
export function parseUserRegisterData(data: Buffer): IAddressRecord {
  const indexData = data.slice(65, 73)
  const index = indexData.readUInt32LE(0) + indexData.readUInt32LE(4) * 2 ** 32
  return {
    pubKey: new PublicKey(data.slice(0, 32)).toString(),
    name: data.slice(32, 64).toString('utf8').replace(/\0/g, ''),
    initialized: Boolean(data.slice(64, 65).readUInt8(0)),
    index: index
  }
}
export function parseTokenRegisterData(data: Buffer): ITokenRecord {
  return {
    pubKey: new PublicKey(data.slice(0, 32)).toString(),
    name: data.slice(32, 64).toString('utf8').replace(/\0/g, '')
  }
}

import { PublicKey } from '@solana/web3.js'
import { SolanaNetworks } from './connection'

export const PAYMENT_ACCOUNT_ADDRESS = 'Gsun7cGFrSUm3N8TEBq7Uu9xz4c9cE4pKdbtETQiSgZX'
export const DEFAULT_PUBLIC_KEY = new PublicKey(Buffer.alloc(32))
// Programs
export const ACCOUNT_NAME_STORAGE_SIZE = 73
export const AccountNameServiceMap: { [key in SolanaNetworks]: string } = {
  [SolanaNetworks.DEV]: '3pheqxp6nsXKEZKaBvH6Gd7gVimkE9KBVT8naYY1KMJn',
  [SolanaNetworks.TEST]: 'GdpSvdF4MzHbe5Rtdiz1xGU2hLbHiLaop6Wxpq5eeULT',
  [SolanaNetworks.MAIN]: 'E5p8jKGv9PAmibUPzVnbhpWZitQvScCAenjT38MCAM6W'
}
export const CounterPointerAddressMap: { [key in SolanaNetworks]: string } = {
  [SolanaNetworks.DEV]: '8mV2uvKEwRaChCFeutCSsEJisq3SvuyKPvehRYG4cJj1',
  [SolanaNetworks.TEST]: '7r6unXmTmmSkAr3FJgXzHDgNjkp9EtgrN9rME3Ld1WyC',
  [SolanaNetworks.MAIN]: 'H4EsZEY38B5sRwDKuHoXehwPMYZ2EVHMs6M6tixTyEd6'
}
export const CounterAddressMap: { [key in SolanaNetworks]: string } = {
  [SolanaNetworks.DEV]: 'GboDAfZRQS3a7TaXzneSfPNYoKJuB3dHxp8EDQ5EZNpN',
  [SolanaNetworks.TEST]: '3UJD2eBn6hCZUsNkFK2VJbhZFQf5pVD4h86dMSV8mhBY',
  [SolanaNetworks.MAIN]: '3FK4yPChYY7RFZ27ZMe3ywB994WDiCB3k3ffRiVoAafr'
}
// Tokens
export const TOKEN_NAME_STORAGE_SIZE = 64
export const TokenNameServiceMap: { [key in SolanaNetworks]: string } = {
  [SolanaNetworks.DEV]: '7qYiprri3wMDKHKpnTakzDjHbKtkzePUDsnjCRvhkCx9',
  [SolanaNetworks.TEST]: 'i5zRfRzE1dDXN2AsCS1Ck3mAwVazCch9eyYrSYR8Z3X',
  [SolanaNetworks.MAIN]: 'CoqVKdyQWGE1siyuSj6Uvax2CZb4ikYrQ4Fm1yLYgtXN'
}

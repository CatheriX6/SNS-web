import { Connection } from '@solana/web3.js'

enum SolanaNetworks {
  DEV = 'https://devnet.solana.com',
  TEST = 'https://testnet.solana.com',
  MAIN = 'https://api.mainnet-beta.solana.com'
}
export const networkToName = (network: SolanaNetworks) => {
  switch (network) {
    case SolanaNetworks.DEV:
      return 'Devnet'

    case SolanaNetworks.TEST:
      return 'Testnet'

    case SolanaNetworks.MAIN:
      return 'Mainnet'

    default:
      return 'DEVNET'
  }
}
let _connection: Connection | null = null
let _network: SolanaNetworks

const getSolanaConnection = (url: SolanaNetworks): Connection => {
  if (_connection && _network === url) {
    return _connection
  }
  // Drop events on network change
  if (_connection) {
    // @ts-expect-error
    const programAccountSub: number = _connection._programAccountChangeSubscriptionCounter
    for (let index = 1; index <= programAccountSub; index++) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      _connection.removeProgramAccountChangeListener(index)
    }
    // @ts-expect-error
    const accountSub: number = _connection._accountChangeSubscriptionCounter
    for (let index = 1; index <= accountSub; index++) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      _connection.removeAccountChangeListener(index)
    }

    _connection = null
  }
  _connection = new Connection(url)
  _network = url
  return _connection
}
const getCurrentSolanaConnection = (): Connection | null => {
  return _connection
}

export { getSolanaConnection, SolanaNetworks, getCurrentSolanaConnection }

import React, { useState } from 'react'
import * as R from 'remeda'
import { useDispatch, useSelector } from 'react-redux'
import { accounts, address, status as walletStatus } from '@selectors/solanaWallet'
import { network, status } from '@selectors/solanaConnection'
import { actions } from '@reducers/solanaWallet'
import { AccountInfo, PublicKey } from '@solana/web3.js'
import { getSolanaConnection } from '@web3/solana/connection'
import { Status } from '@reducers/solanaConnection'
import { parseTokenAccountData } from '@web3/solana/data'

const SolanaWalletEvents = () => {
  const dispatch = useDispatch()
  const publicKey = useSelector(address)
  const currentNetwork = useSelector(network)
  const networkStatus = useSelector(status)
  // Solana Main Wallet
  React.useEffect(() => {
    const connection = getSolanaConnection(currentNetwork)
    if (!publicKey || !connection || networkStatus !== Status.Initalized) {
      return
    }
    const connectEvents = () => {
      connection.onAccountChange(new PublicKey(publicKey), (accountInfo: AccountInfo<Buffer>) => {
        dispatch(actions.setBalance(accountInfo.lamports))
        // console.log(accountInfo)
      })
    }
    connectEvents()
  }, [dispatch, publicKey, networkStatus, currentNetwork])

  // Solana Tokens
  const tokensAccounts = useSelector(accounts)
  const walletStat = useSelector(walletStatus)
  const [initializedAccounts, setInitializedAccounts] = useState<Set<string>>(new Set())
  React.useEffect(() => {
    const connection = getSolanaConnection(currentNetwork)
    if (!connection || walletStat !== Status.Initalized || networkStatus !== Status.Initalized) {
      return
    }
    const connectEvents = () => {
      const tempSet = new Set<string>()
      R.forEachObj(tokensAccounts, tokenAccounts => {
        for (const account of tokenAccounts) {
          tempSet.add(account.address)
          if (initializedAccounts.has(account.address)) {
            continue
          }
          connection.onAccountChange(
            new PublicKey(account.address),
            (accountInfo: AccountInfo<Buffer>) => {
              const parsedData = parseTokenAccountData(accountInfo.data)
              dispatch(
                actions.setTokenBalance({
                  address: account.address,
                  programId: parsedData.token.toString(),
                  balance: parsedData.amount
                })
              )
            }
          )
        }
      })
      setInitializedAccounts(tempSet)
    }
    connectEvents()
  }, [dispatch, tokensAccounts, networkStatus, walletStat, currentNetwork])

  return null
}

export default SolanaWalletEvents

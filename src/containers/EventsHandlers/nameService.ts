import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { network, status } from '@selectors/solanaConnection'
import { PublicKey } from '@solana/web3.js'
import { getSolanaConnection } from '@web3/solana/connection'
import { Status } from '@reducers/solanaConnection'
import { actions } from '@reducers/nameService'
import { actions as snackbarsActions } from '@reducers/snackbars'
import {
  parseTokenRegisterData,
  parseUserRegisterData
} from '@web3/solana/data'
import { AccountNameServiceMap, DEFAULT_PUBLIC_KEY, TokenNameServiceMap } from '@web3/solana/static'

const NameServiceEvents = () => {
  const dispatch = useDispatch()
  const networkStatus = useSelector(status)
  const currentNetwork = useSelector(network)
  React.useEffect(() => {
    const connection = getSolanaConnection(currentNetwork)
    if (!connection || networkStatus !== Status.Initalized) {
      return
    }
    const connectEvents = () => {
      // Account name service
      connection.onProgramAccountChange(
        new PublicKey(AccountNameServiceMap[currentNetwork]),
        accountInfo => {
          if (accountInfo.accountInfo.data.length === 73) {
            const record = parseUserRegisterData(accountInfo.accountInfo.data)
            if (record.initialized) {
              dispatch(actions.addNewAccount(record))
              dispatch(
                snackbarsActions.add({
                  message: `${record.name} just registered account.`,
                  variant: 'info',
                  persist: false
                })
              )
            }
          }
        }
      )
      // Token name service
      connection.onProgramAccountChange(
        new PublicKey(TokenNameServiceMap[currentNetwork]),
        accountInfo => {
          if (accountInfo.accountInfo.data.length === 64) {
            const record = parseTokenRegisterData(accountInfo.accountInfo.data)
            if (record.pubKey !== DEFAULT_PUBLIC_KEY.toString()) {
              dispatch(actions.addNewToken(record))
              dispatch(
                snackbarsActions.add({
                  message: `Token ${record.name} has been registered.`,
                  variant: 'info',
                  persist: false
                })
              )
            }
          }
        }
      )
    }
    connectEvents()
  }, [dispatch, networkStatus, currentNetwork])

  return null
}

export default NameServiceEvents

import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import SendMoneyModalComponent from '@components/Modals/SendMoneyModal/SendMoneyModal'
import { balance, transactions } from '@selectors/solanaWallet'
import { actions } from '@reducers/solanaWallet'
import { IAddressRecord } from '@reducers/nameService'
import { accounts } from '@selectors/nameService'

export interface ISendMoneyModal {
  open: boolean
  handleClose: () => void
  accounts?: Map<string, IAddressRecord>
}

export const SendMoneyModal: React.FC<ISendMoneyModal> = ({ open, handleClose }) => {
  const dispatch = useDispatch()
  const pendingTransactions = useSelector(transactions)
  const registeredAccounts = useSelector(accounts)
  const myBalance = useSelector(balance)
  const [random, setRandom] = useState(Math.random().toString())
  return (
    <SendMoneyModalComponent
      onSend={(amount: number, recipient: string) => {
        dispatch(actions.addTransaction({ amount, recipient, id: random }))
        setRandom(random)
      }}
      open={open}
      accounts={registeredAccounts}
      loading={pendingTransactions[random]?.sending || false}
      txid={pendingTransactions[random]?.txid}
      handleClose={() => {
        handleClose()
        setTimeout(() => {
          setRandom(Math.random().toString())
        }, 300)
      }}
      balance={myBalance / 10 ** 9}
    />
  )
}

export default SendMoneyModal

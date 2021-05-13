import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Account from '@components/Account/Account'
import { balance, address, myName } from '@selectors/solanaWallet'
import { actions } from '@reducers/solanaWallet'
import { actions as modalsActions } from '@reducers/modals'
import SendMoneyModal from '@containers/Modals/SendMoneyModal'
import { network } from '@selectors/solanaConnection'

export const AccountWrapper: React.FC = () => {
  const userAddress = useSelector(address)
  const userBalance = useSelector(balance)
  const currentNetwork = useSelector(network)
  const name = useSelector(myName)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  return (
    <>
      <SendMoneyModal
        handleClose={() => {
          setOpen(false)
        }}
        open={open}
      />
      <Account
        network={currentNetwork}
        address={userAddress}
        balance={userBalance}
        name={name}
        onSend={() => {
          setOpen(true)
        }}
        onRegister={() => {
          dispatch(modalsActions.openModal('registerAccount'))
        }}
        onAirdrop={() => {
          dispatch(actions.airdrop())
        }}
      />
    </>
  )
}

export default AccountWrapper

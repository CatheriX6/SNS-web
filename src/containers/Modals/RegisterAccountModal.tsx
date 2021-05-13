import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import RegisterAccountModalComponent from '@components/Modals/RegisterAccountModal/RegisterAccountModal'
import modalsSelectors from '@selectors/modals'
import { actions } from '@reducers/modals'
import { accounts } from '@selectors/nameService'

export const RegisterAccountModal: React.FC = () => {
  const dispatch = useDispatch()
  const registerAccount = useSelector(modalsSelectors.registerAccount)
  const registeredAccounts = useSelector(accounts)
  return (
    <RegisterAccountModalComponent
      onSend={(name: string) => {
        dispatch(actions.registerAccount({ name: name }))
      }}
      registeredAccounts={registeredAccounts}
      open={registerAccount.open}
      loading={registerAccount.sending}
      message={registerAccount.message}
      handleClose={() => {
        dispatch(actions.closeModal('registerAccount'))
        setTimeout(() => {
          dispatch(actions.resetModal('registerAccount'))
        }, 300)
      }}
    />
  )
}

export default RegisterAccountModal

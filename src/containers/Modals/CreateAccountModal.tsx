import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import CreateAccountModalComponent from '@components/Modals/CreateAccountModal/CreateAccountModal'
import modalsSelectors from '@selectors/modals'
import { actions } from '@reducers/modals'
import { tokens } from '@selectors/nameService'

export const CreateAccountModal: React.FC = () => {
  const dispatch = useDispatch()
  const createAccount = useSelector(modalsSelectors.createAccount)
  const registeredTokens = useSelector(tokens)
  return (
    <CreateAccountModalComponent
      onSend={(tokenAddress: string) => {
        dispatch(actions.createAccount({ tokenAddress: tokenAddress }))
      }}
      registeredTokens={registeredTokens}
      open={createAccount.open}
      loading={createAccount.sending}
      address={createAccount.accountAddress}
      handleClose={() => {
        dispatch(actions.closeModal('createAccount'))
        setTimeout(() => {
          dispatch(actions.resetModal('createAccount'))
        }, 300)
      }}
    />
  )
}

export default CreateAccountModal

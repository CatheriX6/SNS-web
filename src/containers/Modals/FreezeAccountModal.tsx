import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import FreezeAccountModalComponent from '@components/Modals/FreezeAccountModal/FreezeAccountModal'
import modalsSelectors from '@selectors/modals'
import { actions } from '@reducers/modals'

export const FreezeAccountModal: React.FC = () => {
  const dispatch = useDispatch()
  const freezeAccount = useSelector(modalsSelectors.freezeAccount)
  return (
    <FreezeAccountModalComponent
      onSend={(accountToFreeze: string) => {
        dispatch(actions.freezeAccount({ accountToFreeze }))
      }}
      open={freezeAccount.open}
      loading={freezeAccount.sending}
      txid={freezeAccount.txid}
      handleClose={() => {
        dispatch(actions.closeModal('freezeAccount'))
        setTimeout(() => {
          dispatch(actions.resetModal('freezeAccount'))
        }, 300)
      }}
    />
  )
}

export default FreezeAccountModal

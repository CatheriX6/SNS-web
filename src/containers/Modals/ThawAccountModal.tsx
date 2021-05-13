import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import ThawAccountModalComponent from '@components/Modals/ThawAccountModal/ThawAccountModal'
import modalsSelectors from '@selectors/modals'
import { actions } from '@reducers/modals'

export const ThawAccountModal: React.FC = () => {
  const dispatch = useDispatch()
  const thawAccount = useSelector(modalsSelectors.thawAccount)
  return (
    <ThawAccountModalComponent
      onSend={(accountToThaw: string) => {
        dispatch(actions.thawAccount({ accountToThaw }))
      }}
      open={thawAccount.open}
      loading={thawAccount.sending}
      txid={thawAccount.txid}
      handleClose={() => {
        dispatch(actions.closeModal('thawAccount'))
        setTimeout(() => {
          dispatch(actions.resetModal('thawAccount'))
        }, 300)
      }}
    />
  )
}

export default ThawAccountModal

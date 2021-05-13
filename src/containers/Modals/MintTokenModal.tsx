import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MintTokenModalComponent from '@components/Modals/MintTokenModal/MintTokenModal'
import modalsSelectors from '@selectors/modals'
import { actions } from '@reducers/modals'

export const MintTokenModal: React.FC = () => {
  const dispatch = useDispatch()
  const mintToken = useSelector(modalsSelectors.mintToken)
  return (
    <MintTokenModalComponent
      onSend={(recipient: string, amount: number) => {
        dispatch(actions.mintToken({ recipient, amount }))
      }}
      open={mintToken.open}
      loading={mintToken.sending}
      txid={mintToken.txid}
      handleClose={() => {
        dispatch(actions.closeModal('mintToken'))
        setTimeout(() => {
          dispatch(actions.resetModal('mintToken'))
        }, 300)
      }}
    />
  )
}

export default MintTokenModal

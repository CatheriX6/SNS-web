import React from 'react'

import Header from '@components/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { actions as uiActions } from '@reducers/ui'
import { navigation } from '@selectors/ui'
import { network } from '@selectors/solanaConnection'
import { actions } from '@reducers/solanaConnection'
import { SolanaNetworks } from '@web3/solana/connection'

export const HeaderWrapper: React.FC = () => {
  const dispatch = useDispatch()
  const currentNavigation = useSelector(navigation)
  const currentNetwork = useSelector(network)

  return (
    <Header
      onClickLogo={() => window.open('https://twitter.com/norbertbodziony')}
      onNetworkClick={(network: SolanaNetworks) => {
        if (network !== currentNetwork) {
          dispatch(actions.setNetwork(network))
        }
      }}
      currentNavigation={currentNavigation}
      network={currentNetwork}
      onNavigationChange={tab => {
        dispatch(uiActions.setNavigation(tab))
      }}
    />
  )
}

export default HeaderWrapper

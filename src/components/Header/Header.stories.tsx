import React from 'react'
import { storiesOf } from '@storybook/react'
import Header, { Tabs } from './Header'
import { withKnobs } from '@storybook/addon-knobs'
import { SolanaNetworks } from '@web3/solana/connection'

storiesOf('ui/Header', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const [tab, setTab] = React.useState(Tabs.Wallet)
    return (
      <Header
        onClickLogo={() => {}}
        network={SolanaNetworks.DEV}
        onNetworkClick={() => {}}
        currentNavigation={tab}
        onNavigationChange={setTab}
      />
    )
  })
  .add('connected', () => {
    const [tab, setTab] = React.useState(Tabs.Wallet)
    return (
      <Header
        onClickLogo={() => {}}
        onNetworkClick={() => {}}
        currentNavigation={tab}
        network={SolanaNetworks.MAIN}
        onNavigationChange={setTab}
      />
    )
  })

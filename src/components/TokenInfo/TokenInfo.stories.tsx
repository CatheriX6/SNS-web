import React from 'react'
import { storiesOf } from '@storybook/react'
import TokenInfo from './TokenInfo'
import { withKnobs } from '@storybook/addon-knobs'
storiesOf('ui/TokenInfo', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <TokenInfo
      supply={12432352533}
      decimals={9}
      userAddress='Ftp4xgTu55MDP1tLjhrSLHvCmTMkVj48dxnCzPUCL4yQ'
      address='Ftp4xgTu55MDP1tLjhrSLHvCmTMkVj48dxnCzPUCL4yQ'
      mintAuthority='Ftp4xgTu55MDP1tLjhrSLHvCmTMkVj48dxnCzPUCL4yQ'
      freezeAuthority='Ftp4xgTu55MDP1tLjhrSLHvCmTMkVj48dxnCzPUCL4yQ'
      onMint={() => {
        console.log('TokenInfo mint')
      }}
      onThaw={() => {
        console.log('TokenInfo mint')
      }}
      onFreeze={() => {
        console.log('TokenInfo freeze')
      }}
    />
  ))

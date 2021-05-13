import React from 'react'
import { storiesOf } from '@storybook/react'
import FreezeAccountModal from './FreezeAccountModal'
import { withKnobs, boolean } from '@storybook/addon-knobs'

storiesOf('modal/FreezeAccountModal', module)
  .addDecorator(withKnobs)

  .add('default', () => {
    return (
      <FreezeAccountModal
        loading={boolean('loading', false)}
        open
        handleClose={() => {
          console.log('close FreezeAccountModal')
        }}
        onSend={() => {
          console.log('send FreezeAccountModal')
        }}
      />
    )
  })
  .add('success', () => {
    return (
      <FreezeAccountModal
        loading={boolean('loading', false)}
        open
        txid='Account has been frozen.'
        handleClose={() => {
          console.log('close FreezeAccountModal')
        }}
        onSend={() => {
          console.log('send FreezeAccountModal')
        }}
      />
    )
  })

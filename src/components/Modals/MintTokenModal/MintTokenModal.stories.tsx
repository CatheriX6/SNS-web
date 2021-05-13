import React from 'react'
import { storiesOf } from '@storybook/react'
import MintTokenModal from './MintTokenModal'
import { withKnobs, boolean } from '@storybook/addon-knobs'

storiesOf('modal/MintTokenModal', module)
  .addDecorator(withKnobs)

  .add('default', () => {
    return (
      <MintTokenModal
        loading={boolean('loading', false)}
        open
        handleClose={() => {
          console.log('close MintTokenModal')
        }}
        onSend={() => {
          console.log('send MintTokenModal')
        }}
      />
    )
  })
  .add('success', () => {
    return (
      <MintTokenModal
        loading={boolean('loading', false)}
        open
        txid='CUTTyQkxPa6HaA1aLWqihmAv9S9ZES38TNXdPvfj8dh3'
        handleClose={() => {
          console.log('close MintTokenModal')
        }}
        onSend={() => {
          console.log('send MintTokenModal')
        }}
      />
    )
  })

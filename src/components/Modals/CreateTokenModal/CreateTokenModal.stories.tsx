import React from 'react'
import { storiesOf } from '@storybook/react'
import CreateToken from './CreateTokenModal'
import { withKnobs, boolean } from '@storybook/addon-knobs'

storiesOf('modal/CreateToken', module)
  .addDecorator(withKnobs)

  .add('default', () => {
    return (
      <CreateToken
        loading={boolean('loading', false)}
        open
        handleClose={() => {
          console.log('close CreateToken')
        }}
        onSend={() => {
          console.log('send CreateToken')
        }}
      />
    )
  })
  .add('success', () => {
    return (
      <CreateToken
        loading={boolean('loading', false)}
        open
        address='CUTTyQkxPa6HaA1aLWqihmAv9S9ZES38TNXdPvfj8dh3'
        handleClose={() => {
          console.log('close CreateToken')
        }}
        onSend={() => {
          console.log('send CreateToken')
        }}
      />
    )
  })

import React from 'react'
import { storiesOf } from '@storybook/react'
import RegisterAccountModal from './RegisterAccountModal'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { IAddressRecord } from '@reducers/nameService'

storiesOf('modal/RegisterAccountModal', module)
  .addDecorator(withKnobs)

  .add('default', () => {
    return (
      <RegisterAccountModal
        loading={boolean('loading', false)}
        open
        handleClose={() => {
          console.log('close RegisterAccountModal')
        }}
        onSend={() => {
          console.log('send RegisterAccountModal')
        }}
        registeredAccounts={new Map<string, IAddressRecord>()}
      />
    )
  })
  .add('success', () => {
    return (
      <RegisterAccountModal
        loading={boolean('loading', false)}
        open
        message='Done'
        registeredAccounts={new Map<string, IAddressRecord>()}
        handleClose={() => {
          console.log('close RegisterAccountModal')
        }}
        onSend={() => {
          console.log('send RegisterAccountModal')
        }}
      />
    )
  })

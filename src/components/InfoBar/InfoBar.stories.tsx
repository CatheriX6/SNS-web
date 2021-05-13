import React from 'react'
import { storiesOf } from '@storybook/react'
import InfoBar from './InfoBar'
import { withKnobs } from '@storybook/addon-knobs'
storiesOf('Bars/InfoBar', module)
  .addDecorator(withKnobs)
  .add('default', () => <InfoBar message='To access this page you need MetaMask extension' />)

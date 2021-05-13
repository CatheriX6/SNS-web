import React from 'react'
import { storiesOf } from '@storybook/react'
import Footer from './Footer'
import { withKnobs } from '@storybook/addon-knobs'
storiesOf('ui/Footer', module)
  .addDecorator(withKnobs)
  .add('default', () => <Footer />)

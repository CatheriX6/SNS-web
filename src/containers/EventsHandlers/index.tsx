import React from 'react'
import NameServiceEvents from './nameService'
import SolanaWalletEvents from './solanaWallet'

const EventHandler = () => {
  return (
    <>
      <SolanaWalletEvents />
      <NameServiceEvents />
    </>
  )
}

export default EventHandler

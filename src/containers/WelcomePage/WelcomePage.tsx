import React from 'react'
import Grid from '@material-ui/core/Grid'
import InfoBar from '@components/InfoBar/InfoBar'
import { useSelector, useDispatch } from 'react-redux'
import providerSelectors from '@selectors/providers'
import solanaConnectionSelector from '@selectors/solanaConnection'
// import { actions as providerActions } from '@reducers/provider'
import { actions as solanaConnectionActions } from '@reducers/solanaConnection'
import EventsHandlers from '@containers/EventsHandlers'
import { Status } from '@reducers/signer'
import PageSkeleton from '@components/PageSkeleton/PageSkeleton'
import Header from '@containers/HeaderWrapper/HeaderWrapper'

import useStyles from './style'
import WalletPage from '@containers/WalletPage/WalletPage'
import { navigation } from '@selectors/ui'
import { Tabs } from '@components/Header/Header'
import ManageTokens from '@containers/ManageTokens/ManageTokens'
import Footer from '@components/Footer/Footer'

const WelcomePage: React.FC = () => {
  const classes = useStyles()
  const initialized = useSelector(providerSelectors.status)
  const message = useSelector(providerSelectors.message)
  const signerStatus = useSelector(solanaConnectionSelector.status)
  const currentNavigation = useSelector(navigation)
  const dispatch = useDispatch()
  React.useEffect(() => {
    // dispatch(providerActions.initProvider())
    dispatch(solanaConnectionActions.initSolanaConnection())
  }, [dispatch])
  const getComponent = (tab: Tabs) => {
    switch (tab) {
      case Tabs.Wallet:
        return <WalletPage />
      case Tabs.ManageTokens:
        return <ManageTokens />
      default:
        return <WalletPage />
    }
  }
  return (
    <Grid container direction='column' className={classes.background} justify='space-between'>
      <Grid item>
        <Grid item>
          <InfoBar message={message} initialized={initialized} />
        </Grid>
        <Grid item>
          <Header />
        </Grid>
        <Grid item>
          {signerStatus === Status.Initalized ? getComponent(currentNavigation) : <PageSkeleton />}
        </Grid>
      </Grid>
      <Grid item>
        <Footer></Footer>
      </Grid>
      {signerStatus === Status.Initalized && <EventsHandlers />}
    </Grid>
  )
}

export default WelcomePage

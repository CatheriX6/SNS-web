import React, { useState } from 'react'
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Drawer,
  Grid,
  Typography
} from '@material-ui/core'
import CommonButton from '@components/CommonButton/CommonButton'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import AppsIcon from '@material-ui/icons/Apps'
import { networkToName, SolanaNetworks } from '@web3/solana/connection'
import BlurOnIcon from '@material-ui/icons/BlurOn'
import NebulaIcon from '@static/svg/nebula.svg'

import useStyles from './style'

export enum Tabs {
  Wallet = 'Wallet',
  ManageTokens = 'ManageTokens'
}
export interface IHeader {
  onClickLogo: () => void
  onNetworkClick: (network: SolanaNetworks) => void
  network: SolanaNetworks
  onNavigationChange: (tabName: Tabs) => void
  currentNavigation: Tabs
}
export const Header: React.FC<IHeader> = ({
  onClickLogo,
  onNetworkClick,
  onNavigationChange,
  currentNavigation,
  network
}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  // Artist: https://www.flaticon.com/authors/photo3idea-studio
  return (
    <>
      <Grid container className={classes.root} wrap='nowrap' justify='space-between' alignItems='center'>
        <Grid item>
          <Grid container alignItems='center' className={classes.logoDiv} onClick={onClickLogo}>
            <Grid item>
              <img src={NebulaIcon} alt='' className={classes.nebulaLogo} />
            </Grid>
            <Grid item>
              <Typography variant='h3' color='primary' className={classes.title}>
                Nebula Wallet
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <BottomNavigation
            value={currentNavigation}
            onChange={(_, newValue) => {
              onNavigationChange(newValue as Tabs)
            }}
            showLabels
            className={classes.navigationRoot}>
            <BottomNavigationAction
              label={Tabs.Wallet}
              icon={<AccountBalanceWalletIcon fontSize='large' />}
              color='primary'
              value={Tabs.Wallet}
              classes={{
                root: classes.navigationTab,
                selected: classes.navigationTabSelected,
                label: classes.navigationTabLabel
              }}
            />
            <BottomNavigationAction
              label={'Manage'}
              value={Tabs.ManageTokens}
              icon={<AppsIcon fontSize='large' />}
              classes={{
                root: classes.navigationTab,
                selected: classes.navigationTabSelected,
                label: classes.navigationTabLabel
              }}
            />
          </BottomNavigation>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item className={classes.divButton}>
              <CommonButton
                className={classes.button}
                name={networkToName(network)}
                startIcon={<BlurOnIcon style={{ fontSize: 27 }} />}
                onClick={() => {
                  setOpen(true)
                }}></CommonButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Drawer
        anchor='right'
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        classes={{ paper: classes.drawer }}>
        <Grid container direction='column' justify='center' alignItems='center'>
          <Grid item className={classes.drawerTitleDiv}>
            <Typography variant='body1' color='textPrimary' className={classes.drawerTitle}>
              Select network:
            </Typography>
          </Grid>
          <Grid item className={classes.networkButtonDiv}>
            <Button
              variant='outlined'
              onClick={() => {
                onNetworkClick(SolanaNetworks.MAIN)
                setOpen(false)
              }}
              className={
                network === SolanaNetworks.MAIN
                  ? classes.networkButton
                  : classes.networkButtonDisabled
              }>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant='body2'>Mainnet:</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6'>{SolanaNetworks.MAIN}</Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
          <Grid item className={classes.networkButtonDiv}>
            <Button
              variant='outlined'
              onClick={() => {
                onNetworkClick(SolanaNetworks.TEST)
                setOpen(false)
              }}
              className={
                network === SolanaNetworks.TEST
                  ? classes.networkButton
                  : classes.networkButtonDisabled
              }>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant='body2'>Testnet:</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6'>{SolanaNetworks.TEST}</Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
          <Grid item className={classes.networkButtonDiv}>
            <Button
              variant='outlined'
              onClick={() => {
                onNetworkClick(SolanaNetworks.DEV)
                setOpen(false)
              }}
              className={
                network === SolanaNetworks.DEV
                  ? classes.networkButton
                  : classes.networkButtonDisabled
              }>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant='body2'>Devnet:</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='h6'>{SolanaNetworks.DEV}</Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
        </Grid>
      </Drawer>
    </>
  )
}
export default Header

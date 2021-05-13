import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
import SolanaIcon from '@static/svg/solana.svg'
import CommonButton from '@components/CommonButton/CommonButton'
import { SolanaNetworks } from '@web3/solana/connection'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import NearMeIcon from '@material-ui/icons/NearMe'
import FlightIcon from '@material-ui/icons/Flight'
import CopyToolTip from '@components/CopyToolTip/CopyToolTip'
export interface IProps {
  address: string
  balance: number
  onSend: () => void
  onAirdrop?: () => void
  onRegister: () => void
  network: SolanaNetworks
  name: string | undefined
}
export const Account: React.FC<IProps> = ({
  address,
  balance,
  onSend,
  network,
  onAirdrop,
  name,
  onRegister
}) => {
  const classes = useStyles()
  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.titleDiv}>
          <Grid
            container
            justify='space-between'
            alignItems='center'
            className={classes.titleContainer}>
            <Grid item>
              <Typography variant='h4' color='primary' className={classes.title}>
                Account
              </Typography>
            </Grid>
            <Grid item>
              {name ? (
                <Typography variant='h4' color='textPrimary'>
                  Your nickname: <span className={classes.nickname}>{name}</span>
                </Typography>
              ) : (
                <CommonButton
                  name='Register alias'
                  className={classes.registerButton}
                  onClick={() => {
                    onRegister()
                  }}
                  startIcon={<VerifiedUserIcon style={{ fontSize: 27 }} />}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container className={classes.info}>
            <Grid item xs={12}>
              <Grid container direction='row'>
                <Grid item>
                  <div className={classes.solanaLogoDiv}>
                    <img src={SolanaIcon} alt='' className={classes.solanaLogo} />
                  </div>
                </Grid>
                <Grid item xs>
                  <Grid container>
                    <Grid item xs={12}>
                      <Grid
                        container
                        direction='row'
                        justify='space-between'
                        className={classes.data}>
                        <Grid item>
                          <Typography variant='body1' color='textPrimary'>
                            Balance
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant='body1' color='textPrimary'>
                            {balance / 1e9} SOL
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container direction='row' justify='space-between'>
                        <Grid item>
                          <Typography variant='body1' color='textPrimary'>
                            Address
                          </Typography>
                        </Grid>
                        <Grid item xs className={classes.addressDiv}>
                          <CopyToolTip text={address}>
                            <Typography
                              variant='body1'
                              color='textPrimary'
                              className={classes.address}>
                              {address}
                            </Typography>
                          </CopyToolTip>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.buttonDiv}>
                      <Grid container justify='flex-end' wrap='nowrap'>
                        {network !== SolanaNetworks.MAIN && (
                          <Grid item>
                            <CommonButton
                              name='airdrop'
                              className={classes.airdropButton}
                              onClick={onAirdrop}
                              startIcon={<FlightIcon style={{ fontSize: 24 }} />}
                            />
                          </Grid>
                        )}
                        <Grid item>
                          <CommonButton
                            name='send'
                            onClick={onSend}
                            startIcon={<NearMeIcon style={{ fontSize: 24 }} />}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
export default Account

import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import useStyles from './style'
import Warrning from '@static/svg/Warrning.svg'
import { Status } from '@reducers/provider'
export interface IProps {
  message: string
  initialized?: Status
}
export const InfoBar: React.FC<IProps> = ({ message, initialized }) => {
  const classes = useStyles()
  return (
    <>
      {message && (
        <Grid
          container
          className={classes.root}
          justify='center'
          alignItems='center'
          style={initialized === Status.Error ? { cursor: 'pointer' } : {}}
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            initialized === Status.Error ? window.open('https://metamask.io/download.html') : null
          }}>
          <Grid item className={classes.icon}>
            <img src={Warrning} alt='' />
          </Grid>
          <Grid item>
            <Typography className={classes.text} variant='body1' color='textPrimary'>
              {message}
            </Typography>
          </Grid>
          <Grid item>
            <img src={Warrning} alt='' />
          </Grid>
        </Grid>
      )}
    </>
  )
}
export default InfoBar

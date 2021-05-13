import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { ReactComponent as TwitterIcon } from '@static/svg/twitter-ic-footer.svg'
import { ReactComponent as GithubIcon } from '@static/svg/github-ic-footer.svg'
import { ReactComponent as LinkedinIcFooter } from '@static/svg/linkedin-ic-footer.svg'
import { social } from '@static/links'
import useStyles from './style'

export const Footer: React.FC = () => {
  const classes = useStyles()
  return (
    <Grid container className={classes.root} justify='center'>
      <Grid item xs={12} className={classes.content}>
        <Grid container xs={12} justify='space-between' spacing={4}>
          <Grid item xs={8}>
            <Grid container direction='column'>
              <Grid item>
                <Typography variant='h4' color='textPrimary'>
                  This is experimental version of wallet.
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='h4' color='textPrimary'>
                  Please use at your own risk.
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: 8 }}>
                <TwitterIcon
                  className={classes.icon}
                  onClick={() => window.open(social.nebulaTwitter)}></TwitterIcon>
                <GithubIcon
                  className={classes.icon}
                  style={{ marginLeft: 16 }}
                  onClick={() => window.open(social.nebulaGithub)}></GithubIcon>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction='column'>
              <Grid item>
                <Typography variant='h4' color='textPrimary'>
                  Created by
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='h4' color='textPrimary'>
                  Norbert Bodziony
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: 8 }}>
                <TwitterIcon
                  className={classes.icon}
                  onClick={() => window.open(social.twitter)}></TwitterIcon>
                <GithubIcon
                  className={classes.icon}
                  style={{ marginLeft: 16 }}
                  onClick={() => window.open(social.github)}></GithubIcon>
                <LinkedinIcFooter
                  className={classes.icon}
                  style={{ marginLeft: 16 }}
                  onClick={() => window.open(social.linkedin)}></LinkedinIcFooter>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default Footer

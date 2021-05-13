/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { accountsArray } from '@selectors/solanaWallet'
import { actions } from '@reducers/modals'
import nameServiceSelectors from '@selectors/nameService'
import { useDispatch, useSelector } from 'react-redux'
import Token from './Token/Token'
import CommonButton from '@components/CommonButton/CommonButton'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'
import useStyles from './style'

export const Tokens: React.FC = () => {
  const classes = useStyles()
  const userTokens = useSelector(accountsArray)
  const registeredTokens = useSelector(nameServiceSelectors.tokens)
  const dispatch = useDispatch()
  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12} className={classes.titleDiv}>
          <Grid container justify='space-between' alignItems='center'>
            <Grid item>
              <Typography variant='h4' color='primary' className={classes.title}>
                Your tokens
              </Typography>
            </Grid>
            <Grid item>
              <CommonButton
                name='Add Account'
                className={classes.addAccountButton}
                onClick={() => {
                  dispatch(actions.openModal('createAccount'))
                }}
                startIcon={<PlaylistAddIcon style={{ fontSize: 27 }} />}
              />
            </Grid>
          </Grid>
        </Grid>

        {userTokens.length === 0 ? (
          <>
            <Grid item xs={12} className={classes.noTokensDiv}>
              <Grid container direction='column' alignItems='center' justify='center'>
                <Grid item>
                  <Typography variant='h4' color='textPrimary'>
                    You don't have any token accounts.
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant='h4' color='textPrimary'>
                    You can create one for registered tokens or provide address of token.
                  </Typography>
                </Grid>
                <Grid item style={{ width: '100%', marginTop: 24 }}>
                  <Grid container wrap='nowrap' justify='center'>
                    <Grid item>
                      <CommonButton
                        name='Add Account'
                        className={classes.addAccountButton}
                        onClick={() => {
                          dispatch(actions.openModal('createAccount'))
                        }}
                        startIcon={<PlaylistAddIcon style={{ fontSize: 27 }} />}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid item xs={12} style={{ overflowX: 'scroll' }}>
            <Grid container className={classes.info}>
              <Grid item xs={12} className={classes.headers}>
                <Grid container style={{ flexWrap: 'nowrap' }}>
                  <Grid item xs={4}>
                    <Typography variant='body1' color='textPrimary'>
                      Account
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant='body1' color='textPrimary'>
                      Token
                    </Typography>
                  </Grid>
                  <Grid item xs className={classes.balanceDiv}>
                    <Typography variant='body1' color='textPrimary'>
                      Balance
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {userTokens
                .sort((a, b) => b.balance - a.balance)
                .map(token => (
                  <Token token={token} tokenName={registeredTokens.get(token.programId)?.name} />
                ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  )
}
export default Tokens

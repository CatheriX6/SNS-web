import React, { useEffect, useState } from 'react'

import { FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { address, currentGovernedTokens } from '@selectors/solanaWallet'
import { actions } from '@reducers/modals'
import { actions as walletActions } from '@reducers/solanaWallet'
import TokenInfo from '@components/TokenInfo/TokenInfo'
import CommonButton from '@components/CommonButton/CommonButton'
import RotateLeftIcon from '@material-ui/icons/RotateLeft'
import NoteAddIcon from '@material-ui/icons/NoteAdd'
import useStyles from './style'

const ManageTokensPage: React.FC = () => {
  const classes = useStyles()
  const tokens = useSelector(currentGovernedTokens)
  const userAddress = useSelector(address)
  const dispatch = useDispatch()
  const [selectedToken, setSelectedToken] = useState(tokens[0] || null)
  useEffect(() => {
    if (tokens.length > 0) {
      if (selectedToken === null) {
        setSelectedToken(tokens[0])
      } else {
        const tokenUpdated = tokens.find(token => token.programId === selectedToken.programId)
        if (tokenUpdated) {
          setSelectedToken(tokenUpdated)
        }
      }
    }
  }, [tokens])
  return (
    <Grid container className={classes.contentContainer} justify='center'>
      <Grid item xs={12} className={classes.contentWrapper}>
        <Grid container className={classes.root}>
          <Grid item xs={12} className={classes.titleDiv}>
            <Grid container justify='space-between' alignItems='center'>
              <Grid item>
                <Typography variant='h4' color='primary' className={classes.title}>
                  Manage tokens
                </Typography>
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item className={classes.headerButtonDiv}>
                    <CommonButton
                      name='Rescan'
                      className={classes.rescanButton}
                      onClick={() => {
                        dispatch(walletActions.rescanTokens())
                      }}
                      startIcon={<RotateLeftIcon style={{ fontSize: 27 }} />}
                    />
                  </Grid>
                  <Grid item>
                    <CommonButton
                      name='Create Token'
                      className={classes.createTokenButton}
                      onClick={() => {
                        dispatch(actions.openModal('createToken'))
                      }}
                      startIcon={<NoteAddIcon style={{ fontSize: 27 }} />}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {selectedToken === null ? (
            <>
              <Grid item xs={12} className={classes.noTokensDiv}>
                <Grid container direction='column' alignItems='center' justify='center'>
                  <Grid item>
                    <Typography variant='h3' color='textPrimary'>
                      You don't control any tokens.
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='h3' color='textPrimary'>
                      Try rescaning network or create new token.
                    </Typography>
                  </Grid>
                  <Grid item style={{ width: '100%' }}>
                    <Grid
                      container
                      spacing={4}
                      wrap='nowrap'
                      justify='center'
                      className={classes.noTokenActionsDiv}>
                      <Grid item>
                        <CommonButton
                          name='Rescan Tokens'
                          className={classes.rescanButton}
                          onClick={() => {
                            dispatch(walletActions.rescanTokens())
                          }}
                          startIcon={<RotateLeftIcon style={{ fontSize: 45 }} />}
                        />
                      </Grid>
                      <Grid item>
                        <CommonButton
                          name='Create Token'
                          className={classes.createTokenButton}
                          onClick={() => {
                            dispatch(actions.openModal('createToken'))
                          }}
                          startIcon={<NoteAddIcon style={{ fontSize: 45 }} />}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12}>
                <FormControl variant='outlined' className={classes.selectedTokenDiv}>
                  <InputLabel className={classes.selectLabel}>Selected token</InputLabel>
                  <Select
                    value={selectedToken.programId}
                    onChange={e => {
                      const token = tokens.find(t => t.programId === (e.target.value as string))
                      if (token) {
                        setSelectedToken(token)
                      }
                    }}
                    label='Selected token'
                    MenuProps={{ classes: { paper: classes.selectMenu } }}
                    classes={{ icon: classes.iconSelect }}>
                    {tokens.map(token => (
                      <MenuItem
                        id={token.programId}
                        value={token.programId}
                        className={classes.optionDiv}>
                        <Grid container justify='space-between' wrap='nowrap'>
                          <Grid item xs={8} className={classes.address}>
                            {token.tokenName || token.programId}
                          </Grid>
                          <Grid item> Supply: {token.supply / 10 ** token.decimals} </Grid>
                        </Grid>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} className={classes.tokenInfo}>
                <TokenInfo
                  address={selectedToken.programId}
                  freezeAuthority={selectedToken.freezeAuthority}
                  decimals={selectedToken.decimals}
                  mintAuthority={selectedToken.mintAuthority}
                  supply={selectedToken.supply}
                  userAddress={userAddress}
                  tokenName={selectedToken.tokenName}
                  onMint={() => {
                    dispatch(
                      actions.openMintToken({
                        tokenAddress: selectedToken.programId,
                        decimals: selectedToken.decimals
                      })
                    )
                  }}
                  onFreeze={() => {
                    dispatch(
                      actions.openFreezeAccount({
                        tokenAddress: selectedToken.programId
                      })
                    )
                  }}
                  onThaw={() => {
                    dispatch(
                      actions.openThawAccount({
                        tokenAddress: selectedToken.programId
                      })
                    )
                  }}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ManageTokensPage

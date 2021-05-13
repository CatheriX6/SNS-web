import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import SendMoneyModalComponent from '@components/Modals/SendMoneyModal/SendMoneyModal'
import { transactions } from '@selectors/solanaWallet'
import { actions, ITokenAccount } from '@reducers/solanaWallet'
import useStyles from './style'
import CommonButton from '@components/CommonButton/CommonButton'
import { Grid, Typography } from '@material-ui/core'
import { actions as snackbarsActions } from '@reducers/snackbars'
import CopyToolTip from '@components/CopyToolTip/CopyToolTip'

export interface ISendMoneyModal {
  token: ITokenAccount
  tokenName?: string
}
export const Token: React.FC<ISendMoneyModal> = ({ token, tokenName }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const pendingTransactions = useSelector(transactions)
  const [random, setRandom] = useState(Math.random().toString())
  const [open, setOpen] = useState(false)
  return (
    <Grid item xs={12} className={classes.tokenDiv}>
      <Grid container alignItems='center' style={{ flexWrap: 'nowrap' }}>
        <Grid item xs={4}>
          <CopyToolTip text={token.address}>
            <Typography variant='h6' color='textPrimary' className={classes.field}>
              {token.address}
            </Typography>
          </CopyToolTip>
        </Grid>
        <Grid item xs={4}>
          <Grid container direction='row'>
            {tokenName && (
              <Grid item>
                <Typography variant='h5' color='textPrimary' className={classes.tokenName}>
                  {tokenName}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <CopyToolTip text={token.programId}>
                <Typography variant='h6' color='textPrimary' className={classes.field}>
                  {token.programId}
                </Typography>
              </CopyToolTip>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs className={classes.balanceDiv}>
          <Grid container alignItems='center' justify='space-between'>
            <Grid item xs={4}>
              <Typography variant='h5' color='textPrimary' className={classes.balance}>
                {token.balance / 10 ** token.decimals}
              </Typography>
            </Grid>
            <Grid item>
              <CommonButton
                name='Send'
                onClick={() => {
                  setOpen(true)
                }}
              />
              <CommonButton
                name='Swap'
                className={classes.swapButton}
                onClick={() => {
                  dispatch(
                    snackbarsActions.add({
                      message: 'This feature is under construction',
                      variant: 'info',
                      persist: false
                    })
                  )
                }}
              />
              <SendMoneyModalComponent
                onSend={(amount: number, recipient: string) => {
                  console.log(amount)
                  dispatch(
                    actions.addTransaction({
                      amount,
                      recipient,
                      id: random,
                      accountAddress: token.address,
                      token: token.programId
                    })
                  )
                  setRandom(random)
                }}
                open={open}
                loading={pendingTransactions[random]?.sending || false}
                txid={pendingTransactions[random]?.txid}
                handleClose={() => {
                  setOpen(false)
                  setTimeout(() => {
                    setRandom(Math.random().toString())
                  }, 300)
                }}
                balance={token.balance / 10 ** token.decimals}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Token

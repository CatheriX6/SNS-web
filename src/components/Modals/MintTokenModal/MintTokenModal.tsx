/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-new */
import React from 'react'
import {
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  CircularProgress,
  TextField
} from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers'

import CloseIcon from '@material-ui/icons/Close'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import { PublicKey } from '@solana/web3.js'
import CommonButton from '@components/CommonButton/CommonButton'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import useStyles from './style'

export interface IMintTokenModal {
  open: boolean
  loading: boolean
  handleClose: () => void
  onSend: (recipient: string, amount: number) => void
  txid?: string
}
export interface FormFields {
  recipient: string
  amount: number
}
export const MintTokenModal: React.FC<IMintTokenModal> = ({
  open,
  loading,
  handleClose,
  onSend,
  txid
}) => {
  const classes = useStyles()
  const schema = yup.object().shape({
    recipient: yup
      .string()
      .test('is-publicKey', 'Invalid Address', data => {
        if (data === '') {
          return true
        }
        try {
          new PublicKey(data)
          return true
        } catch (error) {
          return false
        }
      })
      .required('Recipient is required.'),
    amount: yup.number().min(0).required('Amount is required.')
  })
  const { control, errors, formState, reset, handleSubmit } = useForm<FormFields>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: { recipient: '', amount: 0 },
    shouldFocusError: true
  })

  const clearAndSubmit = (data: FormFields) => {
    onSend(data.recipient, data.amount)
    reset()
  }
  return (
    <Grid container>
      <Dialog open={open} onClose={handleClose} className={classes.root}>
        <DialogTitle>
          <Grid container className={classes.titleWrapper}>
            <AccountBalanceIcon />
            <Typography variant='body1'>{'Mint Token'}</Typography>
            <CloseIcon onClick={handleClose} className={classes.close} />
          </Grid>
        </DialogTitle>
        {loading ? (
          <Grid
            container
            className={classes.progressWrapper}
            justify='center'
            direction='column'
            alignItems='center'>
            <CircularProgress size={100} className={classes.progress} />
            <Typography variant='body2'>Sending transactions...</Typography>
          </Grid>
        ) : txid ? (
          <Grid
            container
            className={classes.progressWrapper}
            justify='center'
            direction='column'
            alignItems='center'
            wrap='nowrap'>
            <Grid item>
              <CheckCircleOutlineIcon className={classes.successIcon} />
            </Grid>
            {/* <Grid item>
              <Typography variant='body2' className={classes.txid}>
                Transaction id:
              </Typography>
            </Grid> */}
            <Grid item>
              <Typography variant='body2' className={classes.txid}>
                {txid}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <form
            style={{ width: '100%', height: '100%' }}
            onSubmit={e => {
              e.preventDefault()
              handleSubmit(clearAndSubmit)(e)
            }}>
            <Grid
              container
              className={classes.contentWrapper}
              direction='column'
              justify='center'
              alignItems='center'>
              <Grid item className={classes.inputDiv}>
                <Controller
                  as={TextField}
                  helperText={errors.recipient?.message}
                  error={!!errors.recipient?.message}
                  className={classes.input}
                  id='outlined-search'
                  label='Recipient'
                  type='text'
                  name='recipient'
                  variant='outlined'
                  control={control}
                />
              </Grid>
              <Grid item className={classes.inputDiv}>
                <Controller
                  as={TextField}
                  helperText={errors.amount?.message}
                  error={!!errors.amount?.message}
                  className={classes.input}
                  id='outlined-search'
                  label='Amount'
                  type='number'
                  name='amount'
                  variant='outlined'
                  control={control}
                />
              </Grid>
              <Grid item>
                <CommonButton
                  disabled={!formState.isValid}
                  name='Mint Token'
                  className={classes.button}
                />
              </Grid>
            </Grid>
          </form>
        )}
      </Dialog>
    </Grid>
  )
}
export default MintTokenModal

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
import OpacityIcon from '@material-ui/icons/Opacity'

import useStyles from './style'

export interface IThawAccountModal {
  open: boolean
  loading: boolean
  handleClose: () => void
  onSend: (accountToThaw: string) => void
  txid?: string
}
export interface FormFields {
  accountToThaw: string
}
export const ThawAccountModal: React.FC<IThawAccountModal> = ({
  open,
  loading,
  handleClose,
  onSend,
  txid
}) => {
  const classes = useStyles()
  const schema = yup.object().shape({
    accountToThaw: yup
      .string()
      .test('is-publicKey', 'Invalid address.', data => {
        try {
          new PublicKey(data)
          return true
        } catch (error) {
          return false
        }
      })
      .required('Provide address.')
  })
  const { control, errors, formState, reset, handleSubmit } = useForm<FormFields>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { accountToThaw: '' },
    shouldFocusError: true
  })

  const clearAndSubmit = (data: FormFields) => {
    onSend(data.accountToThaw)
    reset()
  }
  return (
    <Grid container>
      <Dialog open={open} onClose={handleClose} className={classes.root}>
        <DialogTitle>
          <Grid container className={classes.titleWrapper}>
            <OpacityIcon />
            <Typography variant='body1'>{'Unfreeze Account'}</Typography>
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
            <Typography variant='body2'>Sending transaction...</Typography>
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
                Account txid:
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
                  helperText={errors.accountToThaw?.message}
                  error={!!errors.accountToThaw?.message}
                  className={classes.input}
                  id='outlined-search'
                  label='Account to unfreeze'
                  type='text'
                  name='accountToThaw'
                  variant='outlined'
                  control={control}
                />
              </Grid>
              <Grid item>
                <CommonButton
                  disabled={!formState.isValid}
                  name='Unfreeze Account'
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
export default ThawAccountModal

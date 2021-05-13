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

import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import CloseIcon from '@material-ui/icons/Close'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import CommonButton from '@components/CommonButton/CommonButton'
import useStyles from './style'
import { IAddressRecord } from '@reducers/nameService'

export interface IRegisterAccountModal {
  open: boolean
  loading: boolean
  message?: string
  handleClose: () => void
  onSend: (name: string) => void
  registeredAccounts: Map<string, IAddressRecord>
}
export interface FormFields {
  name: string
}
export const RegisterAccountModal: React.FC<IRegisterAccountModal> = ({
  open,
  loading,
  handleClose,
  onSend,
  message,
  registeredAccounts
}) => {
  const classes = useStyles()
  const schema = yup.object().shape({
    name: yup
      .string()
      .min(1)
      .max(32)
      .test('is-registered', 'Nickname already taken.', data => {
        if (registeredAccounts.has(data)) {
          return false
        } else {
          return true
        }
      })
      .required('Provide token address.')
  })
  const { control, errors, formState, reset, handleSubmit } = useForm<FormFields>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { name: '' },
    shouldFocusError: true
  })

  const clearAndSubmit = (data: FormFields) => {
    onSend(data.name)
    reset()
  }
  return (
    <Grid container>
      <Dialog open={open} onClose={handleClose} className={classes.root}>
        <DialogTitle>
          <Grid container className={classes.titleWrapper}>
            <VerifiedUserIcon />
            <Typography variant='body1'>{'Register Account'}</Typography>
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
            <Typography variant='body2'>{message}</Typography>
          </Grid>
        ) : message ? (
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
            <Grid item>
              <Typography variant='body2' className={classes.txid}>
                Account address:
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body2' className={classes.txid}>
                {message}
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
              <Grid item>
                <Typography variant='body2' className={classes.info}>
                  You can register unique nickname/alias that other people will be able to use
                  instead of your address. Fee: ~ 1.00 SOL
                </Typography>
              </Grid>
              <Grid item className={classes.inputDiv}>
                <Controller
                  as={TextField}
                  helperText={errors.name?.message}
                  error={!!errors.name?.message}
                  className={classes.input}
                  id='outlined-search'
                  label='Alias / Nickname'
                  type='text'
                  name='name'
                  variant='outlined'
                  control={control}
                />
              </Grid>
              <Grid item>
                <CommonButton
                  disabled={!formState.isValid}
                  className={classes.button}
                  name='Register Account'
                />
              </Grid>
            </Grid>
          </form>
        )}
      </Dialog>
    </Grid>
  )
}
export default RegisterAccountModal

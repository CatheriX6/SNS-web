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

import NoteAddIcon from '@material-ui/icons/NoteAdd'
import CloseIcon from '@material-ui/icons/Close'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import { PublicKey } from '@solana/web3.js'
import CommonButton from '@components/CommonButton/CommonButton'
import useStyles from './style'

export interface ICreateTokenModal {
  open: boolean
  loading: boolean
  handleClose: () => void
  onSend: (freezeAuthority: string, decimals: number, tokenName: string) => void
  message?: string
  address?: string
}
export interface FormFields {
  freezeAuthority: string
  decimals: number
  tokenName: string
}
export const CreateTokenModal: React.FC<ICreateTokenModal> = ({
  open,
  loading,
  handleClose,
  onSend,
  address,
  message
}) => {
  const classes = useStyles()
  const schema = yup.object().shape({
    freezeAuthority: yup.string().test('is-publicKey', 'Invalid Address', data => {
      if (data === '') {
        return true
      }
      try {
        new PublicKey(data)
        return true
      } catch (error) {
        return false
      }
    }),
    tokenName: yup.string().max(32),
    decimals: yup.number().min(0).max(18, 'Max decimals: 18').required('Decimals are required.')
  })
  const { control, errors, formState, reset, handleSubmit } = useForm<FormFields>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: { freezeAuthority: '', decimals: 9, tokenName: '' },
    shouldFocusError: true
  })

  const clearAndSubmit = (data: FormFields) => {
    onSend(data.freezeAuthority, data.decimals, data.tokenName)
    reset()
  }
  return (
    <Grid container>
      <Dialog open={open} onClose={handleClose} className={classes.root}>
        <DialogTitle>
          <Grid container className={classes.titleWrapper}>
            <NoteAddIcon />
            <Typography variant='body1'>{'Create Token'}</Typography>
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
            <Typography variant='body2'>{message || 'Sending transactions...'}</Typography>
          </Grid>
        ) : address ? (
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
                Token address:
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body2' className={classes.txid}>
                {address}
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
                  You can register name that will be associated with your token. Token names are not
                  unique. Cost: ~ 2.00 SOL
                </Typography>
              </Grid>
              <Grid item className={classes.inputDiv}>
                <Controller
                  as={TextField}
                  helperText={errors.tokenName?.message}
                  error={!!errors.tokenName?.message}
                  className={classes.input}
                  id='outlined-search'
                  label='Token Name (optional)'
                  type='text'
                  name='tokenName'
                  variant='outlined'
                  control={control}
                />
              </Grid>

              <Grid item className={classes.inputDiv}>
                <Controller
                  as={TextField}
                  helperText={errors.decimals?.message}
                  error={!!errors.decimals?.message}
                  className={classes.input}
                  id='outlined-search'
                  label='Token decimals'
                  type='number'
                  name='decimals'
                  variant='outlined'
                  control={control}
                />
              </Grid>
              <Grid item className={classes.inputDiv}>
                <Controller
                  as={TextField}
                  helperText={errors.freezeAuthority?.message}
                  error={!!errors.freezeAuthority?.message}
                  className={classes.input}
                  id='outlined-search'
                  label='Freeze Authority (optional)'
                  type='text'
                  name='freezeAuthority'
                  variant='outlined'
                  control={control}
                />
              </Grid>
              <Grid item>
                <CommonButton
                  disabled={!formState.isValid}
                  name='Create Token'
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
export default CreateTokenModal

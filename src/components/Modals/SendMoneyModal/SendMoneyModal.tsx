/* eslint-disable @typescript-eslint/indent */
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

import NearMeIcon from '@material-ui/icons/NearMe'
import CloseIcon from '@material-ui/icons/Close'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import { PublicKey } from '@solana/web3.js'
import CommonButton from '@components/CommonButton/CommonButton'
import useStyles from './style'
import { IAddressRecord } from '@reducers/nameService'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'

const filter = createFilterOptions<IAddressRecord>()
export interface ISendMoneyModal {
  open: boolean
  loading: boolean
  handleClose: () => void
  onSend: (amount: number, recipient: string) => void
  txid?: string
  balance: number
  accounts?: Map<string, IAddressRecord>
}
export interface FormFields {
  amount: number
  recipient: string
}
export const SendMoneyModal: React.FC<ISendMoneyModal> = ({
  open,
  loading,
  handleClose,
  onSend,
  txid,
  balance,
  accounts = new Map<string, IAddressRecord>()
}) => {
  const classes = useStyles()
  const schema = yup.object().shape({
    recipient: yup
      .string()
      .test('is-publicKey', 'Invalid Address', data => {
        try {
          new PublicKey(data)
          return true
        } catch (error) {
          return false
        }
      })
      .required('Provide recipient.'),
    amount: yup.number().min(0).max(balance).required('Name & Surname required.')
  })
  const { control, errors, formState, reset, setValue, handleSubmit, trigger, register } = useForm<
    FormFields
  >({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: { amount: 0, recipient: '' },
    shouldFocusError: true
  })

  React.useEffect(() => {
    register('recipient')
  }, [register])
  const clearAndSubmit = (data: FormFields) => {
    onSend(data.amount, data.recipient)
    reset()
  }
  return (
    <Grid container>
      <Dialog open={open} onClose={handleClose} className={classes.root} keepMounted>
        <DialogTitle>
          <Grid container className={classes.titleWrapper}>
            <NearMeIcon />
            <Typography variant='body1'>{'Send Money'}</Typography>
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
            alignItems='center'>
            <CheckCircleOutlineIcon className={classes.successIcon} />
            <Typography variant='body2' className={classes.txid}>
              Transaction id:
            </Typography>
            <Typography variant='body2' className={classes.txid}>
              {txid}
            </Typography>
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
                  Please select registered user or enter recipient address. (Usernames are unique.)
                </Typography>
              </Grid>
              <Grid item className={classes.inputDiv} style={{ width: '100%' }}>
                <Autocomplete
                  freeSolo
                  options={Array.from(accounts.values()).map(option => option)}
                  classes={{ paper: classes.paper, root: classes.input, option: classes.option }}
                  onChange={(_, option) => {
                    if (typeof option === 'string') {
                      setValue('recipient', option)
                      return option
                    }
                    setValue('recipient', option?.pubKey || '')
                    trigger('recipient')
                  }}
                  renderOption={option => (
                    <Grid container className={classes.optionDiv} direction='column'>
                      <Grid item>
                        <Typography
                          variant='body2'
                          color='textPrimary'
                          className={classes.inputTokenName}>
                          {option.name}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant='body2'
                          color='textPrimary'
                          className={classes.inputTokenAddress}>
                          {option.pubKey}
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                  getOptionLabel={option => {
                    if (typeof option === 'string') {
                      return option
                    }
                    if (option.name) {
                      return option.name
                    }
                    return option.name
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params)
                    return filtered
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label='Recipient'
                      onChange={a => {
                        setValue('recipient', a.target.value)
                        trigger('recipient')
                      }}
                      variant='outlined'
                      error={Boolean(errors?.recipient)}
                      helperText={errors?.recipient?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item className={classes.inputDiv}>
                <Controller
                  as={TextField}
                  helperText={errors.amount?.message && 'Invalid amount'}
                  error={!!errors.amount?.message}
                  className={classes.input}
                  id='outlined-search'
                  label='Amount'
                  name='amount'
                  type='text'
                  variant='outlined'
                  control={control}
                />
                <Typography
                  variant='body2'
                  className={classes.maxBalance}
                  onClick={() => {
                    setValue('amount', balance, { shouldValidate: true })
                  }}>
                  Set max: {balance}
                </Typography>
              </Grid>
              <Grid item>
                <CommonButton disabled={!formState.isValid} name='Send Transaction' />
              </Grid>
            </Grid>
          </form>
        )}
      </Dialog>
    </Grid>
  )
}
export default SendMoneyModal

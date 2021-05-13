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
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers'

import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'
import CloseIcon from '@material-ui/icons/Close'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import { PublicKey } from '@solana/web3.js'
import CommonButton from '@components/CommonButton/CommonButton'
import useStyles from './style'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { ITokenRecord } from '@reducers/nameService'
export interface ICreateAccountModal {
  open: boolean
  loading: boolean
  handleClose: () => void
  onSend: (tokenAddress: string) => void
  address?: string
  registeredTokens?: Map<string, ITokenRecord>
}
export interface FormFields {
  tokenAddress: string
}
const filter = createFilterOptions<ITokenRecord>()
export const CreateAccountModal: React.FC<ICreateAccountModal> = ({
  open,
  loading,
  handleClose,
  onSend,
  address,
  registeredTokens = new Map<string, ITokenRecord>()
}) => {
  const classes = useStyles()
  const schema = yup.object().shape({
    tokenAddress: yup
      .string()
      .test('is-publicKey', 'Invalid Address', data => {
        try {
          new PublicKey(data)
          return true
        } catch (error) {
          return false
        }
      })
      .required('Provide token address.')
  })
  const { errors, formState, reset, handleSubmit, setValue, register, trigger } = useForm<
    FormFields
  >({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { tokenAddress: '' },
    shouldFocusError: true
  })
  React.useEffect(() => {
    register('tokenAddress')
  }, [register])
  const clearAndSubmit = (data: FormFields) => {
    onSend(data.tokenAddress)
    reset()
  }
  return (
    <Grid container>
      <Dialog open={open} onClose={handleClose} className={classes.root}>
        <DialogTitle>
          <Grid container className={classes.titleWrapper}>
            <PlaylistAddIcon />
            <Typography variant='body1'>{'Create Account'}</Typography>
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
                Account address:
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
              handleSubmit(clearAndSubmit, () => {})(e)
            }}>
            <Grid
              container
              className={classes.contentWrapper}
              direction='column'
              justify='center'
              alignItems='center'>
              <Grid item>
                <Typography variant='body2' className={classes.info}>
                  Please select registered token or enter address of token you want to add.
                </Typography>
              </Grid>
              <Grid item className={classes.inputDiv}>
                <Autocomplete
                  freeSolo
                  options={Array.from(registeredTokens.values()).map(option => option)}
                  classes={{ paper: classes.paper, root: classes.input, option: classes.option }}
                  onChange={(_, option) => {
                    if (typeof option === 'string') {
                      setValue('tokenAddress', option)
                      return option
                    }
                    setValue('tokenAddress', option?.pubKey || '')
                    trigger('tokenAddress')
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
                      label='Token'
                      onChange={a => {
                        setValue('tokenAddress', a.target.value)
                        trigger('tokenAddress')
                      }}
                      variant='outlined'
                      error={Boolean(errors?.tokenAddress)}
                      helperText={errors?.tokenAddress?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <CommonButton
                  disabled={!formState.isValid}
                  name='Create Account'
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
export default CreateAccountModal

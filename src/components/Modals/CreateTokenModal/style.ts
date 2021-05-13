import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiDialogTitle-root': {
      padding: '0 8px 10px'
    },
    '& .MuiDialog-paper': {
      padding: 10,
      height: 590,
      width: 430,
      background: colors.red.neon
    }
  },
  titleWrapper: {
    color: colors.black.background,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  close: {
    cursor: 'pointer'
  },

  progressWrapper: {
    background: colors.black.background,
    width: '100%',
    height: '100%',
    padding: 32
  },
  contentWrapper: {
    background: colors.black.background,
    padding: 32,
    width: '100%',
    height: '100%'
  },
  progress: {
    marginBottom: 16,
    color: colors.red.neon
  },
  input: {
    '& .MuiInputLabel-outlined': {
      color: colors.red.neon
    },
    '& .MuiFormLabel-root.Mui-error': {
      color: colors.red.main
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.red.neon
    },
    '& .MuiOutlinedInput-root': {
      borderColor: colors.red.neon,
      '&.Mui-focused fieldset': {
        borderColor: colors.red.neon
      }
    }
  },
  inputDiv: {
    minHeight: 100,
    position: 'relative'
  },
  txid: {
    wordBreak: 'break-all',
    textAlign: 'center'
  },
  successIcon: {
    color: colors.red.neon,
    fontSize: 120
  },
  button: {
    fontSize: 20,
    color: colors.red.neon,
    borderColor: colors.red.neon,
    '&:hover': {
      borderWidth: 2,
      backgroundColor: `${colors.red.neon}`,
      borderColor: colors.red.neon
    }
  },
  info: {
    marginBottom: 32,
    textAlign: 'center'
  }
}))

export default useStyles

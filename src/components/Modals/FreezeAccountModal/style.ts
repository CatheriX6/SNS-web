import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiDialogTitle-root': {
      padding: '0 8px 10px'
    },
    '& .MuiDialog-paper': {
      padding: 10,
      height: 300,
      width: 430,
      background: colors.white.main
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
    color: colors.white.main
  },
  input: {
    '& .MuiInputLabel-outlined': {
      color: colors.white.main
    },
    '& .MuiFormLabel-root.Mui-error': {
      color: colors.red.main
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.white.main
    },
    '& .MuiOutlinedInput-root': {
      borderColor: colors.white.main,
      '&.Mui-focused fieldset': {
        borderColor: colors.white.main
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
    color: colors.white.main,
    fontSize: 120
  },
  button: {
    color: colors.white.main,
    borderColor: colors.white.main,
    '&:hover': {
      borderWidth: 2,
      backgroundColor: `${colors.white.main}`,
      borderColor: colors.white.main
    }
  }
}))

export default useStyles

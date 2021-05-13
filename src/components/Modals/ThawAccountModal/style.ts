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
      background: colors.orange.tomato
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
    color: colors.orange.tomato
  },
  input: {
    '& .MuiInputLabel-outlined': {
      color: colors.orange.tomato
    },
    '& .MuiFormLabel-root.Mui-error': {
      color: colors.red.main
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.orange.tomato
    },
    '& .MuiOutlinedInput-root': {
      borderColor: colors.orange.tomato,
      '&.Mui-focused fieldset': {
        borderColor: colors.orange.tomato
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
    color: colors.orange.tomato,
    fontSize: 120
  },
  button: {
    color: colors.orange.tomato,
    borderColor: colors.orange.tomato,
    '&:hover': {
      borderWidth: 2,
      backgroundColor: `${colors.orange.tomato}`,
      borderColor: colors.orange.tomato
    }
  }
}))

export default useStyles

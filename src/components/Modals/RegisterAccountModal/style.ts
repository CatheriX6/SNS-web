import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiDialogTitle-root': {
      padding: '0 8px 10px'
    },
    '& .MuiDialog-paper': {
      padding: 10,
      height: 400,
      width: 430,
      background: colors.purple.pastel
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
    color: colors.purple.pastel
  },
  input: {
    '& .MuiInputLabel-outlined': {
      color: colors.purple.pastel
    },
    '& .MuiFormLabel-root.Mui-error': {
      color: `${colors.red.main} `
    },
    '& .MuiOutlinedInput-root': {
      borderColor: `${colors.purple.pastel}`,
      '&.Mui-focused fieldset': {
        borderColor: colors.purple.pastel
      }
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: `${colors.purple.pastel}`
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
    color: colors.purple.pastel,
    fontSize: 120
  },
  info: {
    marginBottom: 32,
    textAlign: 'center'
  },
  button: {
    color: colors.purple.pastel,
    borderColor: colors.purple.pastel,
    '&:hover': {
      borderWidth: 2,
      backgroundColor: `${colors.purple.pastel}`,
      borderColor: colors.purple.pastel
    }
  }
}))

export default useStyles

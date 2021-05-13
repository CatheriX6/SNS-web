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
      background: colors.red.pinkish
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
    color: colors.red.pinkish
  },
  input: {
    '& .MuiInputLabel-outlined': {
      color: colors.red.pinkish
    },
    '& .MuiFormLabel-root.Mui-error': {
      color: colors.red.main
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.red.pinkish
    },
    '& .MuiOutlinedInput-root': {
      borderColor: colors.red.pinkish,
      '&.Mui-focused fieldset': {
        borderColor: colors.red.pinkish
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
    color: colors.red.pinkish,
    fontSize: 120
  },
  button: {
    color: colors.red.pinkish,
    borderColor: colors.red.pinkish,
    '&:hover': {
      borderWidth: 2,
      backgroundColor: `${colors.red.pinkish}`,
      borderColor: colors.red.pinkish
    }
  }
}))

export default useStyles

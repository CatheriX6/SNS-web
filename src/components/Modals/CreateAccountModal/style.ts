import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiDialogTitle-root': {
      padding: '0 8px 10px'
    },
    '& .MuiDialog-paper': {
      padding: 10,
      height: 390,
      width: 430,
      background: colors.blue.neon
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
    color: colors.blue.neon
  },
  input: {
    '& .MuiInputLabel-outlined': {
      color: colors.blue.neon
    },
    '& .MuiFormLabel-root.Mui-error': {
      color: colors.red.main
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.blue.neon
    },
    '& .MuiOutlinedInput-root': {
      borderColor: colors.blue.neon,
      '&.Mui-focused fieldset': {
        borderColor: colors.blue.neon
      }
    }
  },
  inputDiv: {
    minHeight: 100,
    width: '100%',
    position: 'relative'
  },
  txid: {
    wordBreak: 'break-all',
    textAlign: 'center'
  },
  successIcon: {
    color: colors.blue.neon,
    fontSize: 120
  },
  button: {
    fontSize: 20,
    color: colors.blue.neon,
    borderColor: colors.blue.neon,
    '&:hover': {
      borderWidth: 2,
      backgroundColor: `${colors.blue.neon}`,
      borderColor: colors.blue.neon
    }
  },
  paper: {
    backgroundColor: colors.black.greyish,
    margin: 0
  },
  inputTokenName: {
    fontWeight: 'bold'
  },
  inputTokenAddress: {
    fontWeight: 'bold',
    fontSize: 10,
    color: colors.gray.base
  },
  optionDiv: {
    padding: 8,
    '&:hover': {
      backgroundColor: colors.blue.neonHover
    }
  },
  option: {
    padding: '0px !important'
  },
  info: {
    marginBottom: 32,
    textAlign: 'center'
  }
}))

export default useStyles

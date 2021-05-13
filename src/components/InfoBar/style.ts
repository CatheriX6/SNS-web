import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: colors.blue.accent,
    height: 90,
    [theme.breakpoints.down('xs')]: {
      height: 140
    }
  },
  text: {
    textAlign: 'center',
    padding: '0px 16px',
    [theme.breakpoints.down('xs')]: {
      fontSize: 16
    }
  },
  icon: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  }
}))

export default useStyles

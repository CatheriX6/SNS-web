import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() => ({
  root: {
    borderTop: `2px solid ${colors.green.hover}`,
    padding: 16,
    marginTop: 32,
    height: 100
  },
  content: {
    maxWidth: 1160
  },
  icon: {
    background: 'transparent',
    cursor: 'pointer',
    '&:hover path': {
      fill: colors.green.main
    }
  }
}))

export default useStyles

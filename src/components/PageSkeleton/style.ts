import { makeStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'
const useStyles = makeStyles(() => ({
  contentContainer: {
    width: '100%'
  },
  contentWrapper: {
    maxWidth: 1160,
    padding: 16
  },
  divider: {
    paddingBottom: 8,
    borderBottom: `2px solid ${colors.green.hover}`
  },
  roundBorder: {
    borderRadius: 15
  }
}))

export default useStyles

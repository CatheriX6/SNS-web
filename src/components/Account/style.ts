import { makeStyles, Theme } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles((theme: Theme) => ({
  info: {
    padding: 32,
    backgroundColor: colors.blue.accent,
    borderRadius: 24,
    [theme.breakpoints.down('sm')]: {
      padding: 24
    }
  },
  root: {
    width: '100%'
  },
  title: {
    fontWeight: 'bold',
    marginLeft: 20
  },
  titleContainer: {
    height: 51
  },
  titleDiv: {
    marginBottom: 16,
    paddingBottom: 8,
    borderBottom: `2px solid ${colors.green.hover}`
  },
  solanaLogoDiv: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
    height: 70,
    width: 70,
    padding: 24,
    borderRadius: '50%',
    backgroundColor: theme.palette.secondary.main,
    marginRight: 25
  },
  solanaLogo: {
    height: 70,
    width: 70
  },
  data: {
    borderBottom: `2px solid ${colors.green.hover}`
  },
  address: {
    whiteSpace: 'nowrap',
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'end'
  },
  addressDiv: {
    marginLeft: 25
  },
  buttonDiv: {
    marginTop: 8,
    marginBottom: -8
  },
  airdropButton: {
    color: colors.blue.light,
    borderColor: colors.blue.light,
    '&:hover': {
      borderWidth: 2,
      backgroundColor: `${colors.blue.light}`,
      borderColor: colors.blue.light
    },
    marginRight: 16
  },
  registerButton: {
    fontSize: 20,
    color: colors.purple.pastel,
    borderColor: colors.purple.pastel,
    '&:hover': {
      borderWidth: 2,
      backgroundColor: `${colors.purple.pastel}`,
      borderColor: colors.purple.pastel
    }
  },
  nickname: {
    fontWeight: 'bold',
    background: 'linear-gradient(90deg, rgba(65,223,208,1) 0%, rgba(238,131,239,1) 100%);',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  }
}))

export default useStyles

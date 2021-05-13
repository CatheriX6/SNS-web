import { makeStyles, createStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() =>
  createStyles({
    contentContainer: {
      width: '100%'
    },
    contentWrapper: {
      maxWidth: 1160,
      padding: 16
    },
    root: {
      width: '100%'
    },
    title: {
      fontWeight: 'bold',
      marginLeft: 20
    },
    titleDiv: {
      marginBottom: 16,
      paddingBottom: 8,
      borderBottom: `2px solid ${colors.green.hover}`
    },
    selectedTokenDiv: {
      width: '100%',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: `${colors.green.main}`
      },
      '&.MuiSelect-iconOutlined': {
        color: colors.green.main
      }
    },
    selectLabel: {
      color: colors.green.main
    },
    iconSelect: {
      color: colors.green.main
    },
    tokenInfo: {
      marginTop: 32
    },
    createTokenButton: {
      color: colors.red.neon,
      borderColor: colors.red.neon,
      '&:hover': {
        borderWidth: 2,
        backgroundColor: `${colors.red.neon}`,
        borderColor: colors.red.neon
      }
    },
    noTokensDiv: {
      marginTop: 72
    },

    rescanButton: {
      color: colors.yellow.neon,
      borderColor: colors.yellow.neon,
      '&:hover': {
        borderWidth: 2,
        backgroundColor: `${colors.yellow.neon}`,
        borderColor: colors.yellow.neon
      }
    },
    noTokenActionsDiv: {
      marginTop: 32
    },
    headerButtonDiv: {
      marginRight: 32
    },
    optionDiv: {
      // backgroundColor: `${colors.yellow.neon}`,
      '&:hover': {
        backgroundColor: `${colors.green.hover}`
      }
    },
    selectMenu: {
      backgroundColor: `${colors.black.light}`,
      border: `2px solid ${colors.green.main}`,
      maxHeight: 400
    },
    address: {
      whiteSpace: 'nowrap',
      textAlignLast: 'left',
      display: 'block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      textAlign: 'end'
    }
  })
)
export default useStyles

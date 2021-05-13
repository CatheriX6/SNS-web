import React from 'react'
import { Grid } from '@material-ui/core'
import useStyles from './style'
import Skeleton from '@material-ui/lab/Skeleton'

export const PageSkeleton: React.FC = () => {
  const classes = useStyles()
  return (
    <Grid container className={classes.contentContainer} justify='center'>
      <Grid item xs={12} className={classes.contentWrapper}>
        <Grid container>
          <Grid item xs={12} className={classes.divider}>
            <Skeleton variant='rect' height={60} className={classes.roundBorder} />
          </Grid>
          <Grid item xs={12} style={{ marginTop: 24 }}>
            <Skeleton variant='rect' height={260} className={classes.roundBorder} />
          </Grid>
          <Grid item xs={12} className={classes.divider} style={{ marginTop: 32 }}>
            <Skeleton variant='rect' height={60} className={classes.roundBorder} />
          </Grid>
          <Grid item xs={12} style={{ marginTop: 24 }}>
            <Skeleton variant='rect' height={260} className={classes.roundBorder} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
export default PageSkeleton

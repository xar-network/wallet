import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '100%',
    alignContent: 'center'
  },
  header: {
    margin: '0 auto',
    maxWidth: '800px',
    textAlign: 'center',
    lineHeight: '3',
  }
});

const Summary = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.container}>
      <Grid item xs={12} className={classes.header}>
        <Typography variant="h1">Welcome to the <br/>Collateralized Debt Position Portal</Typography>
      </Grid>
    </Grid>
  )
}

export default Summary

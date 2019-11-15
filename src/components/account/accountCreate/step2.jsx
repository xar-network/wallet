import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Button, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { colors } from '../../theme'

const styles = theme => ({
  instruction: {
    marginBottom: '30px'
  },
  mnemonicContainer: {
    width: '100%'
  },
  buttonContainer: {
    width: '100%',
    marginTop: '16px'
  },
  wordCard: {
    padding: '6px',
    backgroundColor: colors.card
  }
});

class Step2 extends Component {

  constructor(props) {
    super();

    if(!props.account) {
      props.history.push('/');
    }

    this.state = {
      account: props.account
    };
  }

  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        className={classes.mnemonicContainer}
        spacing={2}>
        <Grid item xs={12} className={classes.instruction}>
          <Typography variant="body1" align='center'>Please backup your mnemonic</Typography>
        </Grid>
        { this.renderWords() }
        <Grid item xs={12} className={classes.buttonContainer} align={'right'}>
          <Button
            onClick={() => this.nextPath('/home/create/3') }
            variant="outlined"
            size='large'
            >
              Continue
            </Button>
        </Grid>
      </Grid>
    )
  }

  renderWords() {

    const { account } = this.props

    if(!account) {
      return null
    }

    const words = account.mnemonic.split(' ')

    return words.map((word) => {
      return this.renderWord(word)
    })
  }

  renderWord(word) {
    const { classes } = this.props;

    return (<Grid item xs={3} key={word}>
      <Paper
        elevation={0}
        className={classes.wordCard}
        >
        <Typography variant="body1" align="center">{word}</Typography>
      </Paper>
    </Grid>)
  }
}

Step2.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { accounts } = state;
  return {
    account: accounts.createdAccount,
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Step2)))

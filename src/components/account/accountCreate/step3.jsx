import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid, Typography, Button, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { colors } from '../../theme';

const styles = theme => ({
  instruction: {
    marginBottom: '30px'
  },
  inputContainer: {
    width: '100%'
  },
  buttonContainer: {
    width: '100%',
    marginTop: '16px'
  },
  error: {
    color: colors.red
  }
});

class Step3 extends Component {

  constructor(props) {
    super();

    if(!props.account) {
      props.history.push('/');
    }

    this.state = {
      error: false,
      account: props.account
    };

    this.onChange = this.onChange.bind(this)
    this.validateMnemonic = this.validateMnemonic.bind(this)
  }

  nextPath(path) {
    this.props.history.push(path);
  }

  validateMnemonic() {
    const { account } = this.props
    const {
      first,
      second,
      third
    } = this.state

    if(!account) {
      return null
    }

    const words = account.mnemonic.split(' ')

    if(words[8] !== first) {
      this.setState({ error: 'Mnemonic is invalid' })
      return false
    }
    if(words[15] !== second) {
      this.setState({ error: 'Mnemonic is invalid' })
      return false
    }
    if(words[17] !== third) {
      this.setState({ error: 'Mnemonic is invalid' })
      return false
    }

    this.nextPath('/home/create/4')
  }

  onChange(e, val) {
    let st = {}
    st[e.target.id] = e.target.value
    this.setState(st)
  }

  render() {
    const { classes } = this.props;
    const { first, second, third, error } = this.state

    return (
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={2}>
        <Grid item xs={12} className={classes.instruction}>
          <Typography variant="body1" align="center">Please confirm the following words in your mnemonic phrase</Typography>
        </Grid>
        <Grid item xs={4} className={classes.inputContainer}>
          <TextField
            fullWidth
            label="#9"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            color="secondary"
            id="first"
            value={ first }
            onChange={ this.onChange }
          />
        </Grid>
        <Grid item xs={4} className={classes.inputContainer}>
          <TextField
            fullWidth
            label="#16"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            color="secondary"
            id="second"
            value={ second }
            onChange={ this.onChange }
          />
        </Grid>
        <Grid item xs={4} className={classes.inputContainer}>
          <TextField
            fullWidth
            label="#18"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            color="secondary"
            id="third"
            value={ third }
            onChange={ this.onChange }
          />
        </Grid>
        <Grid item xs={12} className={classes.buttonContainer} align={'right'}>
          <Button
            onClick={ this.validateMnemonic }
            variant="outlined"
            size='large'
            >
              Confirm
            </Button>
        </Grid>
        <Grid item xs={12} className={classes.buttonContainer} align={'right'}>
          <Typography className={ classes.error }>{ error }</Typography>
        </Grid>
      </Grid>
    )
  }
}

Step3.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { accounts } = state;
  return {
    account: accounts.createdAccount,
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Step3)))

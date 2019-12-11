import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { colors } from '../theme'
import Account from '../account'
import Loader from '../loader'

import ListLiquidations from './listLiquidations'
import ViewLiquidation from './viewLiquidation'

import { getLiquidations } from '../../store/service/api';

const styles = theme => ({
  container: {
    backgroundColor: colors.card,
    width: '100%',
    height: '100%'
  },
  maxHeight: {
    height: '100%',
    minHeight: '100%'
  },
  holder: {
    position: 'relative',
    height: '100%'
  },
  screenContainer: {
    width: 'calc(100% - 70px)',
    display: 'inline-block',
    height: '100%'
  }
});

class Liquidation extends Component {

  constructor(props) {
    super();

    this.state = {};

    this.validateUser = this.validateUser.bind(this)

    const user = this.validateUser()

    if (user !== false) {
      getLiquidations()
    } else {
      this.nextPath('/', props)
    }
  };

  nextPath(path, props) {
    props.history.push(path);
  }

  validateUser() {
    const userString = sessionStorage.getItem('xar-csdt-user')
    const user = JSON.parse(userString || '{}')

    if(user.address && user.keystore) {
      return user
    } else {
      return false
    }
  }

  render() {
    const { classes, match, loading } = this.props;

    return (
      <React.Fragment>
        { this.renderScreen(match.params.view) }
        { loading && <Loader /> }
      </React.Fragment>
    )
  }

  renderScreen(view) {
    switch (view) {
      case 'view':
        return <ViewLiquidation />
      case 'list':
        return <ListLiquidations />
      default:
        return <ListLiquidations />
    }
  }
}

Liquidation.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { loader } = state;
  return {
    loading: loader.loading
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Liquidation)))

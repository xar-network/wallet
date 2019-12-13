import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../loader'

import ListSynthetics from './listSynthetics'

import { getSynthetics } from '../../store/service/api';

const styles = theme => ({

});

class Synthetics extends Component {

  constructor(props) {
    super();

    this.state = {};

    this.validateUser = this.validateUser.bind(this)

    const user = this.validateUser()

    if (user !== false) {
      getSynthetics()
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
    const { match, loading } = this.props;

    return (
      <React.Fragment>
        { this.renderScreen(match.params.view) }
        { loading && <Loader /> }
      </React.Fragment>
    )
  }

  renderScreen(view) {
    switch (view) {
      case 'list':
        return <ListSynthetics />
      default:
        return <ListSynthetics />
    }
  }
}

Synthetics.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { loader } = state;
  return {
    loading: loader.loading
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Synthetics)))

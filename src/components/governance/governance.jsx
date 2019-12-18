import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { colors } from '../theme'
import Loader from '../loader'

import ListProposals from './listProposals'
import ViewProposal from './viewProposal'

import { getProposals, setProposal } from '../../store/service/api';

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

class Governance extends Component {

  constructor(props) {
    super();

    this.state = {};

    this.validateUser = this.validateUser.bind(this)
    this.navigate = this.navigate.bind(this)

    const user = this.validateUser()

    if (user !== false) {
      getProposals()
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
        { this.renderScreen(match.params.id) }
        { loading && <Loader /> }
      </React.Fragment>
    )
  }

  renderScreen(id) {

    if(id) {
      return <ViewProposal id={ id } />
    } else {
      return <ListProposals navigate={ this.navigate }/>
    }
  }

  async navigate(id) {

    if(!this.props.proposals) {
      return null
    }

    const proposalArr = this.props.proposals.filter((proposal) => {
      return proposal.id === id
    })

    if(proposalArr && proposalArr.length > 0) {
      await setProposal(proposalArr[0])
      this.nextPath('/governance/'+id, this.props)
    }
  }
}

Governance.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { loader, governance } = state;
  return {
    loading: loader.loading,
    proposals: governance.proposals
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Governance)))

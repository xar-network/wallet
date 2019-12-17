import React, { Component } from 'react'
import { LinearProgress } from '@material-ui/core'
import { colors } from '../theme'
import { Grid, Tooltip } from '@material-ui/core'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from '../../assets/xar-logo.png'

import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import OpacityIcon from '@material-ui/icons/Opacity';
import GavelIcon from '@material-ui/icons/Gavel';

const styles = theme => ({
  menuContainer: {
    width: '70px',
    display: 'inline-block',
    background: colors.menu,
    minHeight: '100vh'
  },
  menuButton: {
    height: '70px'
  },
  xarIcon: {
    padding: '15px 5px',
    backgroundColor: colors.white,
    height: '70px',
    width: '70px'
  },
  iconButton: {
    fill: '#fff',
    width: '50px',
    height: '50px',
    padding: '10px',
    backgroundColor: colors.background,
    cursor: 'pointer',
    '&:hover': {
       background: colors.card,
    },
  },
  selected: {
     background: colors.card,
  }
});


class Menu extends Component {
  render() {
    const { classes, orientation } = this.props;

    return (
      <Grid
        container
        direction={ orientation == 'vertical' ? "column" : "row"}
        justify="flex-start"
        alignItems="flex-start"
        spacing={0}
      >
        <Grid item className={ classes.xarIcon } >
          <img src={logo} width='60px' height='36px' />
        </Grid>
        { this.renderMenu() }
      </Grid>
    )
  }

  renderMenu() {

    const { account, classes } = this.props

    if(!account) {
      return null
    }

    return (
      <React.Fragment>
        <Grid item className={ classes.menuButton } >
          { this.renderButton('csdt') }
        </Grid>
        <Grid item className={ classes.menuButton } >
          { this.renderButton('liquidations') }
        </Grid>
        <Grid item className={ classes.menuButton } >
          { this.renderButton('governance') }
        </Grid>
      </React.Fragment>
    )
  }

  renderButton(path) {
    const { classes, match } = this.props;

    let iconButton = null
    let selected = {}

    switch (path) {
      case 'csdt':
        if(window.location.pathname.includes("/csdt")) {
          selected = classes.selected
        }
        iconButton = (
          <Tooltip title="CSDT Portfolio" placement="right">
            <TrendingUpIcon className={ `${classes.iconButton} ${selected}` } onClick={() => { this.menuClicked('/csdt') }} />
          </Tooltip>
        )
        break;
      case 'liquidations':
        if(window.location.pathname.includes("/liquidation")) {
          selected = classes.selected
        }
        iconButton = (
          <Tooltip title="Liquidations" placement="right">
            <OpacityIcon className={ `${classes.iconButton} ${selected}` } onClick={() => { this.menuClicked('/liquidation') }} />
          </Tooltip>
        )
        break;
      case 'governance':
        if(window.location.pathname.includes("/governance")) {
          selected = classes.selected
        }
        iconButton = (
          <Tooltip title="Governance" placement="right">
            <GavelIcon className={ `${classes.iconButton} ${selected}` } onClick={() => { this.menuClicked('/governance') }} />
          </Tooltip>
        )
        break;
      default:

    }

    return (iconButton)
  }

  menuClicked(path) {
    this.props.history.push(path);
  }
}


Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const { accounts } = state;
  return {
    account: accounts.account,
  };
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Menu)))

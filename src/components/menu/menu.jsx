import React, { Component } from 'react'
import { colors } from '../theme'
import { Grid, Tooltip } from '@material-ui/core'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from '../../assets/xar-logo.png'

import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import OpacityIcon from '@material-ui/icons/Opacity';
import PieChartIcon from '@material-ui/icons/PieChart';

const styles = theme => ({
  menuContainer: {
    width: '70px',
    display: 'inline-block',
    background: colors.menu,
  },
  menuButton: {
    height: '71px',
    borderBottom: '1px solid #202930'
  },
  xarIcon: {
    padding: '15px 5px',
    backgroundColor: colors.white,
    height: '70px',
    width: '70px'
  },
  iconButton: {
    fill: '#fff',
    width: '30px',
    height: '30px',
    padding: '20px',
    backgroundColor: colors.background,
    cursor: 'pointer',
    '&:hover': {
       background: colors.card,
    },
  },
  selected: {
     background: colors.card,
  },
  none: {

  }
});


class Menu extends Component {
  render() {
    const { classes, orientation } = this.props;

    return (
      <Grid
        container
        direction={ orientation === 'vertical' ? "column" : "row"}
        justify="flex-start"
        alignItems="flex-start"
        spacing={0}
      >
        <Grid item className={ classes.xarIcon } >
          <img src={logo} alt='logo' width='60px' height='36px' />
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
          { this.renderButton('synthetics') }
        </Grid>
      </React.Fragment>
    )
  }

  renderButton(path) {
    const { classes } = this.props;

    let iconButton = null
    let selected = classes.none

    switch (path) {
      case 'csdt':
        if(window.location.pathname.includes("/csdt") || window.location.pathname === '/') {
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
          <Tooltip title="Liquidation Portal" placement="right">
            <OpacityIcon className={ `${classes.iconButton} ${selected}` } onClick={() => { this.menuClicked('/liquidation') }} />
          </Tooltip>
        )
        break;
      case 'synthetics':
        if(window.location.pathname.includes("/synthetics")) {
          selected = classes.selected
        }
        iconButton = (
          <Tooltip title="Synthetics Market" placement="right">
            <PieChartIcon className={ `${classes.iconButton} ${selected}` } onClick={() => { this.menuClicked('/synthetics') }} />
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

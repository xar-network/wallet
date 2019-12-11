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

const styles = theme => ({
  menuContainer: {
    width: '70px',
    display: 'inline-block',
    background: colors.menu,
  },
  menuButton: {
    height: '70px'
  },
  xarIcon: {
    padding: '17px 5px',
    backgroundColor: colors.white,
    height: '70px'
  },
  iconButton: {
    fill: '#fff',
    width: 'calc(100% - 20px)',
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
    const { classes } = this.props;

    return (
      <div className={classes.menuContainer}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={0}
        >
          <Grid item xs={12} className={ classes.xarIcon } >
            <img src={logo} width='60px' height='36px' />
          </Grid>
          <Grid item xs={12} className={ classes.menuButton } >
            { this.renderButton('csdt') }
          </Grid>
          <Grid item xs={12} className={ classes.menuButton } >
            { this.renderButton('liquidations') }
          </Grid>
        </Grid>
      </div>
    )
  }

  renderButton(path) {
    const { classes, match } = this.props;

    console.log(match)

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

export default withRouter(connect()(withStyles(styles)(Menu)))

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import customTheme from '../theme';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import Home from '../home'
import CSDT from '../csdt'
import Terms from '../terms'
import Menu from '../menu'
import Account from '../account'
import Liquidation from '../liquidation'
import Staking from '../staking'
import { colors } from '../theme'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Grid } from '@material-ui/core';

const styles = theme => ({
  holder: {
    display: 'flex',
  },
  holderSmall: {
    display: 'flex',
    flexDirection: 'column-reverse'
  },
  screenContainer: {
    flex: '1',
    display: 'inline-block',
  },
  screenContainerSmall: {
    flex: '1',
    width: '100%'
  },
  accountContainer: {
    display: 'inline-block',
    width: '500px'
  },
  menuContainer: {
    width: '70px',
    display: 'inline-block',
    background: colors.menu,
  },
  menuContainerHorizontal: {
    height: '70px',
    width: '100%',
    background: colors.menu,
  },
  accountContainerSmall: {
    width: '100%',
    flexShrink: 0
  },
});

class App extends Component {

  render() {
    const { classes, store, width } = this.props;

    return (<MuiThemeProvider theme={ createMuiTheme(customTheme) }>
      <Provider store={store}>
        <Router>
          <Grid container className={isWidthUp('lg', width) ? classes.holder : classes.holderSmall}>
            { isWidthUp('lg', width) ?
              <Grid item className={ classes.menuContainer }>
                <Menu orientation={'vertical'} />
              </Grid>
              :
              null
            }
            <Grid item className={ (isWidthUp('lg', width) ? classes.screenContainer : classes.screenContainerSmall) }>
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/calculator" component={Home} />
              <Route path="/home/:action/:step" component={Home} />
              <Route exact path="/csdt" component={CSDT} />
              <Route exact path="/csdt/:view" component={CSDT} />
              <Route exact path="/csdt/:view/:action" component={CSDT} />
              <Route exact path="/terms" component={Terms} />
              <Route exact path="/liquidation" component={Liquidation} />
              <Route exact path="/staking" component={Staking} />
              <Route exact path="/staking/:action" component={Staking} />
            </Grid>
            <Grid item className={ isWidthUp('lg', width) ? classes.accountContainer : classes.accountContainerSmall }>
              <Account />
            </Grid>
            { !isWidthUp('lg', width) ?
              <Grid item className={ classes.menuContainerHorizontal }>
                <Menu orientation={'horizontal'} />
              </Grid>
              :
              null
            }
          </Grid>
        </Router>
      </Provider>
    </MuiThemeProvider>)
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default withWidth()(withStyles(styles)(App))

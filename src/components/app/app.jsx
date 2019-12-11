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
import Liquidation from '../liquidation'

const styles = theme => ({
  holder: {
    display: 'flex'
  },
  screenContainer: {
    flex: '1',
    display: 'inline-block',
  }
});

class App extends Component {

  render() {
    const { classes, store } = this.props;

    return (<MuiThemeProvider theme={ createMuiTheme(customTheme) }>
      <Provider store={store}>
        <Router>
          <div className={classes.holder}>
            <Menu />
            <div className={classes.screenContainer}>
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/calculator" component={Home} />
              <Route path="/home/:action/:step" component={Home} />
              <Route exact path="/csdt" component={CSDT} />
              <Route exact path="/csdt/:view" component={CSDT} />
              <Route exact path="/csdt/:view/:action" component={CSDT} />
              <Route exact path="/terms" component={Terms} />
              <Route exact path="/liquidation" component={Liquidation} />
            </div>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>)
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default withStyles(styles)(App)

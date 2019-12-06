import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import customTheme from '../theme';
import Home from '../home'
import CSDT from '../csdt'
import Terms from '../terms'

const App = ({ store }) => (
  <MuiThemeProvider theme={ createMuiTheme(customTheme) }>
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/calculator" component={Home} />
        <Route path="/home/:action/:step" component={Home} />
        <Route exact path="/csdt" component={CSDT} />
        <Route exact path="/csdt/:view" component={CSDT} />
        <Route exact path="/csdt/:view/:action" component={CSDT} />
        <Route exact path="/terms" component={Terms} />
      </Router>
    </Provider>
  </MuiThemeProvider>
)

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App

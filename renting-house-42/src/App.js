import React from 'react';
import './App.css';

import Login from './views/Login'
import Layout from './views/Layout'
import NotFound from './views/NotFound'

import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/layout' component={Layout} />
          <Redirect exact from='/' to='/layout' />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

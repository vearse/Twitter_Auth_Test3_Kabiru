import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import TwitterLogin from './components/TwitterLogin.jsx';
import OTPVerification from './components/OTPVerification';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={TwitterLogin} />
        <Route path="/verify-otp" component={OTPVerification} />
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
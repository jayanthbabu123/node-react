import React, { Component } from 'react';
import './App.css';
import Login from './login';
import Register from './register';
import { Switch, Route, Redirect } from 'react-router-dom'
import Dashboard from './Dashboard/dashboard';

class App extends Component {
  render() {
    // if (localStorage.getItem('token')) {
    //   return (
    //     <React.Fragment>
    //       <Switch>
    //       <Route render={() => <Redirect to="/dashboard" />} />
    //         <Route path='/dashboard' component={Dashboard} />
    //       </Switch>
    //     </React.Fragment>
    //   )
    // } else {
    //   return (
    //     <React.Fragment>
    //       <Switch>
    //         <Route exact path='/' component={Login} />
    //         <Route render={() => <Redirect to="/" />} />
    //         <Route path='/login' component={Login} />
    //         <Route path='/register' component={Register} />
    //       </Switch>
    //     </React.Fragment>
    //   )
    // }
    return (
      <div >
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/dashboard' component={Dashboard} />
        </Switch>
      </div>
    )


  }
}

export default App;

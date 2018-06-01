import React, { Component } from 'react';
import Particles from 'react-particles-js';
import { Route, Switch, Redirect } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

import 'tachyons';
import './App.css';

const particlesParams = {
  particles: {
    number: {
      value: 187,
      density: {
        enable: true,
        value_area: 900
      }
    },
    move: {
      enable: true,
      speed: 7,
    }
  }
};

class App extends Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    }
  }

  onSignIn = () => {
    this.setState({ isLoggedIn: true });
  }

  onSignOut = () => {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const { isLoggedIn } = this.state;

    return (
      <div className="App">
        <Particles params={particlesParams} className="particles"/>
        <Navigation isLoggedIn={isLoggedIn} onSignOut={this.onSignOut} />
    
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/signin' /> } /> 
          <Route exact path='/signin' render={() => <Signin onSignIn={this.onSignIn} />} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/dashboard' component={FaceRecognition} />
        </Switch>
      </div>
    );
  }
}

export default App;

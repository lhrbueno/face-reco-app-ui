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
      isLoggedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  onSignIn = () => {
    this.setState({ isLoggedIn: true });
  }

  onSignOut = () => {
    this.setState({ isLoggedIn: false });
  }

  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
      }
    });
  }

  render() {
    const { isLoggedIn, user } = this.state;

    return (
      <div className="App">
        <Particles params={particlesParams} className="particles"/>
        <Navigation isLoggedIn={isLoggedIn} onSignOut={this.onSignOut} />
    
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/signin' /> } /> 
          <Route exact path='/signin' render={() => <Signin onSignIn={this.onSignIn} loadUser={this.loadUser} />} />
          <Route exact path='/register' render={() => <Register onSignIn={this.onSignIn} loadUser={this.loadUser} />} />
          <Route exact path='/profile/:id' render={() => <FaceRecognition user={user} loadUser={this.loadUser} />} />
        </Switch>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Signin from './components/Signin/Signin';

import 'tachyons';
import './App.css';
import Register from './components/Register/Register';

const app = new Clarifai.App({
  apiKey: 'ec7f6e50d4034297a14c9f4231a0a0b8'
});

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
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isLoggedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiImage = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      topRow: clarifaiImage.top_row * height,
      rightCol: width - (clarifaiImage.right_col * width),
      bottomRow: height - (clarifaiImage.bottom_row * height),
      leftCol: clarifaiImage.left_col * width
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (e) => {
    this.setState({ input: e.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input
      )
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    route === 'home' ? this.setState({ isLoggedIn: true }) : this.setState({ isLoggedIn: false });
    this.setState({ route: route });
  }

  render() {
    const { imageUrl, box, route, isLoggedIn } = this.state;

    return (
      <div className="App">
        <Particles params={particlesParams} className="particles"/>
        <Navigation onRouteChange={this.onRouteChange} isLoggedIn={isLoggedIn} />
        
        { 
          route === 'home'
          ?
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition imageUrl={imageUrl} box={box} />
          </div>
          : (
            route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;

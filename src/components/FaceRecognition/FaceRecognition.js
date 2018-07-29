import React, { Component } from 'react';
import Rank from '../Rank/Rank';
import Logo from '../Logo/Logo';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import Clarifai from 'clarifai';

import './faceRecognition.css';

const app = new Clarifai.App({
  apiKey: 'ec7f6e50d4034297a14c9f4231a0a0b8'
});

class FaceRecognition extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    }
  }

  onInputChange = (e) => {
    this.setState({ input: e.target.value });
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

  render() {
    const { imageUrl, box } = this.state;

    return (
      <div>
        <Logo />
        <Rank name={this.props.user.name} entries={this.props.user.entries} />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit} 
        />
        <div className='center ma'>
          <div className='absolute mt3'>
            <img id='inputImage' src={imageUrl} alt='' width='500px' height='auto'/>
            <div className='bounding-box' style={{
              top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol
            }}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default FaceRecognition;
import React, { Component } from 'react';
import Rank from '../Rank/Rank';
import Logo from '../Logo/Logo';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import ClarifaiService from '../../services/clarifai.service';
import UserService from '../../services/user.service';

import './faceRecognition.css';

class FaceRecognition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    };
  }

  onInputChange = e => {
    this.setState({ input: e.target.value });
  };

  calculateFaceLocation = data => {
    const clarifaiImage =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      topRow: clarifaiImage.top_row * height,
      rightCol: width - clarifaiImage.right_col * width,
      bottomRow: height - clarifaiImage.bottom_row * height,
      leftCol: clarifaiImage.left_col * width
    };
  };

  displayFaceBox = box => {
    this.setState({ box: box });
  };

  updateUserEntries = id => {
    const { loadUser } = this.props;

    UserService.updateEntries(id).then(data => {
      if (data.user) loadUser(data.user);
    });
  };

  onButtonSubmit = async () => {
    this.setState({ imageUrl: this.state.input });

    const { input } = this.state;
    const { user } = this.props;

    const response = await ClarifaiService.getFaceRecognition(input);
    this.updateUserEntries(user.id);
    this.displayFaceBox(this.calculateFaceLocation(response));
  };

  render() {
    const { imageUrl, box } = this.state;
    const { user } = this.props;

    return (
      <div>
        <Logo />
        <Rank name={user.name} entries={user.entries} />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <div className="center ma">
          <div className="absolute mt3">
            <img
              id="inputImage"
              src={imageUrl}
              alt=""
              width="500px"
              height="auto"
            />
            <div
              className="bounding-box"
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default FaceRecognition;

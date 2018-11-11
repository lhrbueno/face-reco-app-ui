import ClarifaiConfig from '../config/clarifai.config';

const ClarifaiService = {

  getFaceRecognition: (input) => {
    return ClarifaiConfig
      .app
      .models
      .predict(ClarifaiConfig.FACE_DETECTION, input);
  }

};

export default ClarifaiService;
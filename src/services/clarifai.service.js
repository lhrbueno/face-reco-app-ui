import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'ec7f6e50d4034297a14c9f4231a0a0b8'
});

const ClarifaiService = {

  getFaceRecognition: (input) => {
    return app
      .models
      .predict(Clarifai.FACE_DETECT_MODEL, input);
  }

};

export default ClarifaiService;
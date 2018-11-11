import Clarifai from 'clarifai';
const _API_KEY = 'ec7f6e50d4034297a14c9f4231a0a0b8';

const ClarifaiConfig = {
  app: new Clarifai.App({
    apiKey: _API_KEY
  }),

  FACE_DETECTION: Clarifai.FACE_DETECT_MODEL

}

export default ClarifaiConfig;
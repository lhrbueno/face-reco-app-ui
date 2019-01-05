import Clarifai from 'clarifai';
const _API_KEY = process.env.REACT_APP_CLARIFAI_API_KEY;

const ClarifaiConfig = {
  app: new Clarifai.App({
    apiKey: _API_KEY
  }),

  FACE_DETECTION: Clarifai.FACE_DETECT_MODEL

}

export default ClarifaiConfig;
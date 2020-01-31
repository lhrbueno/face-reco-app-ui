const ClarifaiService = {
  getFaceRecognition: imageUrl => {
    return fetch('http://localhost:3003/api/image-recognition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageUrl
      })
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  }
};

export default ClarifaiService;

const LoginService = {
  
  signin: (email, password) => {
    return fetch('http://localhost:3003/api/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => res.json());
  },

  register: (name, email, password) => {
    return fetch('http://localhost:3003/api/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
      .then(res => res.json());
  }

};

export default LoginService;
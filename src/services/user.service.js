const UserService = {
  
  updateEntries: (id) => {
    return fetch('http://localhost:3003/api/entries', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id
      })
    })
      .then(res => res.json())
  }

}

export default UserService;
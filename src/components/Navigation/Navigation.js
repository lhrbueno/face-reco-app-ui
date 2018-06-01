import React from 'react';
import { Link } from 'react-router-dom';

const Navigaton = ({ isLoggedIn, onSignOut }) => {
  return isLoggedIn
    ? <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <div onClick={() => onSignOut()} className='f3 link dim black underline pa3 pointer'><Link to='/signin'>Sign out</Link></div>
      </nav>
    : <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <div className='f3 link dim black underline pa3 pointer'><Link to='/signin'>Sign in</Link></div>
        <div className='f3 link dim black underline pa3 pointer'><Link to='/register'>Register</Link></div>
      </nav>
}

export default Navigaton;
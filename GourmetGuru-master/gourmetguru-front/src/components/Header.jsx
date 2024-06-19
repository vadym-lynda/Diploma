import React, { useContext } from 'react';
import { Link } from 'react-router-dom';


function Header({isAuthorised}) {
 

  return (
    <div className="header">
      <div className="all-header-items">
        <div className="header-logo">
          <h1><Link to="/">Culinar</Link></h1> 
        </div>

        <div className="header-links">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Recipes">Recipe</Link></li>
            <li><Link to="/About">About us</Link></li>
           { 
           isAuthorised ?
            <li><Link to="/UserAccount">My Account</Link></li>
               :
              <li><Link to="/Register">Register</Link></li>
           }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;

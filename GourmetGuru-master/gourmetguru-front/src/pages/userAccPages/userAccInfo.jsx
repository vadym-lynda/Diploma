import React, { useContext } from 'react';
import { AuthContext } from '../../api/AuthContext'; 
import { useNavigate } from 'react-router-dom';

function UserAccInfo({ role, email, sub }) {

  const navigate = useNavigate();
  const { deleteToken } = useContext(AuthContext); 

  const handleLogout = () => {
    deleteToken(); 
    navigate('/'); 
  };

  return (
    <div className="userInfo">
      <div className="info">
        <p>Ім'я: {sub}</p>
        <p>Адреса електронної пошти: {email}</p>
        <p>Роль користувача: {role === 'ROLE_ADMIN' ? 'Адміністратор' : 'Користувач'}</p>
      </div>
      <div className="btnBlock">
        <button onClick={handleLogout} className='exitBtn'>Вийти з облікового запису</button>
      </div>
    </div>
  );
}

export default UserAccInfo;

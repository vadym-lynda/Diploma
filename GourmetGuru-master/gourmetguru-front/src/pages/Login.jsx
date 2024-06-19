import React, {  useState, useContext } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "../components/Header";
import { AuthContext } from '../api/AuthContext';

function Login() {
  const { isAuthorised } = useContext(AuthContext);
  const {setToken} = useContext(AuthContext);
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
  
      const response = await axios.post('http://localhost:8080/api/auth/sign-in', {
        username: login,
        password: password
      });

      
      const token = response.data.token;
      const decoded =jwtDecode(token);
      localStorage.setItem('userToken', token);
      localStorage.setItem('user_role',decoded.role)
      localStorage.setItem('user_sub',decoded.sub)
      localStorage.setItem('user_email',decoded.email)

   
      
   
    
      setToken(token)
      console.log('Успішно ввійшли', response.data);
      setMessage('Ви ввійшли');


    navigate('/');
    } catch (error) {
      console.error('Не вдалося увійти', error);
      setMessage('Вам не вдалося увійти');
    }
  };

  return (
    <>
     <Header isAuthorised={isAuthorised} />

    <div className="register-form">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form-title">Welcome</h1>

        <div className="form-group">
          <input
            onChange={handleLoginChange}
            value={login}
            className="form-input"
            placeholder=" "
          />
          <label className="form-label">Login</label>
        </div>

        <div className="form-group">
          <input
            onChange={handlePasswordChange}
            value={password}
            className="form-input"
            placeholder=" "
            type="password"
          />
          <label className="form-label">Password</label>
        </div>

        <button type="submit" className="form-btn">Enter</button>
        <a onClick={() => navigate('/Register')} className="form-change" href="#">Not registered yet?</a>

      </form>
    </div>
    </>
  );
}

export default Login;
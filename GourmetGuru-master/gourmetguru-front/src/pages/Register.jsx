import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { AuthContext } from '../api/AuthContext';
import Header from '../components/Header';

function Register() {
  const { isAuthorised } = useContext(AuthContext);
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Перевірка, чи всі поля пусті
    if (!email || !username || !password || !repeatPassword) {
      setRegistrationMessage('Заповніть всі поля');
      return;
    }
  
    if (password !== repeatPassword) {
      setRegistrationMessage('Паролі не співпадають');
      return;
    }
    if (password.length <=4) {
      setRegistrationMessage('Пароль повинен бути мінімум 5 символів');
      return;
    }
   
    try {
      const response = await axios.post('http://localhost:8080/api/auth/sign-up', {
        username,
        password,
        email
      });
  
      const token = response.data.token;
      const decoded = jwtDecode(token);
      localStorage.setItem('userToken', token);
      localStorage.setItem('user_role', decoded.role);
      localStorage.setItem('user_sub', decoded.sub);
      localStorage.setItem('user_email', decoded.email);
      setToken(token);
      console.log('Успішно зареєструвались', response.data);
      setRegistrationMessage('Ви зареєструвались');
      navigate('/');
  
    } catch (error) {
      setRegistrationMessage('Неправильний формат електронного адресу')
      console.log(error)
    }
  };

  return (
    <>
    <Header isAuthorised={isAuthorised} />

    <div className="register-form">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form-title">Register</h1>

        <div className="form-group">
          <input
            onChange={handleEmailChange}
            value={email}
            className="form-input"
            placeholder=" "
          />
          <label className="form-label">Email</label>
        </div>

        <div className="form-group">
          <input
            onChange={handleNameChange}
            value={username}
            className="form-input"
            placeholder=" "
          />
          <label className="form-label">Name</label>
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

        <div className="form-group">
          <input
            onChange={handleRepeatPasswordChange}
            value={repeatPassword}
            className="form-input"
            placeholder=" "
            type="password"
          />
          <label className="form-label">Repeat Password</label>
        </div>


        <button type="submit" className="form-btn">Enter</button>
        <a onClick={() => navigate('/Login')} className="form-change" href="#">Registered already?</a>
        <p>{registrationMessage}</p>
      </form>
    </div>
    </>
  );
}

export default Register;

// Login Form Component

import './LoginForm.scss';
import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import backArrow from '../../assets/icons/back-arrow.png';
import eyeIcon from '../../assets/icons/eye-icon.png';

const LoginForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const formRef = useRef();

  // States for handling login errors and messages
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Toggle password visibility function
  const togglePasswordVisibility = () => {
    const passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
      passwordField.type = "text";
    } else {
      passwordField.type = "password";
    }
  };

  const apiBaseURL = process.env.REACT_APP_SERVER;
  // Function to handle login
  const handleLogin = (e) => {
    e.preventDefault();
    if (!formRef.current.email.value  || !formRef.current.password.value) {
      return alert('Please enter both your email and password');
    }
    axios
    .post(`${apiBaseURL}/users/login`, {
      email: formRef.current.email.value,
      password: formRef.current.password.value,
    })
    .then((res) => {
      sessionStorage.setItem('authToken', res.data.token);
      sessionStorage.setItem('loggedIn', 'true');
      setIsLoggedIn(true);
      setIsLoginError(false);
      setErrorMessage("");
      navigate('/');
    })
    .catch((error) => {
      setIsLoginError(true);
      setErrorMessage(error.response.data.message);
    });
  };

  return (
    <div className="login-form">
      <div className="login-form__heading-container">
        <Link to='/'>
          <img className="login-form__back-arrow" src={backArrow} alt='back arrow'/>
        </Link>
        <h1 className="login-form__heading">Log In</h1>
      </div>
      <form className="login-form__form" onSubmit={handleLogin} ref={formRef}>
        <div className="login-form__input-container">
          <input
            className="login-form__input"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            maxLength="50"
          />
        </div>
        <div className="login-form__input-container login-form__password-container">
          <input
            className="login-form__input"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            maxLength="50"
          />
          <span className="toggle-password" onClick={() => togglePasswordVisibility()}>
            <img className="eye-icon" src={eyeIcon} alt="eye-icon"/>
          </span>
        </div>
        {isLoginError && <p className="login-form__login-error">{errorMessage}</p>}
        <button className="login-form__login-button">Log In</button>
        <p className="login-form__link-container">Don't have an account?
          <Link className="login-form__signup-link" to='/signup'>
            Sign up here!
          </Link> 
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
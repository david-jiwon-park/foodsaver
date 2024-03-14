import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import './LoginForm.scss';

const LoginForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const formRef = useRef();
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!formRef.current.email.value  || !formRef.current.password.value) {
      alert('All fields are required to log in.');
    }

    axios
    .post('http://localhost:8090/users/login', {
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
      // setErrorMessage(error.response.data.error.message);
    });
  };


  return (
    <div className="LogInForm">
      <h1>Login</h1>
      {isLoginError && <label style={{ color: "red" }}>{errorMessage}</label>}
      <form className="LogInForm__form" onSubmit={onSubmit} ref={formRef}>
        
        <label className="LogInForm__label" htmlFor="email">Email</label>
        <input
          className="LogInForm__input"
          id="email"
          name="email"
          type="email"
          placeholder="Email Address"
        />
      
        <label className="LogInForm__label" htmlFor="password">Password</label>
        <input
          className="LogInForm__input"
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
    
        <button>Log In</button>
        <Link to='/signup'>
          New to FoodSaver? Sign up here!
        </Link> 
      </form>
    </div>
  );
};

export default LoginForm;
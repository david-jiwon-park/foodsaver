import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupForm.scss';
import backArrow from '../../assets/icons/back-arrow.png';
import insertDefaultNotifications from '../../utils/insertDefaultNotifications';

const SignupForm = () => {
  const [signUpErrorMessage, setSignUpErrorMessage] = useState("");
  const navigate = useNavigate();
  const formRef = useRef();

  // Function to handle signup
  const handleSignUp = (e) => {
    e.preventDefault();
    if (!formRef.current.name.value || !formRef.current.email.value || !formRef.current.password.value) {
      return alert('Make sure to fill out all the fields');
    }
    axios
    .post('http://localhost:8090/users/signup', {
      name: formRef.current.name.value,
      email: formRef.current.email.value,
      password: formRef.current.password.value,
    })
    .then((response) => {
      // Upon signup, users will have default notfications settings inserted 
      insertDefaultNotifications(response.data.user);
    })
    .then((response2) => {
      setSignUpErrorMessage("");
      alert("Your account has been created!");
      navigate('/login');
    })
    .catch((error) => {
      console.log(error);
      setSignUpErrorMessage(error.response.data.message);
    })
  };

  return (
    <div className="signup-form">
      <div className="signup-form__heading-container">
        <Link to='/'>
          <img className="signup-form__back-arrow" src={backArrow} alt='back arrow'/>
        </Link>
        <h1 className="signup-form__heading">Sign Up</h1>
      </div>
      <form className="signup-form__form" onSubmit={handleSignUp} ref={formRef}>
        <div className="signup-form__input-container">
          <input
            className="signup-form__input"
            id="name"
            name="name"
            type="text"
            placeholder="Name"
          />
        </div>
        <div className="signup-form__input-container">
          <input
            className="signup-form__input"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div className="signup-form__input-container">
          <input
            className="signup-form__input"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <p className="signup-form__signup-error">{signUpErrorMessage}</p>
        <button className="signup-form__signup-button">Sign Up</button>
        <p className="signup-form__link-container">Got an account?
          <Link className="signup-form__login-link" to='/login'>
            Log in here!
          </Link> 
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
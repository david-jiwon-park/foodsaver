import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupForm.scss';
import backArrow from '../../assets/icons/back-arrow.png';
import insertDefaultNotifications from '../../utils/insertDefaultNotifications';

const SignupForm = () => {
  const navigate = useNavigate();

  // State for handling signup errors
  const [signUpErrorMessage, setSignUpErrorMessage] = useState("");

  //States for handling password mismatches
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);

    // Clear password match error when the new password changes
    setPasswordMatchError('');
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);

    // Check password match when the confirm password changes
    if (password !== event.target.value) {
      setPasswordMatchError('Passwords do not match');
    } else {
      setPasswordMatchError('');
    }
  };

  // Function to handle signup
  const handleSignUp = (e) => {
    e.preventDefault();
    if (!e.target.name.value || !e.target.email.value || !e.target.password.value || !e.target.confirm_password.value) {
      return alert('Make sure to fill out all the fields');
    }
    if (e.target.password.value !== e.target.confirm_password.value) {
      return alert("Please ensure the passwords entered match.")
    } 
    axios
    .post('http://localhost:8090/users/signup', {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value 
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
      <form className="signup-form__form" onSubmit={handleSignUp}>
        <div className="signup-form__input-container">
          <input
            className="signup-form__input"
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            maxLength="50"
          />
        </div>
        <div className="signup-form__input-container">
          <input
            className="signup-form__input"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            maxLength="50"
          />
        </div>
        <div className="signup-form__input-container">
          <input
            className="signup-form__input"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            maxLength="50"
          />
        </div>
        <div className="signup-form__input-container">
          <input
            className="signup-form__input"
            id="confirm_password"
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            maxLength="50"
          />
        </div>
        <p className="signup-form__signup-error">{passwordMatchError}</p>
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
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupForm.scss';
import backArrow from '../../assets/icons/back-arrow.png';

const SignupForm = () => {
  const navigate = useNavigate();
  const formRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    if (!formRef.current.name.value || !formRef.current.email.value || !formRef.current.password.value) {
      alert('Make sure to fill out all the fields');
      return;
    }

    axios
    .post('http://localhost:8090/users/signup', {
      name: formRef.current.name.value,
      email: formRef.current.email.value,
      password: formRef.current.password.value,
    })
    .then((_res) => {
      alert("Your account has been created!");
      navigate('/login');
    })
    .catch((error) => {
      console.log(error);
      alert("There was an issue with creating your account. Please try again later.");
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
      <form className="signup-form__form" onSubmit={onSubmit} ref={formRef}>
          
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
            placeholder="Email Address"
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
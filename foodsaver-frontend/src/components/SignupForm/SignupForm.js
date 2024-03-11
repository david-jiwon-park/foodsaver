import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupForm.scss';

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
    <div className="SignUpForm">
      <h1>Sign Up</h1>
      <form className="SignUpForm__form" onSubmit={onSubmit} ref={formRef}>
          
          <label className="SignUpForm__label" htmlFor="name">Name</label>
          <input
            className="SignUpForm__input"
            id="name"
            name="name"
            type="text"
            placeholder="Name"
          />

          <label className="SignUpForm__label" htmlFor="email">Email</label>
          <input
            className="SignUpForm__input"
            id="email"
            name="email"
            type="email"
            placeholder="Email Address"
          />

          <label className="SignUpForm__label" htmlFor="password">Password</label>
          <input
            className="SignUpForm__input"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            
          />

        <button>Sign Up</button>
        <Link to='/login'>
          Got an account? Log in here!
        </Link> 
      </form>
    </div>
 
  );
};

export default SignupForm;
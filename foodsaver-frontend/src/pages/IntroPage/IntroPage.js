import './IntroPage.scss';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const IntroPage = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to the inventory page if the user has already logged in
    if (isLoggedIn) {
      navigate('/inventory');
    } 
    }, [isLoggedIn]);
    
  return (
    <div className='intro-page'>
      <h1 className='intro-page__heading'>Food Saver</h1>
      <h4 className='intro-page__subheading'>We help save your food before it expires!</h4>
      <div className='intro-page__links'>
        <Link className='intro-page__login-link' to="/login">
          <button className='intro-page__login-button'>Log In</button>
        </Link>
        <Link className='intro-page__signup-link' to="/signup">
          <button className='intro-page__signup-button'>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default IntroPage;
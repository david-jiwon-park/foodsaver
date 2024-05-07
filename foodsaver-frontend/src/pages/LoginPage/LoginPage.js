// Login Page 

import './LoginPage.scss';
import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage = ({ setIsLoggedIn }) => {
  return (
    <div className="login-page">
      <h1 className="login-page__header">Food Saver</h1>
      <LoginForm 
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  );
};

export default LoginPage;
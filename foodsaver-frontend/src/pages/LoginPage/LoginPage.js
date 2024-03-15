import './LoginPage.scss';
import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage = ({ setIsLoggedIn }) => {
  return (
    <div className="login-page">
      <LoginForm 
        setIsLoggedIn={setIsLoggedIn}
      />
    </div>
  );
};

export default LoginPage;
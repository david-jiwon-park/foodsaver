import LoginForm from '../../components/SignupForm/SignupForm';

const LoginPage = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <>
      <LoginForm 
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  );
};

export default LoginPage;
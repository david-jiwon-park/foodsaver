import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage = ({ setIsLoggedIn }) => {
  return (
    <>
      <LoginForm 
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  );
};

export default LoginPage;
// Signup Page 

import './SignupPage.scss';
import SignupForm from '../../components/SignupForm/SignupForm';

const SignupPage = () => {
  return (
    <div className="signup-page">
      <h1 className="signup-page__header">Food Saver</h1>
        <SignupForm />
    </div>
  );
};

export default SignupPage;
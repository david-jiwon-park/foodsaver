import './UserProfilePage.scss'
import Header from '../../components/Header/Header'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfo from '../../utils/getUserInfo';
import getNotificationSettings from '../../utils/getNotificationSettings';
import editIcon from '../../assets/icons/edit-icon.svg';


const UserProfilePage = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState([]);
  const [notificationSettings, setNotificationSettings] = useState([]);

  useEffect(() => {
    // Get the user profile info if they are logged in 
    if (isLoggedIn) {
      getUserInfo({ setUserInfo });
      getNotificationSettings({ setNotificationSettings });
    } else {
      navigate('/');
    }
    }, [isLoggedIn]);

    const handleSignOut = () => {
      sessionStorage.setItem('loggedIn', JSON.stringify(false));
      sessionStorage.clear();
      setIsLoggedIn(false);
      navigate('/');
    };

    const { name, email } = userInfo;
    const { enabled, days_before } = notificationSettings;


  return (
    <>
      <Header 
          setIsLoggedIn={setIsLoggedIn}
      />
      <div className='profile-page'>
        <h1 className='profile-page__heading'>User Profile</h1>
        
        <section className='profile-page__info'>
          
          <div className='profile-page__name-email'>
            <div className='profile-page__label-container'>
              <h5 className='profile-page__label-text profile-page__label-text--top'>Name</h5>
              <h5 className='profile-page__label-text'>Email</h5>
            </div>
            <div className='profile-page__field-container'>
              <p className='profile-page__field-text profile-page__field-text--top'>{name}</p>
              <p className='profile-page__field-text'>{email}</p>
            </div>
            <img className='profile-page__edit-name-email' src={editIcon} alt='edit icon'/>
          </div>

          <div className='profile-page__password-container'>
            <h5 className='profile-page__label-text'>Password</h5>
            <p className='profile-page__password-field'>***************</p>
            <img className='profile-page__edit-name-email' src={editIcon} alt='edit icon'/>
          </div>
        </section>

        <h1 className='profile-page__heading'>Preferences</h1>
        
          <h5>Notifications</h5>
          <h5>Notify Me</h5>
          <p>{days_before} days before expiration</p>

        {/* <button>Delete Account</button> */}

        <button className="profile-page__signout-button" onClick={handleSignOut}>
            Sign Out
        </button>
      </div>
        

    </>
  )
}

export default UserProfilePage;
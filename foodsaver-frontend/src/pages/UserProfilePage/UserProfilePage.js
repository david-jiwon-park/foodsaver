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
            <h5 className='profile-page__password-text'>Password</h5>
            <div className='profile-page__password-field'>
              <p className='profile-page__password'>**********</p>
            </div>
            <img className='profile-page__edit-name-email' src={editIcon} alt='edit icon'/>
          </div>
        </section>

        <h1 className='profile-page__heading'>Preferences</h1>
        
        <form>
          <div className='profile-page__notifications-container'>
            <h5 className='profile-page__notifications-label'>Notifications</h5>
            <label class="toggle">
              <input type="checkbox"/>
              <span className="slider"></span>
            </label>
          </div>
          
          <div className='profile-page__notify-container'>
            <label htmlFor="notify" className='profile-page__notifications-label'>Notify Me</label>
              <select className="profile-page__notify-field" name="notify" id="notify" defaultValue={days_before}>
                <option value="0">On Exp Date</option>
                <option value="1">1 Day Before Exp</option>
                <option value="2">2 Days Before Exp</option>
                <option value="3">3 Days Before Exp</option>
                <option value="4">4 Days Before Exp</option>
                <option value="5">5 Days Before Exp</option>
              </select>
          </div>
        </form>

        {/* <button>Delete Account</button> */}

        <div className="profile-page__signout-button-container">
          <button className="profile-page__signout-button" onClick={handleSignOut}>
              Sign Out
          </button>
        </div>
      </div>
        

    </>
  )
}

export default UserProfilePage;
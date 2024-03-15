import Header from '../../components/Header/Header'
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import getUserInfo from '../../utils/getUserInfo';
import getNotificationSettings from '../../utils/getNotificationSettings';


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

    const handleLogout = () => {
      sessionStorage.setItem('loggedIn', JSON.stringify(false));
      sessionStorage.clear();
      setIsLoggedIn(false);
      navigate('/');
    };

    const { name, email } = userInfo;
    const { enabled, days_before } = notificationSettings;


  return (
    <div>
      <Header 
          setIsLoggedIn={setIsLoggedIn}
      />
      <h1>User Profile Page</h1>
      
      <h2>User Info</h2>
      <h5>Name</h5>
      <p>{name}</p>
      <h5>Email</h5>
      <p>{email}</p>
      <h5>Password</h5>
      <button>Change Password</button>

      <h2>Notifications</h2>
      <h5>Notification Timing</h5>
      <p>{days_before} days before expiration</p>

      <button>Delete Account</button>

      <button className="UserProfile__logout-button" onClick={handleLogout}>
          Sign Out
      </button>


    </div>
  )
}

export default UserProfilePage;
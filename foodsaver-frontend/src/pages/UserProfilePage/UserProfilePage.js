// User Profile Page

import './UserProfilePage.scss'
import Header from '../../components/Header/Header'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditUserInfoModal from '../../components/EditUserInfoModal/EditUserInfoModal';
import ChangePasswordModal from '../../components/ChangePasswordModal/ChangePasswordModal';
import DeleteUserModal from '../../components/DeleteUserModal/DeleteUserModal';
import getUserInfo from '../../utils/getUserInfo';
import getNotificationSettings from '../../utils/getNotificationSettings';
import editIcon from '../../assets/icons/edit-icon.svg';
import axios from 'axios';

const UserProfilePage = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  // States to retrieve and store relevant data
  const [userInfo, setUserInfo] = useState([]);
  const [notificationSettings, setNotificationSettings] = useState([]);

  // States to keep track of when modals are open or closed 
  const [isEditUserInfoModalOpen, setIsEditUserInfoModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  
  // State tracking if the user has notifications on or off 
  const [areNotificationsOn, setAreNotificationsOn] = useState(false);

  // Loading and loading error states 
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("");
  const [loadingError, setLoadingError] = useState(false);

  const { name, email } = userInfo;
  const { enabled, days_before } = notificationSettings;

  // Function to check if user has notifications enabled 
  const checkNotifications = () => {
    setAreNotificationsOn(enabled === 1);
  };

  useEffect(() => {
    // Get the user's profile info if they are logged in 
    if (isLoggedIn) {
      getUserInfo()
      .then((response) => {
        setUserInfo(response.data);
        return getNotificationSettings();
      })
      .then((response2) => {
        setNotificationSettings(response2.data);
        setLoading(false);
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        setLoading(false);
        setLoadingError(true);
        console.log(error);
      })
    } else {
      navigate('/');
    }
    }, [isLoggedIn, isEditUserInfoModalOpen]);

  // useEffect to check if notifications have been enabled every time notification settings are updated
  useEffect(() => {
    checkNotifications();
  }, [notificationSettings]);

  // Function for the user to sign out 
  const handleSignOut = () => {
    sessionStorage.setItem('loggedIn', JSON.stringify(false));
    sessionStorage.clear();
    setIsLoggedIn(false);
  };

  // Functions to handle opening/closing modals
  const handleOpenEditUserInfoModal = () => {
    setIsEditUserInfoModalOpen(true);
  };
  const handleCloseEditUserInfoModal = () => {
    setIsEditUserInfoModalOpen(false);
  };
  const handleOpenChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true);
  };
  const handleCloseChangePasswordModal = () => {
    setIsChangePasswordModalOpen(false);
  };
  const handleOpenDeleteUserModal = () => {
    setIsDeleteUserModalOpen(true);
  };
  const handleCloseDeleteUserModal = () => {
    setIsDeleteUserModalOpen(false);
  };

  // Functions to toggle notifications on/off
  const toggleNotifications = () => {
    if (areNotificationsOn) {
      handleDisablingNotifications();
    } else {
      handleEnablingNotifications();
    }
  };

  const apiBaseURL = 'http://localhost:8090';

  // Function to disable notifications in the backend
  const handleDisablingNotifications = () => {
    const token = sessionStorage.getItem('authToken');
    axios
    .put(`${apiBaseURL}/notifications`, {
      enabled: 0
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((_response) => {
      return getNotificationSettings();
    })
    .then((response2) => {
      setNotificationSettings(response2.data);
    })
    .catch((error) => {
      console.log(error);
    })
  };

  // Function to enable notifications in the backend
  const handleEnablingNotifications = () => {
    const token = sessionStorage.getItem('authToken');
    axios
    .put(`${apiBaseURL}/notifications`, {
      enabled: 1
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((_response) => {
      return getNotificationSettings();
    })
    .then((response2) => {
      setNotificationSettings(response2.data);
    })
    .catch((error) => {
      console.log(error);
    })
  };

  // Function to change the notification timing preference 
  const changeNotifyMe = (e) => {
    const token = sessionStorage.getItem('authToken');
    axios
    .put(`${apiBaseURL}/notifications`, {
      days_before: e.target.value
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((_response) => {
      return getNotificationSettings();
    })
    .then((response2) => {
      setNotificationSettings(response2.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  // Loading text to appear if the page still has not loaded after 800 milliseconds and there was no loading error
  useEffect(() => {
    setTimeout(() => {
      if (loading && !loadingError) {
        setLoadingText("Loading...")
      } else {
        setLoadingText("");
      }
    }, 800)
  }, [loading, loadingError]);


  return (
    <>
      <Header 
        setIsLoggedIn={setIsLoggedIn}
      />
      {!loading && loadingError ? 
      (<h1 className="loading-error">Failed to load page</h1>)
      : null 
      }
      {!loading && !loadingError ?
      (<div className='profile-page'>
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
            <img className='profile-page__edit-name-email' src={editIcon} alt='edit icon' onClick={() => handleOpenEditUserInfoModal()}/>
          </div>
          <div className='profile-page__password-container'>
            <h5 className='profile-page__password-text'>Password</h5>
            <div className='profile-page__password-field'>
              <p className='profile-page__password'>**********</p>
            </div>
            <img className='profile-page__edit-name-email' src={editIcon} alt='edit icon' onClick={() => handleOpenChangePasswordModal()}/>
          </div>
          <p className='profile-page__delete-account' onClick={() => handleOpenDeleteUserModal()}>Delete Account</p>
        </section>
        <h1 className='profile-page__heading'>Preferences</h1>
        <form>
          <div className='profile-page__notifications-container'>
            <h5 className='profile-page__notifications-label'>Email Notifications</h5>
            <label className="profile-page__toggle">
              <input 
                type="checkbox" 
                id="toggleSwitch" 
                checked={areNotificationsOn}
                onChange={toggleNotifications}
              />
              <span className="profile-page__slider"></span>
            </label>
          </div>
          {areNotificationsOn && 
          (<div className='profile-page__notify-container'>
            <label htmlFor="notify" className='profile-page__notifications-label'>Notify Me</label>
              <select 
                className="profile-page__notify-field" 
                name="notify" 
                id="notify" 
                defaultValue={days_before}
                onChange={changeNotifyMe}
              >
                <option value="1">1 Day Before Exp</option>
                <option value="2">2 Days Before Exp</option>
                <option value="3">3 Days Before Exp</option>
                <option value="4">4 Days Before Exp</option>
                <option value="5">5 Days Before Exp</option>
              </select>
          </div>)}
        </form>
        <div className="profile-page__signout-button-container">
          <button className="profile-page__signout-button" onClick={handleSignOut}>
              Sign Out
          </button>
        </div>
      </div>)
      : 
      (<h1 className="profile-page__loading">{loadingText}</h1>)}
      <EditUserInfoModal 
        isOpen={isEditUserInfoModalOpen} 
        onClose={handleCloseEditUserInfoModal} 
        userName={name} 
        userEmail={email}
      />
      <ChangePasswordModal 
        isOpen={isChangePasswordModalOpen} 
        onClose={handleCloseChangePasswordModal} 
      />
      <DeleteUserModal 
        isOpen={isDeleteUserModalOpen} 
        onClose={handleCloseDeleteUserModal} 
        setIsLoggedIn={setIsLoggedIn}
      />
    </>
  );
};

export default UserProfilePage;
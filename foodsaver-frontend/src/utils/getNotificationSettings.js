import axios from 'axios';

const getNotificationSettings = ({ setNotificationSettings }) => {
  const notificationsURL = 'http://localhost:8090/notifications';
  const token = sessionStorage.getItem('authToken');
  axios
    .get(notificationsURL , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setNotificationSettings(response.data);
      window.scrollTo(0, 0);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getNotificationSettings;
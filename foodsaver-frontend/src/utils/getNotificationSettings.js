import axios from 'axios';

const getNotificationSettings = () => {
  const notificationsURL = 'http://localhost:8090/notifications';
  const token = sessionStorage.getItem('authToken');
  return axios
    .get(notificationsURL , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
};

export default getNotificationSettings;
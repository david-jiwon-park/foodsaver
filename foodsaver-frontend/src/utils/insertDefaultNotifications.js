import axios from 'axios';

const insertDefaultNotifications = (newUserId) => {
  const notificationsURL = 'http://localhost:8090/notifications';
  return axios
    .post(notificationsURL, {
      user_id: newUserId
    })
};

export default insertDefaultNotifications;
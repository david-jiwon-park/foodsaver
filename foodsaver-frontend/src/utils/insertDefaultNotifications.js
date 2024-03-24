// Function to add default notification settings for new users 

import axios from 'axios';

const apiBaseURL = process.env.REACT_APP_SERVER;
const insertDefaultNotifications = (newUserId) => {
  return axios
    .post(`${apiBaseURL}/notifications`, {
      user_id: newUserId
    })
};

export default insertDefaultNotifications;
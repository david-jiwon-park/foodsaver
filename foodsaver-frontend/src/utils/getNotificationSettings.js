// Function to get notification settings for a logged-in from the database

import axios from 'axios';

const apiBaseURL = process.env.REACT_APP_SERVER;
const getNotificationSettings = () => {
  const token = sessionStorage.getItem('authToken');
  return axios
    .get(`${apiBaseURL}/notifications` , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
};

export default getNotificationSettings;
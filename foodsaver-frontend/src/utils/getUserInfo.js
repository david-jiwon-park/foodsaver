// Function to get user info for a logged-in user from the database

import axios from 'axios';

const apiBaseURL = process.env.REACT_APP_SERVER;
const getUserInfo = () => {
  const token = sessionStorage.getItem('authToken');
  return axios
    .get(`${apiBaseURL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
};

export default getUserInfo;
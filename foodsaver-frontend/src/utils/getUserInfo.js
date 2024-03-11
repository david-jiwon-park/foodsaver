import axios from 'axios';

const getUserInfo = ({ setUserInfo }) => {
  const usersURL = 'http://localhost:8090/users';
  const token = sessionStorage.getItem('authToken');
  axios
    .get(usersURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setUserInfo(response.data);
      window.scrollTo(0, 0);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getUserInfo;
import axios from 'axios';

const getUserInventory = ({ setUserInventory }) => {
  const inventoryURL = 'http://localhost:8090/inventory';
  const token = sessionStorage.getItem('authToken');
  axios
    .get(inventoryURL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const sortedData = response.data.sort((a, b) => new Date(a.exp_date) - new Date(b.exp_date));
      setUserInventory(sortedData);
      window.scrollTo(0, 0);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getUserInventory;

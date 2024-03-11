import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Header from '../../components/Header/Header'
import getUserInventory from '../../utils/getUserInventory';

const InventoryPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [userInventory, setUserInventory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get the user's inventory list if they are logged in 
    if (isLoggedIn) {
      getUserInventory({ setUserInventory });
    } else {
      navigate('/login');
    }
    }, [isLoggedIn]);

  return (
    <div>
      <Header 
        setIsLoggedIn={setIsLoggedIn}
      />
      <div>
        <h1>Inventory</h1>
        {userInventory.filter((item) => {
          return item.discarded == 0
        })
        .map((item) => (
          <div key={item.id}>
            <h3>{item.food_item}</h3>
            <p>{item.exp_date}</p>
          </div>
        ))}
      </div>
    </div>
  )
};

export default InventoryPage;
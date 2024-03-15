import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Header from '../../components/Header/Header';
import getUserInventory from '../../utils/getUserInventory';

const RecipesPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [userInventory, setUserInventory] = useState([]);

  useEffect(() => {
    // Get the user's inventory list if they are logged in 
    if (isLoggedIn) {
      getUserInventory({ setUserInventory });
    } else {
      navigate('/');
    }
    }, [isLoggedIn]);
    
  return (
    <div>
      <Header 
        setIsLoggedIn={setIsLoggedIn}
      />
      <h1>Recipes Page</h1>
      <h2>Inventory</h2>
      {userInventory.filter((item) => {
        return item.discarded == 0
      })
      .map((item) => (
      <div key={item.id}>
        <h3>{item.food_item}</h3>
      </div>
      ))}

      <button>Find Recipes</button>

      <h2>Suggested Recipes</h2>

      <h2>Favorite Recipes</h2>

    </div>
  )
};

export default RecipesPage;
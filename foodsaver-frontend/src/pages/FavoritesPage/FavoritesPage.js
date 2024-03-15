import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Header from '../../components/Header/Header';
import getUserFavorites from '../../utils/getUserFavorites';

const FavoritesPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    // Get the user's inventory list if they are logged in 
    if (isLoggedIn) {
      getUserFavorites({ setUserFavorites });
    } else {
      navigate('/');
    }
    }, [isLoggedIn, userFavorites]);
    
  return (
    <div>
      <Header 
        setIsLoggedIn={setIsLoggedIn}
      />
      <h1>Favorites Page</h1>
      {userFavorites.map((favorite) => (
        <div key={favorite.id}>
            <p>{favorite.recipe_id}</p>
        </div>
      ))}

    </div>
  )
};

export default FavoritesPage;
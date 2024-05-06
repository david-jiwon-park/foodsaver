// Recipe Modal Component

import './RecipeModal.scss';
import { useEffect, useState } from 'react';
import getUserFavorites from '../../utils/getUserFavorites';
import axios from 'axios';
import backArrow from '../../assets/icons/back-arrow.png';
import emptyheartIcon from '../../assets/icons/empty-heart-icon.png';
import fullheartIcon from '../../assets/icons/full-heart-icon.png';
import RecipeNutritionInfo from '../RecipeNutritionInfo/RecipeNutritionInfo';
import RecipeIngredients from '../RecipeIngredients/RecipeIngredients';
import RecipeCookingInstructions from '../RecipeCookingInstructions/RecipeCookingInstructions';

const RecipeModal = ({ isOpen, onClose, uri, image, name, servings, ingredients, nutrition, directionsLink }) => {
  const [userFavorites, setUserFavorites] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);

  // Function to check if the recipe has already been favorited
  const checkFavorite = (uri) => {
    const results = userFavorites.filter(obj => obj.recipe_uri.includes(uri));
    setIsFavorited(results.length !== 0);
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    } else {
      getUserFavorites()
      .then((response) => {
        setUserFavorites(response.data);
        checkFavorite(uri);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [isOpen]);

  // Re-rendering the modal everytime user favorites are updated
  useEffect(() => {
    checkFavorite(uri);
  }, [uri, userFavorites]);
  
  if (!isOpen) return null
 
  // Function to toggle between favoriting and unfavoriting recipes
  const toggleFavorite = () => {
    if (isFavorited) {
      handleUnfavoriteRecipe();
    } else {
      handleFavoriteRecipe();
    }
  };

  const apiBaseURL = process.env.REACT_APP_SERVER;
  // Function to favorite a recipe
  const handleFavoriteRecipe = () => {
    const token = sessionStorage.getItem('authToken');
    axios
    .post(`${apiBaseURL}/favorites`, {
      recipe_uri: uri
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((_response) => {
      return getUserFavorites();
    })
    .then((response2) => {
      setUserFavorites(response2.data);
    })
    .catch((error) => {
      console.log(error);
    })
  };

  // Function to unfavorite a recipe
  const handleUnfavoriteRecipe = () => {
    const token = sessionStorage.getItem('authToken');
    axios
    .delete(`${apiBaseURL}/favorites/${uri}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((_response) => {
      return getUserFavorites();
    })
    .then((response2) => {
      setUserFavorites(response2.data);
    })
    .catch((error) => {
      console.log(error);
    })
  };

  return (  
    <div className="overlay">
      <div className="recipe-modal">
        <div>
          <img className="recipe-modal__back-arrow" src={backArrow} alt="back arrow" onClick={() => onClose()}/> 
          <div className="recipe-modal__recipe-image-container">
            <img className="recipe-modal__recipe-image" src={image} alt="recipe"/>
          </div>
          {isFavorited ?  
            (<img className="recipe-modal__heart" src={fullheartIcon} alt="heart" onClick={() => toggleFavorite()}/>) : 
            (<img className="recipe-modal__heart" src={emptyheartIcon} alt="heart" onClick={() => toggleFavorite()}/>)
          }
        </div>


        <h3 className="recipe-modal__name">{name}</h3>
        <h5 className="recipe-modal__servings">{servings} {servings === 1 ? "serving" : "servings"}</h5>
        <RecipeIngredients
          ingredients={ingredients}
        />
        <RecipeNutritionInfo 
          servings={servings}
          nutrition={nutrition}
        />
        <RecipeCookingInstructions 
          directionsLink={directionsLink}
        />
      </div>
    </div>
  );
};
  
export default RecipeModal;
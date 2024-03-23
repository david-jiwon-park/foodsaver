//Recipe Modal Component

import './RecipeModal.scss';
import { useEffect, useState } from 'react';
import getUserFavorites from '../../utils/getUserFavorites';
import axios from 'axios';
import backArrow from '../../assets/icons/back-arrow.png';
import emptyheartIcon from '../../assets/icons/empty-heart-icon.png';
import fullheartIcon from '../../assets/icons/full-heart-icon.png';

const RecipeModal = ({ isOpen, onClose, uri, image, name, servings, ingredients, nutrition, directionsLink }) => {
  const [userFavorites, setUserFavorites] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);

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

  useEffect(() => {
    checkFavorite(uri);
  }, [uri, userFavorites]);
  
  // incorporate useEffect, have if statement if isOpen is null or not
  if (!isOpen) return null
 
  const toggleFavorite = () => {
    if (isFavorited) {
      handleUnfavoriteRecipe();
    } else {
      handleFavoriteRecipe();
    }
  };

  const apiBaseURL = 'http://localhost:8090';

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
    .then((response) => {
      console.log(response);
      return getUserFavorites();
    })
    .then((response2) => {
      setUserFavorites(response2.data);
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const handleUnfavoriteRecipe = () => {
    const token = sessionStorage.getItem('authToken');
    axios
    .delete(`${apiBaseURL}/favorites/${uri}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((response) => {
      console.log(response);
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
      <img className="recipe-modal__back-arrow" src={backArrow} alt="back arrow" onClick={() => onClose()}/> 
      {isFavorited ?  
        (<img className="recipe-modal__heart" src={fullheartIcon} alt="heart" onClick={() => toggleFavorite()}/>) : 
        (<img className="recipe-modal__heart" src={emptyheartIcon} alt="heart" onClick={() => toggleFavorite()}/>)
      }
      <div className="recipe-modal">
        <div className="recipe-modal__recipe-image-container">
          <img className="recipe-modal__recipe-image" src={image} alt="recipe"/>
        </div>
        <h3 className="recipe-modal__name">{name}</h3>
        <h5 className="recipe-modal__servings">{servings} {servings === 1 ? "serving" : "servings"}</h5>
        
        <section className="recipe-modal__ingredients-section">
          <h4 className="recipe-modal__section-heading">Ingredients</h4>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li 
                className="recipe-modal__ingredient"
                key={index}
                >
                {ingredient} 
              </li>
            ))}
          </ul>
        </section>

        <section className="recipe-modal__nutrition-section">
          <h4 className="recipe-modal__section-heading">Nutritional Information</h4>
          <div className="recipe-modal__nutrition-content">
            
            <div className="recipe-modal__top-row"> 
              <div className="recipe-modal__macros">
                <div className="recipe-modal__macro-micro-container">
                  <div className="recipe-modal__circle recipe-modal__circle--protein"></div>
                  <p className="recipe-modal__macro-micro">PROTEIN</p>
                  <p className="recipe-modal__macro-micro recipe-modal__macro-micro--quantity">{Math.floor(nutrition["PROCNT"].quantity)}{nutrition["PROCNT"].unit}</p>
                </div>
                <div className="recipe-modal__macro-micro-container">
                  <div className="recipe-modal__circle recipe-modal__circle--fat"></div>
                  <p className="recipe-modal__macro-micro">FAT</p>
                  <p className="recipe-modal__macro-micro recipe-modal__macro-micro--quantity">{Math.floor(nutrition["FAT"].quantity)}{nutrition["FAT"].unit}</p>
                </div>
                <div className="recipe-modal__macro-micro-container">
                  <div className="recipe-modal__circle recipe-modal__circle--carb"></div>
                  <p className="recipe-modal__macro-micro">CARB</p>
                  <p className="recipe-modal__macro-micro recipe-modal__macro-micro--quantity">{Math.floor(nutrition["CHOCDF"].quantity)}{nutrition["CHOCDF"].unit}</p>
                </div>
              </div>
            </div>
              
            <div className="recipe-modal__bottom-row">
              <div className="recipe-modal__kcal-container">
                <div className="recipe-modal__kcal-border">
                  <p className="recipe-modal__kcal recipe-modal__kcal--bold">{Math.floor(nutrition["ENERC_KCAL"].quantity/servings)} kcal</p>
                  <p className="recipe-modal__kcal">per serving</p>
                </div>
              </div>
              <div className="recipe-modal__micro-container">
                <div className="recipe-modal__macro-micro-container">
                  <p className="recipe-modal__macro-micro">Cholesterol</p>
                  <p className="recipe-modal__macro-micro recipe-modal__macro-micro--quantity">{Math.floor(nutrition["CHOLE"].quantity/servings)}{nutrition["CHOLE"].unit}</p>
                </div>
                <div className="recipe-modal__macro-micro-container">
                  <p className="recipe-modal__macro-micro">Sodium</p>
                  <p className="recipe-modal__macro-micro recipe-modal__macro-micro--quantity">{Math.floor(nutrition["NA"].quantity/servings)}{nutrition["NA"].unit}</p>
                </div>
                <div className="recipe-modal__macro-micro-container">
                  <p className="recipe-modal__macro-micro">Calcium</p>
                  <p className="recipe-modal__macro-micro recipe-modal__macro-micro--quantity">{Math.floor(nutrition["CA"].quantity/servings)}{nutrition["CA"].unit}</p>
                </div>
                <div className="recipe-modal__macro-micro-container">
                  <p className="recipe-modal__macro-micro">Magnesium</p>
                  <p className="recipe-modal__macro-micro recipe-modal__macro-micro--quantity">{Math.floor(nutrition["MG"].quantity/servings)}{nutrition["MG"].unit}</p>
                </div>
                <div className="recipe-modal__macro-micro-container">
                  <p className="recipe-modal__macro-micro">Potassium</p>
                  <p className="recipe-modal__macro-micro recipe-modal__macro-micro--quantity">{Math.floor(nutrition["K"].quantity/servings)}{nutrition["K"].unit}</p>
                </div>
                <div className="recipe-modal__macro-micro-container">
                  <p className="recipe-modal__macro-micro">Iron</p>
                  <p className="recipe-modal__macro-micro recipe-modal__macro-micro--quantity">{Math.floor(nutrition["FE"].quantity/servings)}{nutrition["FE"].unit}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="recipe-modal__instructions-section">
          <h4 className="recipe-modal__section-heading">Cooking Instructions</h4>
          <p className="recipe-modal__instructions-text">For cooking instructions and more details about this recipe, click 
            <a className="recipe-modal__instructions-link" href={directionsLink} target="_blank" rel="noreferrer"> here!</a>
          </p>
        </section>

      </div>
    </div>
    );
  };
  
  export default RecipeModal;
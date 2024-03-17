import './RecipesPage.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../../components/Header/Header';
import getUserInventory from '../../utils/getUserInventory';

const RecipesPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [userInventory, setUserInventory] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Get the user's inventory list if they are logged in 
    if (isLoggedIn) {
      getUserInventory({ setUserInventory });
    } else {
      navigate('/');
    }
    }, [isLoggedIn]);

  const handleIngredientToggle = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };


  const findRecipes = (e) => {
    e.preventDefault();
    const apiURL = 'https://api.edamam.com/api/recipes/v2?type=public';
    const appId = '73ad0e04';
    const appKey = '5285fad8f8d27d8157cd7e13a79df213';	
    axios
    .get(`${apiURL}&q=${selectedIngredients.join('+')}&app_id=${appId}&app_key=%20${appKey}`)
    .then((response) => {
      setSubmitted(true);
      setSuggestedRecipes(response.data.hits);
      console.log(selectedIngredients);
      console.log(response.data.hits);
    })
    .catch((error) => {
      setSubmitted(true);
      console.log(error);
    });
  };
    
  return (
    <>
      <Header 
        setIsLoggedIn={setIsLoggedIn}
      />
      <div className="recipes-page">
        <h1 className="recipes-page__heading">Recipes</h1>
        <h2 className="recipes-page__subheading">Inventory</h2>

        <form onSubmit={findRecipes}>
          <div className="recipes-page__inventory-outer-container">
            <div className="recipes-page__inventory-inner-container">
              {userInventory.filter((item) => {
                return item.discarded === 0
              })
              .map((item) => (
              <button 
                type="button"
                key={item.id}
                onClick={() => handleIngredientToggle(item.food_item)}
                className= {selectedIngredients.includes(item.food_item) ? "recipes-page__button-inventory recipes-page__button-inventory--selected" : "recipes-page__button-inventory"}
              >
                {item.food_item}
              </button>
              ))}
            </div>
          </div>
          <div className="recipes-page__find-button-container">
            <button type="submit" className="recipes-page__find-button">Find Recipes</button>
          </div>
        </form>
        
        {submitted ? 
        (<>
          <h2 className="recipes-page__subheading recipes-page__subheading--recipes">Suggested Recipes</h2>
          <div className="recipes-page__recipes-outer-container">
            <div className="recipes-page__recipes-inner-container">
              {suggestedRecipes.map((recipe) => (
              <div key={recipe.recipe.uri} className="recipes-page__recipe-container">
                <img className="recipes-page__recipe-image" src={recipe.recipe.image} alt="recipe"/>
                <p className="recipes-page__recipe-name">{recipe.recipe.label}</p>
              </div>
              ))}
            </div>
          </div>
        </>
        )
        : null }

      </div>
    </>
  )
};

export default RecipesPage;
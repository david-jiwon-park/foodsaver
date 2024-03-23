import './RecipesPage.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import RecipeModal from '../../components/RecipeModal/RecipeModal';
import getUserInventory from '../../utils/getUserInventory';


const RecipesPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const [userInventory, setUserInventory] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("");
  const [loadingError, setLoadingError] = useState(false);

  const [recipeURI, setRecipeURI] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [recipeServings, setRecipeServings] = useState(null);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeNutrition, setRecipeNutrition] = useState(null);
  const [recipeDirectionsLink, setRecipeDirectionsLink] = useState("");

  useEffect(() => {
    // Get the user's inventory list if they are logged in 
    if (isLoggedIn) {
      getUserInventory()
      .then((response) => {
        const sortedData = response.data.sort((a, b) => new Date(a.exp_date) - new Date(b.exp_date));
        setUserInventory(sortedData);
        setLoading(false);
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        setLoading(false);
        setLoadingError(true);
        console.log(error);
      })
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
    const getRecipesURL = 'http://localhost:8090/edamamApi/recipes';
    const token = sessionStorage.getItem('authToken');
    axios
    .post(getRecipesURL, { selectedIngredients }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((response) => {
      setSubmitted(true);
      setSuggestedRecipes(response.data.hits);
      console.log(selectedIngredients);
    })
    .catch((error) => {
      console.log(selectedIngredients);
      setSubmitted(true);
      console.log(error);
    });
  };

    
  const handleOpenRecipeModal = (uri, image, name, servings, ingredients, nutrition, directionsLink) => {
    setRecipeURI(uri);
    setRecipeImage(image);
    setRecipeName(name);
    setRecipeServings(servings);
    setRecipeIngredients(ingredients);
    setRecipeNutrition(nutrition);
    setRecipeDirectionsLink(directionsLink);
    setIsRecipeModalOpen(true);
  };

  const handleCloseRecipeModal = () => {
    setIsRecipeModalOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoadingText("Loading...")
    }, 800);
  }, []);

  return (
    <>
      <Header 
        setIsLoggedIn={setIsLoggedIn}
      />
      {!loading && loadingError ? 
      (<h1 className="loading-error">Failed to load page</h1>)
      : null 
      }
      {!loading && !loadingError ? 
      (<div className="recipes-page">
        <h1 className="recipes-page__heading">Recipes</h1>
        <h2 className="recipes-page__subheading">Inventory</h2>

        {userInventory.length === 0 ? 
        (<> 
          <p className="recipes-page__no-inventory-text">
            Your inventory is empty!
          </p> 
          <p className="recipes-page__no-inventory-text">
            Head to the <span>Inventory</span> page to add food!
          </p>
        </>) : 

        (<form onSubmit={findRecipes}>
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
        </form>)}
        
        {submitted ? 
        (<>
          <h2 className="recipes-page__subheading recipes-page__subheading--recipes">Suggested Recipes</h2>
          {suggestedRecipes.length === 0 ? 
          (<>
            <p className="recipes-page__no-recipes-text">
              Sorry, we couldn't find any recipes with your selected ingredients.
            </p>
          </>)
          :
          (<div className="recipes-page__recipes-outer-container">
            <div className="recipes-page__recipes-inner-container">
              {suggestedRecipes.map((r) => (
              <div 
                key={r.recipe.uri} 
                className="recipes-page__recipe-container" 
                onClick={() => handleOpenRecipeModal(r.recipe.uri, r.recipe.image, r.recipe.label, r.recipe.yield, r.recipe.ingredientLines, r.recipe.totalNutrients, r.recipe.url)}
              >
                <img className="recipes-page__recipe-image" src={r.recipe.image} alt="recipe"/>
                <p className="recipes-page__recipe-name">{r.recipe.label}</p>
              </div>
              ))}
            </div>
          </div>)}
        </>
        )
        : null }

        <RecipeModal 
          isOpen={isRecipeModalOpen} 
          onClose={handleCloseRecipeModal} 
          uri={recipeURI.substring(recipeURI.length - 32)}
          image={recipeImage}
          name={recipeName} 
          servings={recipeServings}
          ingredients={recipeIngredients}
          nutrition={recipeNutrition}
          directionsLink={recipeDirectionsLink}
        />
      </div>) 
      : 
      (<h1 className="recipes-page__loading">{loadingText}</h1>)}
    </>
  )
};

export default RecipesPage;
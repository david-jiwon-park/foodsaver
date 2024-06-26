// Favorites Page 

import './FavoritesPage.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';
import FavRecipeModal from '../../components/FavRecipeModal/FavRecipeModal';
import DeleteFavRecipeModal from '../../components/DeleteFavRecipeModal/DeleteFavRecipeModal';
import getUserFavorites from '../../utils/getUserFavorites';
import deleteIcon from '../../assets/icons/delete-icon.svg';

const FavoritesPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  // State to retrieve and store data regarding the user's favorited recipes
  const [userFavoritesExternalData, setUserFavoritesExternalData] = useState([]);

  // States to keep track of when modals are open or closed 
  const [isFavRecipeModalOpen, setIsFavRecipeModalOpen] = useState(false);
  const [isDeleteFavRecipeModalOpen, setIsDeleteFavRecipeModalOpen] = useState(false);

  // Loading and loading error states 
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("");
  const [loadingError, setLoadingError] = useState(false);

  // States to store information for a favorited recipe and pass it to the favorite recipe modal 
  const [recipeURI, setRecipeURI] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [recipeServings, setRecipeServings] = useState(null);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeNutrition, setRecipeNutrition] = useState(null);
  const [recipeDirectionsLink, setRecipeDirectionsLink] = useState("");

  useEffect(() => {
    // Get the user's favorite recipes if they are logged in 
    if (isLoggedIn) {
      getUserFavorites()
      .then((response) => {
        getFavoriteRecipeInfo(response.data);
      })
      .catch((error) => {
        setLoading(false);
        setLoadingError(true);
        console.log(error);
      })
    } else {
      navigate('/');
    }
  }, [isLoggedIn, isFavRecipeModalOpen, isDeleteFavRecipeModalOpen]);
    
  const apiBaseURL = process.env.REACT_APP_SERVER;
  // Function to get data on the user's favorite recipes 
  const getFavoriteRecipeInfo = async (res) => {
    const token = sessionStorage.getItem('authToken');
    axios
    .post(`${apiBaseURL}/edamamApi/favorites`, { favorites: res }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((response) => {
      setUserFavoritesExternalData(response.data);
      setLoading(false); 
    })
    .catch((error) => {
      setLoading(false); 
      setLoadingError(true);
      console.log(error);
    });
  };

  // Functions to handle opening/closing modals
  const handleOpenFavRecipeModal = (image, name, servings, ingredients, nutrition, directionsLink) => {
    setRecipeImage(image);
    setRecipeName(name);
    setRecipeServings(servings);
    setRecipeIngredients(ingredients);
    setRecipeNutrition(nutrition);
    setRecipeDirectionsLink(directionsLink);
    setIsFavRecipeModalOpen(true);
  };
  const handleCloseFavRecipeModal = () => {
    setIsFavRecipeModalOpen(false);
  };
  const handleOpenDeleteFavRecipeModal = (e, name, uri) => {
    e.stopPropagation();
    setRecipeName(name);
    setRecipeURI(uri);
    setIsDeleteFavRecipeModalOpen(true);
  };
  const handleCloseDeleteFavRecipeModal = () => {
    setIsDeleteFavRecipeModalOpen(false);
  };

  // Loading text to appear if the page still has not loaded after 800 milliseconds and there was no loading error
  useEffect(() => {
    setTimeout(() => {
      if (loading && !loadingError) {
        setLoadingText("Loading...")
      } else {
        setLoadingText("");
      }
    }, 800)
  }, [loading, loadingError]);


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
      (<div className='favorites-page'>
        <h1 className='favorites-page__heading'>Favorites</h1>
        {userFavoritesExternalData.length === 0 ? 
        (<p className="favorites-page__no-favorites-text">
          Head to the <span>Recipes</span> page to search for recipes to add as favorites!
        </p>)
        : 
        (<div className='favorites-page__recipes-container'>
          {userFavoritesExternalData.map((r) => (
            <div 
              key={r.recipe.uri}
              className='favorites-page__recipe-container'
              onClick={() => handleOpenFavRecipeModal(r.recipe.image, r.recipe.label, r.recipe.yield, r.recipe.ingredientLines, r.recipe.totalNutrients, r.recipe.url)}
            >
              <img className='favorites-page__recipe-image' src={r.recipe.image} alt="recipe"/>
              <h3 className='favorites-page__recipe-label'>{r.recipe.label}</h3>
              <img className='favorites-page__recipe-delete' src={deleteIcon} alt="delete icon" onClick={(e) => handleOpenDeleteFavRecipeModal(e, r.recipe.label, r.recipe.uri)}/>
            </div>
          ))}
        </div>)}
        <DeleteFavRecipeModal 
          isOpen={isDeleteFavRecipeModalOpen} 
          onClose={handleCloseDeleteFavRecipeModal} 
          name={recipeName} 
          uri={recipeURI.substring(recipeURI.length - 32)}
        />
        <FavRecipeModal 
          isOpen={isFavRecipeModalOpen} 
          onClose={handleCloseFavRecipeModal} 
          image={recipeImage}
          name={recipeName} 
          servings={recipeServings}
          ingredients={recipeIngredients}
          nutrition={recipeNutrition}
          directionsLink={recipeDirectionsLink}
        />
      </div>)
      : 
      (<h1 className="favorites-page__loading">{loadingText}</h1>)}
    </>
  );
};

export default FavoritesPage;
import './FavoritesPage.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';
import FavRecipeModal from '../../components/FavRecipeModal/FavRecipeModal';
import DeleteRecipeModal from '../../components/DeleteRecipeModal/DeleteRecipeModal';
import getUserFavorites from '../../utils/getUserFavorites';
import xIcon from '../../assets/icons/x-icon.svg';


const FavoritesPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [userFavoritesExternalData, setUserFavoritesExternalData] = useState([]);
  const [isFavRecipeModalOpen, setIsFavRecipeModalOpen] = useState(false);
  const [isDeleteRecipeModalOpen, setIsDeleteRecipeModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [recipeURI, setRecipeURI] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [recipeServings, setRecipeServings] = useState(null);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [recipeNutrition, setRecipeNutrition] = useState(null);
  const [recipeDirectionsLink, setRecipeDirectionsLink] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      getUserFavorites()
      .then((response) => {
        getFavoriteRecipeInfo(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      })
    } else {
      navigate('/');
    }
  }, [isLoggedIn, isFavRecipeModalOpen, isDeleteRecipeModalOpen]);
    
  const getFavoriteRecipeInfo = async (res) => {
    const apiURLforURI = 'https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_';
    const appId = '73ad0e04';
    const appKey = '5285fad8f8d27d8157cd7e13a79df213';	
    const uriArray = res.map((favorite) => (favorite.recipe_uri))
    
    const dataPromises = uriArray.reverse().map(recipe_uri =>
      axios.get(`${apiURLforURI}${recipe_uri}&app_id=${appId}&app_key=${appKey}%09`)
        .then(response => response.data.hits)
        .catch(error => {
          console.log(error);
          return []; // Return empty array in case of error
        })
    );

    try {
      const allData = await Promise.all(dataPromises);
      // Concatenate allData arrays into one array
      const mergedData = [].concat(...allData);
      setUserFavoritesExternalData(mergedData);
      
      Promise.all(dataPromises)
        .then(() => {
        setLoading(false); 
      });
    } catch (error) {
      setLoading(false); 
      console.log(error);
    }
  };

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

  const handleOpenDeleteRecipeModal = (e, name, uri) => {
    e.stopPropagation();
    setRecipeName(name);
    setRecipeURI(uri);
    setIsDeleteRecipeModalOpen(true);
  };
  const handleCloseDeleteRecipeModal = () => {
    setIsDeleteRecipeModalOpen(false);
  };

  return (
    <>
      <Header 
        setIsLoggedIn={setIsLoggedIn}
      />
      
      {!loading ? 
      (<div className='favorites-page'>
        <h1 className='favorites-page__heading'>Favorites</h1>

        {userFavoritesExternalData.length === 0 ? 
        (<p className="favorites-page__no-favorites-text">
          Head to the <span>Recipes</span> page to search for recipes to add as favorites!
        </p>)
        : 
        (<>
          {userFavoritesExternalData.map((r) => (
            <div 
              key={r.recipe.uri}
              className='favorites-page__recipe-container'
              onClick={() => handleOpenFavRecipeModal(r.recipe.image, r.recipe.label, r.recipe.yield, r.recipe.ingredientLines, r.recipe.totalNutrients, r.recipe.url)}
            >
              <img className='favorites-page__recipe-image' src={r.recipe.image} alt="recipe"/>
              <h3 className='favorites-page__recipe-label'>{r.recipe.label}</h3>
              <img className='favorites-page__recipe-delete' src={xIcon} alt="x-icon" onClick={(e) => handleOpenDeleteRecipeModal(e, r.recipe.label, r.recipe.uri)}/>
            </div>
          ))}
        </>)}

        <DeleteRecipeModal 
          isOpen={isDeleteRecipeModalOpen} 
          onClose={handleCloseDeleteRecipeModal} 
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
      (<h1 className="favorites-page__loading">Loading...</h1>)}
    </>
  )
};

export default FavoritesPage;
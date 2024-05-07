// Favorite Recipe Modal Component

import './FavRecipeModal.scss';
import backArrow from '../../assets/icons/back-arrow.png';
import RecipeNutritionInfo from '../RecipeNutritionInfo/RecipeNutritionInfo';
import RecipeIngredients from '../RecipeIngredients/RecipeIngredients';
import RecipeCookingInstructions from '../RecipeCookingInstructions/RecipeCookingInstructions';

const FavRecipeModal = ({ isOpen, onClose, image, name, servings, ingredients, nutrition, directionsLink }) => {
  if (!isOpen) return null
 
  return (  
    <div className="overlay">
      <div className="recipe-modal">
        <div className="recipe-modal__recipe-image-container">
        <img className="recipe-modal__back-arrow" src={backArrow} alt="back arrow" onClick={() => onClose()}/> 
          <img className="recipe-modal__recipe-image" src={image} alt="recipe"/>
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
  
export default FavRecipeModal;
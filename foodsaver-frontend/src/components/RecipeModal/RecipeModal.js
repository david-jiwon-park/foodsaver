//Delete Food Modal Component

import './RecipeModal.scss';
import axios from 'axios';
import backArrow from '../../assets/icons/back-arrow.png';


const RecipeModal = ({ isOpen, onClose, uri, image, name, servings, ingredients, nutrition, directionsLink }) => {
  if (!isOpen) return null;

  return (  
    <div className="overlay">
      <img className="recipe-modal__back-arrow" src={backArrow} alt="back arrow" onClick={() => onClose()}/> 
      <div className="recipe-modal">
        <div className="recipe-modal__recipe-image-container">
          <img className="recipe-modal__recipe-image" src={image} alt="recipe"/>
        </div>
        <h3 className="recipe-modal__name">{name}</h3>
        <h5 className="recipe-modal__servings">{servings} {servings === 1 ? "serving" : "servings"}</h5>
        
        <section className="recipe-modal__ingredients-section">
          <h4 className="recipe-modal__section-heading">Ingredients</h4>
          <ul>
            {ingredients.map((ingredient) => (
              <li className="recipe-modal__ingredient">
                {ingredient} 
              </li>
            ))}
          </ul>
        </section>

        <section className="recipe-modal__nutrition-section">
          <h4 className="recipe-modal__section-heading">Nutritional Information</h4>
          <div>
            <div className="recipe-modal__macros">
              <div className="recipe-modal__macro-container">
                <p>PROTEIN</p>
                <p>{Math.floor(nutrition["PROCNT"].quantity)}{nutrition["PROCNT"].unit}</p>

              </div>
              <div>
                <p>FAT</p>
                <p>{Math.floor(nutrition["FAT"].quantity)}{nutrition["FAT"].unit}</p>
              </div>
              <div>
                <p>CARB</p>
                <p>{Math.floor(nutrition["CHOCDF"].quantity)}{nutrition["CHOCDF"].unit}</p>
              </div>
              

            </div>
          </div>
        </section>

        <section className="recipe-modal__instructions-section">
          <h4 className="recipe-modal__section-heading">Cooking Instructions</h4>
        </section>
      </div>
    </div>
      
    );
  };
  
  export default RecipeModal;
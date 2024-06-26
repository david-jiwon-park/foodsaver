// Nutritional Info section of Recipe and Favorite Recipe Modal 

import './RecipeNutritionInfo.scss';

const RecipeNutritionInfo = ({ servings, nutrition }) => {
  return (
      <section className="recipe-modal__nutrition-section">
        <h4 className="recipe-modal__section-heading">Nutrition Information</h4>
        <div className="recipe-modal__nutrition-content">
          <div className="recipe-modal__left-column"> 
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
            <div className="recipe-modal__kcal-container">
              <div className="recipe-modal__kcal-border">
                <p className="recipe-modal__kcal recipe-modal__kcal--bold">{Math.floor(nutrition["ENERC_KCAL"].quantity/servings)} kcal</p>
                <p className="recipe-modal__kcal">per serving</p>
              </div>
            </div>
          </div>
          <div className="recipe-modal__right-column">
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
  );
};

export default RecipeNutritionInfo;
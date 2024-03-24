// Ingredients section of Recipe and Favorite Recipe Modal 

import './RecipeIngredients.scss';

const RecipeIngredients = ({ ingredients }) => {
  return (
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
  );
};

export default RecipeIngredients;
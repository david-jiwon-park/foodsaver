// Cooking Instructions section for Recipe and Favorite Recipe Modal 

import './RecipeCookingInstructions.scss';

const RecipeCookingInstructions = ({ directionsLink }) => {
  return (
    <section className="recipe-modal__instructions-section">
      <h4 className="recipe-modal__section-heading">Cooking Instructions</h4>
      <p className="recipe-modal__instructions-text">For cooking instructions and more details about this recipe, click 
        <a className="recipe-modal__instructions-link" href={directionsLink} target="_blank" rel="noreferrer"> here!</a>
      </p>
    </section>
  );
};

export default RecipeCookingInstructions;
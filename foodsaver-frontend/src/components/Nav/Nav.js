import './Nav.scss'
import { Link } from 'react-router-dom';

const Nav = ({ isOpen, closeNavIfLocationMatches }) => {
  if (!isOpen) return null;

  const pathsToCheck = ["/inventory", "/recipes", "/favorites", "/profile"];

  return(
    <div className="nav">
      <div className="nav__container">
        <Link className="nav__link" to="/inventory" onClick={() => closeNavIfLocationMatches(pathsToCheck)}>
          <button className='nav__button'>Inventory</button>
        </Link>
        <Link className="nav__link" to="/recipes" onClick={() => closeNavIfLocationMatches(pathsToCheck)}>
          <button className='nav__button'>Recipes</button>
        </Link>
        <Link className="nav__link" to="/favorites" onClick={() => closeNavIfLocationMatches(pathsToCheck)}>
          <button className='nav__button'>Favorites</button>
        </Link>
        <Link className="nav__link" to="/profile" onClick={() => closeNavIfLocationMatches(pathsToCheck)}>
          <button className='nav__button'>User Profile</button>
        </Link>
      </div>
      
    </div>

    )
};

export default Nav;
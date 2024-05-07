// Navigation Component 

import './MobileNav.scss'
import { Link } from 'react-router-dom';

const MobileNav = ({ isOpen, closeMobileNavIfLocationMatches, setIsLoggedIn }) => {
  if (!isOpen) return null;

  // All possible navigation paths to check to see if the current path is the same as the page the user is on
  const pathsToCheck = ["/inventory", "/recipes", "/favorites", "/profile"];

  const handleSignOut = () => {
    sessionStorage.setItem('loggedIn', JSON.stringify(false));
    sessionStorage.clear();
    setIsLoggedIn(false);
  };

  return(
    <div className="mobile-nav">
      <div className="mobile-nav__container">
        <Link className="mobile-nav__link" to="/inventory" onClick={() => closeMobileNavIfLocationMatches(pathsToCheck)}>
          <button className='mobile-nav__button'>Inventory</button>
        </Link>
        <Link className="mobile-nav__link" to="/recipes" onClick={() => closeMobileNavIfLocationMatches(pathsToCheck)}>
          <button className='mobile-nav__button'>Recipes</button>
        </Link>
        <Link className="mobile-nav__link" to="/favorites" onClick={() => closeMobileNavIfLocationMatches(pathsToCheck)}>
          <button className='mobile-nav__button'>Favorites</button>
        </Link>
        <Link className="mobile-nav__link" to="/profile" onClick={() => closeMobileNavIfLocationMatches(pathsToCheck)}>
          <button className='mobile-nav__button'>User Profile</button>
        </Link>
        <div className="mobile-nav__link mobile-nav__link--signout">
          <button className="mobile-nav__button mobile-nav__button--signout" onClick={handleSignOut}>
              Sign Out
          </button>
        </div>
      </div>
      
    </div>
  )
};

export default MobileNav;
import './Header.scss'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import navIcon from '../../assets/icons/nav-icon.png'
import Nav from '../Nav/Nav';

const Header = ({ setIsLoggedIn }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const location = useLocation();
  const currentLocation = location.pathname;

  // Function to toggle navigation screen
  const toggleNav = () => {
    if (isNavOpen == false) {
      setIsNavOpen(true);
    } else {
      setIsNavOpen(false);
    }
  };

  // Function to close navigation screen if the user clicks on the page they are already in
  const closeNavIfLocationMatches = (paths) => {
    if (paths.some(path => currentLocation.startsWith(path))) {
      setIsNavOpen(false);
    }
  };

  return(
    <div className="header">
      <div className="header__container">
        <h1 className="header__heading">Food Saver</h1>
        <img className="header__nav-icon" src={navIcon} alt='nav icon' onClick={() => toggleNav()}/>
      </div>
      <Nav 
        isOpen={isNavOpen} 
        closeNavIfLocationMatches={closeNavIfLocationMatches}
        setIsLoggedIn={setIsLoggedIn} 
      />
    </div>
  )
};

export default Header;
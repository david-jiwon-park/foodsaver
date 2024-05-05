import './Header.scss'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import mobileNavIcon from '../../assets/icons/mobile-nav-icon.png'
import MobileNav from '../MobileNav/MobileNav';
import TabletDesktopNav from '../TabletDesktopNav/TabletDesktopNav';

const Header = ({ setIsLoggedIn }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const location = useLocation();
  const currentLocation = location.pathname;

  // Function to toggle navigation screen
  const toggleMobileNav = () => {
    if (isMobileNavOpen === false) {
      setIsMobileNavOpen(true);
    } else {
      setIsMobileNavOpen(false);
    }
  };

  // Function to close navigation screen if the user clicks on the page they are already in
  const closeMobileNavIfLocationMatches = (paths) => {
    if (paths.some(path => currentLocation.startsWith(path))) {
      setIsMobileNavOpen(false);
    }
  };

  return(
    <div className="header">
      <div className="header__container">
        <h1 className="header__heading">Food Saver</h1>
        <img className="header__mobile-nav-icon" src={mobileNavIcon} alt='nav icon' onClick={() => toggleMobileNav()}/>
        <TabletDesktopNav />
      </div>
      <MobileNav 
        isOpen={isMobileNavOpen} 
        closeNavIfLocationMatches={closeMobileNavIfLocationMatches}
        setIsLoggedIn={setIsLoggedIn} 
      />
    </div>
  )
};

export default Header;
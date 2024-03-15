import './Header.scss'
import { useState } from 'react';
import navIcon from '../../assets/icons/nav-icon.png'
import Nav from '../Nav/Nav';

const Header = ({ setIsLoggedIn }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    if (isNavOpen == false) {
      setIsNavOpen(true);
    } else {
      setIsNavOpen(false);
    }
  };

  return(
    <div className="header">
      <h1 className="header__heading">Food Saver</h1>
      <img className="header__nav-icon" src={navIcon} alt='nav icon' onClick={() => toggleNav()}/>
 
      
      <Nav 
        isOpen={isNavOpen} 
        setIsLoggedIn={setIsLoggedIn} 
      />


    </div>

    )
};

export default Header;
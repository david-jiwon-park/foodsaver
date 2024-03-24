import './App.scss';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IntroPage from './pages/IntroPage/IntroPage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import InventoryPage from './pages/InventoryPage/InventoryPage';
import RecipesPage from './pages/RecipesPage/RecipesPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(sessionStorage.getItem('loggedIn')));

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
        <Route 
            path="/" 
            element={
              <IntroPage
                isLoggedIn={isLoggedIn}
            />
            }
          /> 
          <Route 
            path="/signup" 
            element={<SignupPage/>}
          />    
          <Route 
            path="/login" 
            element={
              <LoginPage
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route 
            path="/inventory" 
            element={
              <InventoryPage
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
            />
            }
          /> 
          <Route 
            path="/recipes" 
            element={
              <RecipesPage
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          /> 
          <Route 
            path="/favorites" 
            element={
              <FavoritesPage
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          /> 
          <Route 
            path="/profile" 
            element={
              <UserProfilePage
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

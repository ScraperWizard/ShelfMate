import { useContext, useEffect } from 'react';
import './App.scss';
import { ThemeContext } from './context/ThemeContext';
import { DARK_THEME, LIGHT_THEME } from './constants/themeConstants';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import BaseLayout from './layout/BaseLayout';
import { Dashboard, PageNotFound } from './screens';
import dash from './assets/sun.svg'
import random from './assets/moon.svg'
function App() {
 
const {theme, toggleTheme} = useContext(ThemeContext);
console.log(theme);

  useEffect(() => {
    if(theme === DARK_THEME ) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme])
  return (
    <>
    <Router>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path='/' element={<Dashboard />}></Route>
          <Route path='*' element={< PageNotFound/>}></Route>
        </Route>
      </Routes>
      <button type='button' className='theme-toggle-btn'
      onClick={toggleTheme}
      >
        <img src={theme === LIGHT_THEME ?dash: random } alt="" className='theme-icon'/>
      </button>
    </Router>
    </>
  );
}

export default App;

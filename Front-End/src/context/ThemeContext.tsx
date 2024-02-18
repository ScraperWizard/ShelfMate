import { ReactNode, createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DARK_THEME, LIGHT_THEME } from "../constants/themeConstants";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<any>({});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const storedTheme = window.localStorage.getItem("themeMode");
  const [theme, setTheme] = useState(storedTheme || LIGHT_THEME);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME
    );
  };

  // Store the theme in local storage whenever it changes
  useEffect(() => {
    window.localStorage.setItem("themeMode", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

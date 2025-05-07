  import React, { createContext, useContext, useState, useEffect } from "react";
  import AuthInterceptor from "./AuthInterceptor";
import { Base_URL } from "../Client/apiURL";

  const AuthContext = createContext({});

  export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    

    useEffect(() => {
      const userData = localStorage.getItem("userData");

      if (userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      AuthInterceptor(logout)
    }, []);

    const login = (userData) => {
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("pte-type", "pte academic");
      setIsAuthenticated(true);
    };

    const logout = async () => {
      try {
        const response = await fetch(`${Base_URL}/app/users/logout`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
    
        if (!response.ok) {
          console.error("Logout API call failed", response.statusText);
        }
      } catch (error) {
        console.error("Error during logout API call:", error);
      } finally {
        localStorage.removeItem("userData");
        localStorage.removeItem("superAdminAnnouncementDismissed");
        localStorage.removeItem("announcementDismissed");
        localStorage.removeItem("superAdminThumbnailDismissed");
        localStorage.removeItem("thumbnailDismissed");
        sessionStorage.removeItem("storedQuestion");
        sessionStorage.removeItem("SearchedQuestion_QuestionId");
        setIsAuthenticated(false);
      }
    };

    return (
      <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export const useAuth = () => useContext(AuthContext);

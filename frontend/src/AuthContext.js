import React, { createContext, useContext } from 'react';

const AuthContext = createContext();


export const AuthProvider = ({ children, authToken }) => {
    return (
      <AuthContext.Provider value={authToken}>
        {children}
      </AuthContext.Provider>
    );
  };

  export const useAuth = () => {
    return useContext(AuthContext);
  };
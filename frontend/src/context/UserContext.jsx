import { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // holds { uid, email, name, etc }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// custom hook
export const useUser = () => useContext(UserContext);
import { createContext, useState } from "react";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  //   """The values which are in the context hook"""
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  //   """values which is stored in the context"""

  const value = { currentUser, setCurrentUser };
  //   """Combain the values into value named object"""

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
  // """This create the provider and the children is the child components"""
};

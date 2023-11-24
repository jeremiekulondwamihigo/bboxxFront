/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
export const CreateContexte = createContext();

const ContexteAll = (props) => {
  const navigation = useNavigate();
  const LogOut = () => {

    localStorage.removeItem("bboxxSupprtNom");
    localStorage.removeItem("bboxxSupprtCode");
    localStorage.removeItem("bboxxSupprtZone");
    navigation("/login", {replace : true});
  };

  const [demande, setDemande] = useState()
  const [user, setUser] = useState()
  const [update, setUpdate] = useState()
  const [element, setElement] = useState(0)
 
  return (
    <CreateContexte.Provider
      value={{
        LogOut,
        user, setUser,
        demande, setDemande, update, setUpdate, element, setElement
      }}
    >
      {props.children}
    </CreateContexte.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(ContexteAll);

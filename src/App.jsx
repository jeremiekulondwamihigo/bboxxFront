import "./App.css";

import { useDispatch } from "react-redux";
import { ReadAllZone } from "./Redux/Zone";
import Acceuil from "./Pages/AcceuilAdmin";
import { ReadAgent } from "./Redux/Agent";
import Login from "./Pages/Login/Login.jsx";
import { Route, Routes } from "react-router-dom";
import { ReadParametre } from "./Redux/Parametre";
import {ReadPeriode} from "./Redux/PeriodeDossier.jsx"
// import Demande from "./components/Demande";

function App() {
  const dispatch = useDispatch();

  dispatch(ReadAllZone());
  dispatch(ReadAgent());
  dispatch(ReadParametre());
  dispatch(ReadPeriode())

  return (
    <Routes>
      {/* <Route exact path="/demande"  element={<Demande />} /> */}
      <Route path="/" element={<Acceuil />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;

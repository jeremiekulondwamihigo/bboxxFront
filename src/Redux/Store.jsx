import { configureStore } from "@reduxjs/toolkit";
import zone from "./Zone"
import agent from "./Agent"
import parametre from "./Parametre";
import reponse from "./Reponses"
import periodeStore from "./PeriodeDossier"

export const store = configureStore({
  reducer: {
    //Etablissement
    zone, agent, parametre, reponse, periodeStore
  },
});

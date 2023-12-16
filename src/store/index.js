// third-party
import { configureStore } from '@reduxjs/toolkit';

// project import
import reducers from './reducers';
import { ReadReponse } from 'Redux/Reponses';
import { ReadParametre } from 'Redux/Parametre';
import { ReadAgent } from 'Redux/Agent';
import { ReadAllZone } from 'Redux/Zone';
import { ReadPeriode } from 'Redux/PeriodeDossier';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
  reducer: reducers
});

const { dispatch } = store;
dispatch(ReadReponse());
dispatch(ReadParametre());
dispatch(ReadAgent());
dispatch(ReadAllZone());
dispatch(ReadPeriode());

export { store, dispatch };

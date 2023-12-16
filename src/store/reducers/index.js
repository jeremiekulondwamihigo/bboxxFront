// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import zone from 'Redux/Zone';
import agent from 'Redux/Agent';
import parametre from 'Redux/Parametre';
import reponse from 'Redux/Reponses';
import periodeStore from 'Redux/PeriodeDossier';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, zone, agent, parametre, reponse, periodeStore });

export default reducers;

/* eslint-disable react-refresh/only-export-components */

import '../App.css'
// import { useSelector } from "react-redux";
import React, { useContext } from 'react'
import { CreateContexte } from '../Context'
import DemandeListe from '../components/DemandeListe'
import Parametre from './Parametre'
import ReponseAdmin from '../components/ReponseAdmin'
import Rapport from './Rapport'
import '../components/style.css'
import Deja from '../components/Deja'
import Region from './Region'
import {
  Countertops,
  Message,
  Person,
  Report,
  Settings,
} from '@mui/icons-material'
import MessageListe from '../components/MessageListe'
import AgentListe from './AgentListe'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import Statistiques from './Statistiques'

function Acceuil() {
  const { LogOut, demande, setDemande, element, setElement } = useContext(
    CreateContexte,
  )

  // const zone = useSelector((state) => state.zone);
  // const agentlist = useSelector((state) => state.agent);

  const agentConnect = localStorage.getItem('bboxxSupprtNom')

  return (
    <>
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
        <div className="flex-grow overflow-hidden h-full flex flex-col">
          <div className="h-16 lg:flex w-full border-b border-gray-200 dark:border-gray-800 hidden px-10">
            <div className="flex h-full text-gray-600 dark:text-gray-400">
              <a
                onClick={(e) => {
                  e.preventDefault()
                  setElement(10)
                }}
                style={{ textDecoration: 'none', color: 'black' }}
                className="cursor-pointer h-full inline-flex mr-8 items-center"
              >
                <Person fontSize="small" /> <span className="ml-2">Agent</span>
              </a>
              <a
                onClick={(e) => {
                  e.preventDefault()
                  setDemande('')
                  setElement(8)
                }}
                style={{ textDecoration: 'none', color: 'black' }}
                className="cursor-pointer h-full border-b-2 inline-flex mr-8 items-center"
              >
                <Countertops fontSize="small" />{' '}
                <span className="ml-2">Région</span>
              </a>
              <a
                onClick={(e) => {
                  e.preventDefault()
                  setDemande('')
                  setElement(5)
                }}
                style={{ textDecoration: 'none', color: 'black' }}
                className="cursor-pointer h-full border-b-2 inline-flex mr-8 items-center"
              >
                <Settings fontSize="small" /> <span className="ml-2">C.U</span>
              </a>
              <a
                onClick={(e) => {
                  e.preventDefault()
                  setDemande('')
                  setElement(7)
                }}
                style={{ textDecoration: 'none', color: 'black' }}
                className="cursor-pointer h-full border-b-2 inline-flex mr-8 items-center"
              >
                <Message fontSize="small" />{' '}
                <span className="ml-2">Réponses</span>
              </a>
              <a
                onClick={(e) => {
                  e.preventDefault()
                  setDemande('')
                  setElement(6)
                }}
                style={{ textDecoration: 'none', color: 'black' }}
                className="cursor-pointer h-full border-b-2 inline-flex mr-8 items-center"
              >
                <Report fontSize="small" />{' '}
                <span className="ml-2">Rapport</span>
              </a>
              <a
                onClick={(e) => {
                  e.preventDefault()
                  setDemande('')
                  setElement(9)
                }}
                style={{ textDecoration: 'none', color: 'black' }}
                className="cursor-pointer h-full border-b-2 inline-flex mr-8 items-center"
              >
                <Message fontSize="small" />{' '}
                <span className="ml-2">Message</span>
              </a>
              <a
                onClick={(e) => {
                  e.preventDefault()
                  setDemande('')
                  setElement(11)
                }}
                style={{ textDecoration: 'none', color: 'black' }}
                className="cursor-pointer h-full border-b-2 inline-flex mr-8 items-center"
              >
                <LeaderboardIcon fontSize="small" />{' '}
                <span className="ml-2">Statistiques</span>
              </a>
            </div>
            <div className="ml-auto flex items-center space-x-7">
              <button
                onClick={() => LogOut()}
                className="h-8 px-3 rounded-md shadow text-white bg-blue-500"
              >
                Déconnection
              </button>

              <button className="flex items-center">
                <span className="relative flex-shrink-0">
                  <span className="absolute right-0 -mb-0.5 bottom-0 w-2 h-2 rounded-full bg-green-500 border border-white dark:border-gray-900"></span>
                </span>
                <span className="ml-2">{agentConnect}</span>
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 ml-1 flex-shrink-0"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex-grow flex overflow-x-hidden">
            <div className=" p-2">
              <DemandeListe />
            </div>
            <div className=" flex-grow bg-white dark:bg-gray-900 overflow-y-auto">
              <div className="sm:p-7 p-1">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-12">
                      {element === 5 && <Parametre />}
                      {element === 6 && <Rapport />}
                      {element === 7 && <Deja />}
                      {element === 8 && <Region />}
                      {element === 9 && <MessageListe />}
                      {element === 10 && <AgentListe />}
                      {element === 11 && <Statistiques />}
                      {demande && <ReponseAdmin />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(Acceuil)

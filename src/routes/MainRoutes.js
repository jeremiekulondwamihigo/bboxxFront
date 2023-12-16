import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const Parametre = Loadable(lazy(() => import('pages/Parametre')));
const Region = Loadable(lazy(() => import('pages/Region')));
const Agent = Loadable(lazy(() => import('pages/Agent')));
const Statistiques = Loadable(lazy(() => import('pages/Statistique')));
const Reponse = Loadable(lazy(() => import('pages/Reponse')));
const Demande = Loadable(lazy(() => import('pages/Demandes')));
const Rapport = Loadable(lazy(() => import('pages/Rapport')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/parametre',
      element: <Parametre />
    },
    {
      path: '/region',
      element: <Region />
    },
    {
      path: '/agent',
      element: <Agent />
    },
    {
      path: '/reponses',
      element: <Reponse />
    },
    {
      path: '/demandes',
      element: <Demande />
    },
    {
      path: '/statistiques',
      element: <Statistiques />
    },
    {
      path: '/rapport',
      element: <Rapport />
    }
  ]
};

export default MainRoutes;

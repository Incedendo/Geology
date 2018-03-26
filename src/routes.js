import Base from './Base';
import Home from './components/Home';
import HelpfulLinkModal from './components/HelpfulLinkModal';
import NotFound from './components/NotFound';
import FulcrumApproach from './components/Fulcrum/FulcrumApproach';
import TBDApproach from './components/TBD/TBDApproach';
import DetailedChannelView from './components/TBD/DetailedChannelView';
import AnalogComponent from './components/Analog/AnalogComponent';
import LandingPage from './components/LandingPage';

import { RiverChannelsTable } from "./components/Utils";
// import TBDResult from './components/TBDResult';

export default [
  {
    component: Base,
    routes: [
      // {
      //   path: '/',
      //   exact: true,
      //   component: LandingPage,
      //   name: "Home"
      // },
      {
        path: '/',
        exact: true,
        component: Home,
        name: "Home"
      },
      {
        path: '/FulcrumApproach',
        exact: true,
        component: FulcrumApproach,
        name: "FulcrumApproach"
      },
      {
        path: '/TBDApproach',
        exact: true,
        component: TBDApproach,
        name: "TBDApproach"
      },
      {
        path: '/AnalogChannels',
        exact: true,
        component: AnalogComponent,
        name: "AnalogComponent"
      },
      // {
      //   path: '/TBDResult',
      //   exact: true,
      //   component: TBDResult,
      //   name: "TBDResult"
      // },
      {
        path: '/DetailedChannelView',
        exact: true,
        component: DetailedChannelView,
        name: "DetailedChannelView"
      },
      { path: '/helpfullinks',
        component: HelpfulLinkModal,
        name: 'Helpful Link Modal'
      },
      {
        component: NotFound,
        name: 'Not Found'
      },
    ]
  },
]

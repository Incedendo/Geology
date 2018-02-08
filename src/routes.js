import Base from './Base';
import Home from './components/Home';
import HelpfulLinkModal from './components/HelpfulLinkModal';
import NotFound from './components/NotFound';
import FulcrumApproach from './components/FulcrumApproach';
import TBDApproach from './components/TBDApproach';
import AnalogComponent from './components/AnalogComponent';

export default [
  {
    component: Base,
    routes: [
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

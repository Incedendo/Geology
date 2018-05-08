import Base from './Base';
import Home from './components/Home';
import NotFound from './components/NotFound';
import FulcrumApproach from './components/Fulcrum/FulcrumApproach';
import TBDApproach from './components/TBD/TBDApproach';
import AnalogComponent from './components/Analog/AnalogComponent';

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
      {
        component: NotFound,
        name: 'Not Found'
      },
    ]
  },
]

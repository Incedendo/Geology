import Base from './Base';
import Home from './components/Home';
import NotFound from './components/NotFound';

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
        component: NotFound,
        name: 'Not Found'
      },
    ]
  },
]

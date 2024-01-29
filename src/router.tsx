import { createHashRouter } from 'react-router-dom';

import { App } from './App';

import { HomeView } from './views/HomeView';
import { UsersView } from './views/UsersView';

export const currentLinks = [
  {
    path: '/',
    element: <HomeView />,
    caption: 'home',
  },

  {
    path: '/users',
    element: <UsersView />,
    caption: 'users',
  },
];

export const links = [...currentLinks];

export const router = createHashRouter([
  {
    children: links,
    element: <App />,
  },
]);

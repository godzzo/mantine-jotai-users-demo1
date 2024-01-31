import { createHashRouter } from 'react-router-dom';

import { App } from './App';

import { HomeView } from './views/HomeView';
import { UsersView } from './views/UsersView';
import { JoUserStepper } from './views/JoUserStepper';
import { AsyncErrorView } from './views/AsyncErrorView';
import { LoadableView } from './views/LoadableView';

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
	{
		path: '/user-stepper',
		element: <JoUserStepper />,
		caption: 'user stepper',
	},
	{
		path: '/asnyc-error',
		element: <AsyncErrorView />,
		caption: 'async error',
	},
	{
		path: '/loadable',
		element: <LoadableView />,
		caption: 'loadable',
	},
];

export const links = [...currentLinks];

export const router = createHashRouter([
	{
		children: links,
		element: <App />,
	},
]);

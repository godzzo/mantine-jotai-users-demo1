import { Suspense } from 'react';
import { atom, useAtom } from 'jotai';
import { ErrorBoundary, ShowError } from '../components/ErrorBoundary';

export const jsonHost = 'https://jsonplaceholder.typicode.com';

const userIdAtom = atom(1);

/*
	type Read<Value, SetSelf = never> = (get: Getter, options: {
		readonly signal: AbortSignal;
		readonly setSelf: SetSelf;
	}) => Value;

	type Write<Args extends unknown[], Result> = (get: Getter, set: Setter, ...args: Args) => Result;

	type WithInitialValue<Value> = {
		init: Value;
	};

	function atom<Value>(read: Read<Value>): Atom<Value>;


*/
const userAtom = atom(async (get, { signal }) => {
	const userId = get(userIdAtom);

	const response = await fetch(
		`${jsonHost}/users/${userId}?_delay=2000&date=${Date.now()}`,
		{ signal }
	);

	if (userId > 10) {
		throw new Error('User not found');
	}

	return response.json();
});

const Controls = () => {
	const [userId, setUserId] = useAtom(userIdAtom);

	return (
		<div>
			User Id: {userId}
			<button onClick={() => setUserId((c) => c - 1)}>Prev</button>
			<button onClick={() => setUserId((c) => c + 1)}>Next</button>
		</div>
	);
};

const UserName = () => {
	const [user] = useAtom(userAtom);
	return <div>User name: {user.name}</div>;
};

export const JoUserStepper = () => (
	<>
		<Controls />
		<ErrorBoundary fallback={ShowError}>
			<Suspense fallback="Loading...">
				<UserName />
			</Suspense>
		</ErrorBoundary>
	</>
);

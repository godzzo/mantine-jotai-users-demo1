import { Button, Group, Stack, Text } from '@mantine/core';

import { atom, useAtom, useAtomValue } from 'jotai';
import { loadable } from 'jotai/utils';

const jsonHost = 'https://jsonplaceholder.typicode.com';

type User = { name: string };

const userIdAtom = atom(1);

const userAtom = atom(async (get, { signal }) => {
	const userId = get(userIdAtom);

	const response = await fetch(
		`${jsonHost}/users/${userId}?_delay=1000&date=${Date.now()}`,
		{ signal }
	);

	if (userId > 10) {
		throw new Error('User not found');
	}

	return response.json() as unknown as User;
});

const loadableAtom = loadable(userAtom);

const UserData = () => {
	const value = useAtomValue(loadableAtom);

	if (value.state === 'hasError') {
		console.log('hasError', value);

		return (
			<Text>ERROR: {(value.error as { message: string }).message}</Text>
		);
	}

	if (value.state === 'loading') {
		return <Text>Loading...</Text>;
	}

	console.log(value.data); // Results of the Promise

	return <Text>Value: {value.data.name}</Text>;
};

function NavBar() {
	const [id, setId] = useAtom(userIdAtom);

	return (
		<Group justify="space-between">
			<Button onClick={() => setId((e) => e - 1)}>Prev</Button>
			<Text>id: {id}</Text>
			<Button onClick={() => setId((e) => e + 1)}>Next</Button>
		</Group>
	);
}

export function LoadableView() {
	// TODO: review - DOMException: The operation was aborted. (readAtomState vanilla.mjs:282)
	return (
		<Stack>
			<NavBar />
			<UserData />
		</Stack>
	);
}

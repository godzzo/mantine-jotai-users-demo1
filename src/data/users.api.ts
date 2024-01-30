import { wait, waitCall } from '../lib/util';
import { User, getData } from './users.data';

export async function addUser(user: Omit<User, 'id'>) {
	await wait();
	data.push({ id: maxId() + 1, ...user });
}

export async function getUser(id: number) {
	await wait();
	return getUserImpl(id);
}
export async function getUserEx(id: number, signal: AbortSignal) {
	return await waitCall(async () => getUserImpl(id), signal);
}
function getUserImpl(id: number) {
	const found = data.find((e) => e.id === id);

	if (found) {
		return found;
	} else {
		throw new Error(`User not found ${id}`);
	}
}

export async function updateUser(user: User) {
	await wait();
	const found = data.find((e) => e.id === user.id);

	if (found) {
		data = data.filter((e) => e.id === user.id).map(() => ({ ...user }));
	} else {
		throw new Error(`User not found ${user.id}`);
	}
}

export async function queryUsers(text: string) {
	await wait();

	return locateUsers(text);
}

export async function queryUsersEx(text: string, signal: AbortSignal) {
	return await waitCall(async () => locateUsers(text), signal);
}

function locateUsers(text: string) {
	text = text.toLowerCase();

	if (text.includes('error')) {
		throw new Error('Error locating users');
	}

	return data.filter(
		(e) =>
			e.firstName.toLowerCase().includes(text) ||
			e.lastName.toLowerCase().includes(text) ||
			e.address.toLowerCase().includes(text) ||
			e.state.toLowerCase().includes(text) ||
			e.phoneNumber.toLowerCase().includes(text)
	);
}

let data = getData();

function maxId() {
	return data.reduce((p, c) => (p > c.id ? p : c.id), 0);
}

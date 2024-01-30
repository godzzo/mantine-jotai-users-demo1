import { Suspense } from 'react';

import { useAtom, useAtomValue } from 'jotai';

import {
	Box,
	Button,
	Group,
	Loader,
	Stack,
	Text,
	TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import { ErrorBoundary, ShowError } from './ErrorBoundary';

import { currentUserExAtom, selectedUserIdAtom } from '../data/users.store';
import { User } from '../data/users.data';

export function UserForm() {
	return (
		<Stack w="550px">
			<NavBar />
			<ErrorBoundary fallback={ShowError}>
				<Suspense
					fallback={
						<Box w="100%" h="450px">
							<Loader />
						</Box>
					}
				>
					<FormLoader />
				</Suspense>
			</ErrorBoundary>
		</Stack>
	);
}

function FormLoader() {
	const currentUser = useAtomValue(currentUserExAtom);

	return <FormControls key={currentUser.id} user={currentUser} />;
}

function FormControls({ user }: { user: User }) {
	const form = useForm({
		initialValues: {
			...user,
		},
	});

	return (
		<Stack>
			<TextInput label="firstName" {...form.getInputProps('firstName')} />
			<TextInput label="lastName" {...form.getInputProps('lastName')} />
			<TextInput label="state" {...form.getInputProps('state')} />
			<TextInput label="address" {...form.getInputProps('address')} />
			<TextInput
				label="phoneNumber"
				{...form.getInputProps('phoneNumber')}
			/>
		</Stack>
	);
}

function NavBar() {
	const [id, setId] = useAtom(selectedUserIdAtom);

	return (
		<Group justify="space-between">
			<Button onClick={() => setId((e) => e - 1)}>Prev</Button>
			<Text>id: {id}</Text>
			<Button onClick={() => setId((e) => e + 1)}>Next</Button>
		</Group>
	);
}

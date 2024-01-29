import { ReactNode, Suspense } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';

import { Button, Group, Loader, Table, TextInput } from '@mantine/core';
import { IconPhoto, IconDownload } from '@tabler/icons-react';

import { queriedUsersExAtom, searchTextAtom } from '../data/users.store';
import { ErrorBoundary, ShowError } from './ErrorBoundary';

export function UsersTable() {
	return (
		<Table horizontalSpacing="sm" highlightOnHover>
			<Table.Thead>
				<Table.Tr>
					<Table.Th>id</Table.Th>
					<Table.Th>first name</Table.Th>
					<Table.Th>last name</Table.Th>
					<Table.Th>state</Table.Th>
					<Table.Th>actions</Table.Th>
				</Table.Tr>
			</Table.Thead>
			<Table.Tbody>
				<WrapAsync fallback={<TrLoading colSpan={5} />}>
					<Rows />
				</WrapAsync>
			</Table.Tbody>
		</Table>
	);
}

function WrapAsync({
	fallback,
	children,
}: {
	fallback: ReactNode;
	children: ReactNode;
}) {
	// TODO: Review why ErrorBoundary is not working (did not catch the error!
	// - only return from component not thrown, but sometimes works... where, how? 🤔
	return (
		<ErrorBoundary fallback={ShowError}>
			<Suspense fallback={fallback}>{children}</Suspense>
		</ErrorBoundary>
	);
}

function TrLoading({ colSpan }: { colSpan: number }) {
	return (
		<Table.Tr>
			<Table.Td colSpan={colSpan} align="center" h="500px" w="550px">
				<Loader />
			</Table.Td>
		</Table.Tr>
	);
}

export function Filter() {
	const invokeSearch = useSetAtom(searchTextAtom);

	return (
		<TextInput
			onChange={(e) => invokeSearch(e.currentTarget.value)}
			placeholder="Search"
		/>
	);
}

function Rows() {
	const users = useAtomValue(queriedUsersExAtom);

	return (
		<>
			{users
				.filter((_, i) => i < 10)
				.map((user) => (
					<Table.Tr key={user.id}>
						<Table.Td>{user.id}</Table.Td>
						<Table.Td>{user.firstName}</Table.Td>
						<Table.Td>{user.lastName}</Table.Td>
						<Table.Td>{user.state}</Table.Td>
						<Table.Td>
							<RowButtons />
						</Table.Td>
					</Table.Tr>
				))}
		</>
	);
}

function RowButtons() {
	return (
		<Group justify="center">
			<Button leftSection={<IconPhoto size={14} />} variant="default">
				Edit
			</Button>

			<Button rightSection={<IconDownload size={14} />}>View</Button>
		</Group>
	);
}

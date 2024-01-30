import { Suspense, useState } from 'react';
import { atom, useAtomValue, useSetAtom } from 'jotai';

import { Button, Loader, Stack } from '@mantine/core';

import { ErrorBoundary, ShowError } from '../components/ErrorBoundary';

import { waitHnd } from '../lib/util';

const countAtom = atom(0);

const incrementedAtom = atom(async (get) => {
	let out = 0;

	try {
		out = await waitHnd(async () => {
			if (get(countAtom) > 4) {
				throw new Error(`Count is Too Much! ${get(countAtom)}`);
			}

			return get(countAtom) + 1;
		});
	} catch (e) {
		console.log('CATCHED', e);
		throw e;
	}

	return out;
});

export function AsyncErrorView() {
	return (
		<Stack>
			<ErrorBoundary fallback={ShowError}>
				<Suspense fallback={<Loader />}>
					<Demo />
				</Suspense>
			</ErrorBoundary>
		</Stack>
	);
}

function Demo() {
	const increment = useSetAtom(countAtom);
	const incremented = useAtomValue(incrementedAtom);

	const [count, setCount] = useState(0);

	return (
		<Stack>
			<Button onClick={() => increment((e) => e + 1)}>
				Atom: {incremented}
			</Button>
			<Button
				onClick={() => {
					simpleAsync(count, setCount).catch((e) => {
						console.log('simpleAsync ERROR', e);
					});
				}}
			>
				Simple: {count}
			</Button>
		</Stack>
	);
}

async function simpleAsync(count: number, setCount: (e: number) => void) {
	try {
		await waitHnd(async () => {
			if (count > 4) {
				throw new Error(`Count is Too Much! ${count}`);
			}

			setCount(count + 1);
		});
	} catch (e) {
		console.log('simpleAsync CATCHED', e);
	}
}

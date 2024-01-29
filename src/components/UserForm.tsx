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
import { useAtom, useAtomValue } from 'jotai';
import { currentUserExAtom, selectedUserIdAtom } from '../data/users.store';
import { User } from '../data/users.data';
import { Suspense } from 'react';

export function UserForm() {
  return (
    <Stack w="550px">
      <NavBar />
      <Suspense
        fallback={
          <Box w="100%" h="450px">
            <Loader />
          </Box>
        }
      >
        <FormLoader />
      </Suspense>
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
      <TextInput label="phoneNumber" {...form.getInputProps('phoneNumber')} />
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

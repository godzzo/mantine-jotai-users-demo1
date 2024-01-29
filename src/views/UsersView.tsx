import { Card, Tabs } from '@mantine/core';
import { Filter, UsersTable } from '../components/UserTable';
import { UserForm } from '../components/UserForm';

export function UsersView() {
  return <UsersTabs />;
}

function UsersTabs() {
  return (
    <Card withBorder px="lg" radius="md">
      <Tabs defaultValue="table">
        <Tabs.List>
          <Tabs.Tab value="table">Table</Tabs.Tab>
          <Tabs.Tab value="add">Add</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel mt="md" value="table">
          <Filter />
          <UsersTable />
        </Tabs.Panel>

        <Tabs.Panel mt="md" value="add">
          <UserForm />
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
}

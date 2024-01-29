import { Link, Outlet } from 'react-router-dom';

import { Group, ScrollArea, Stack } from '@mantine/core';

import './App.css';
import { links } from './router';

export function App() {
  return (
    <Group align="flex-start">
      <ScrollArea h="85vh">
        <Menu />
      </ScrollArea>
      <Outlet />
    </Group>
  );
}

function Menu() {
  return (
    <Stack p="md" w="100px">
      {links.map((link) => (
        <Link key={link.caption} to={link.path}>
          {link.caption}
        </Link>
      ))}
    </Stack>
  );
}

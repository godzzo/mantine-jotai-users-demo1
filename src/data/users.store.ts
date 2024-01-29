import { atom } from 'jotai';
import { loadable } from 'jotai/utils';
import { getUser, getUserEx, queryUsers, queryUsersEx } from './users.api';

export const selectedUserIdAtom = atom(1);
export const currentUserAtom = atom(async (get /*{ signal }*/) => {
  const id = get(selectedUserIdAtom);

  return await getUser(id);
});
export const currentUserExAtom = atom(async (get, { signal }) => {
  const id = get(selectedUserIdAtom);

  return await getUserEx(id, signal);
});
export const loadableCurrentUserExAtom = loadable(currentUserExAtom);

export const searchTextAtom = atom('');
export const queriedUsersAtom = atom(async (get /*{ signal }*/) => {
  const text = get(searchTextAtom);

  return await queryUsers(text);
});
export const queriedUsersExAtom = atom(async (get, { signal }) => {
  const text = get(searchTextAtom);

  return await queryUsersEx(text, signal);
});

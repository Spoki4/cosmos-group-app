import {AppState} from '../reducers';
import {User} from './reducer';

export const getAllUsers = (state: AppState) => {
  const arr: User[] = [];
  Object.keys(state.users.list)
    .map((key) => state.users.list[key])
    .map((x) => arr.push(x));
  return arr;
};

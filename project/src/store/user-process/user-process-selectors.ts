import { AuthorizationStatus, NameSpace } from '../../consts';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getLogin = (state: State): string | null => state[NameSpace.User].login;

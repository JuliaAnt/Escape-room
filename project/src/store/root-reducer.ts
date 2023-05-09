import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../consts';
import { reducer } from './reducer';
import { userProcess } from './user-process/user-process-slice';

export const rootReducer = combineReducers({
  [NameSpace.QuestsData]: reducer.reducer,
  [NameSpace.User]: userProcess.reducer,
});

import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../consts';
import { reducer } from './reducer';

export const rootReducer = combineReducers({
  [NameSpace.QuestsData]: reducer.reducer,
});

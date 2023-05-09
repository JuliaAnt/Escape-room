import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../consts';
import { reducer } from './reducer';
import { userProcess } from './user-process/user-process-slice';
import { bookingProcess } from './booking-process/booking-process-slice';

export const rootReducer = combineReducers({
  [NameSpace.QuestsData]: reducer.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Booking]: bookingProcess.reducer,
});

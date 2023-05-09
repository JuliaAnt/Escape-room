import { createSlice } from '@reduxjs/toolkit';
import { BookedQuest } from '../../types/booked-quest';
import { NameSpace } from '../../consts';
import { fetchBookedQuestsAction } from '../api-actions';

type InitialState = {
  myQuests: BookedQuest[];
}

const initialState: InitialState = {
  myQuests: [],
};

export const bookingProcess = createSlice({
  name: NameSpace.Booking,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBookedQuestsAction.fulfilled, (state, action) => {
        state.myQuests = action.payload;
      });
  },
});

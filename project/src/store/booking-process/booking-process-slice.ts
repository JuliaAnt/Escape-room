import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookedQuest } from '../../types/booked-quest';
import { NameSpace } from '../../consts';
import { fetchBookedQuestsAction, fetchBookingInfoAction } from '../actions/api-actions';
import { BookingInfo } from '../../types/booking-info';

type InitialState = {
  myQuests: BookedQuest[];
  bookingInfo: BookingInfo[];
  selectedBookingPoint: BookingInfo | null;
}

const initialState: InitialState = {
  myQuests: [],
  bookingInfo: [],
  selectedBookingPoint: null,
};

export const bookingProcess = createSlice({
  name: NameSpace.Booking,
  initialState,
  reducers: {
    changeBookingPointAction: (state, action: PayloadAction<BookingInfo | null>) => {
      state.selectedBookingPoint = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBookedQuestsAction.fulfilled, (state, action) => {
        state.myQuests = action.payload;
      })
      .addCase(fetchBookingInfoAction.fulfilled, (state, action) => {
        state.bookingInfo = action.payload;
      });
  },
});

export const { changeBookingPointAction } = bookingProcess.actions;

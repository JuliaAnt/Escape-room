import { NameSpace } from '../../consts';
import { BookedQuest } from '../../types/booked-quest';
import { BookingInfo } from '../../types/booking-info';
import { State } from '../../types/state';

export const getBookedQuests = (state: State): BookedQuest[] => state[NameSpace.Booking].myQuests;
export const getBookingInfo = (state: State): BookingInfo[] => state[NameSpace.Booking].bookingInfo;
export const getSelectedBookingPoint = (state: State): BookingInfo | null => state[NameSpace.Booking].selectedBookingPoint;

import { createAsyncThunk } from '@reduxjs/toolkit';
import { QuestCardType } from '../../types/quest-card';
import { AppDispatch, State } from '../../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../consts';
import { QuestType } from '../../types/quest';
import { dropToken, saveToken } from '../../services/token';
import { AuthData, UserData } from '../../types/auth-data';
import { BookedQuest } from '../../types/booked-quest';
import { BookingInfo } from '../../types/booking-info';
import { CurrentBooking } from '../../types/current-booking';

export const fetchQuestsAction = createAsyncThunk<QuestCardType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchQuests',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<QuestCardType[]>(APIRoute.Quests);
    return data;
  }
);

export const fetchSelectedQuestAction = createAsyncThunk<QuestType, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchSelectedQuest',
  async (id, { extra: api }) => {
    const { data } = await api.get<QuestType>(`/quest/${id}`);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, { extra: api }) => {
    await api.get(APIRoute.Login);
  }
);

export const loginAction = createAsyncThunk<string, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async ({ login: email, password }, { extra: api }) => {
    const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    return email;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);

export const fetchBookedQuestsAction = createAsyncThunk<BookedQuest[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchBookedQuests',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<BookedQuest[]>(APIRoute.BookedQuests);
    return data;
  }
);

export const fetchBookingInfoAction = createAsyncThunk<BookingInfo[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetchBookingInfo',
  async (id, { extra: api }) => {
    const { data } = await api.get<BookingInfo[]>(`/quest/${id}/booking`);
    return data;
  }
);

type SendBookingProps = CurrentBooking & { questId: string; onSuccess(): void; onError(): void };

export const sendBookingAction = createAsyncThunk<void, SendBookingProps, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'sendBooking',
  async ({ questId, date, time, peopleCount, contactPerson, placeId, phone, withChildren, onSuccess, onError }, { extra: api }) => {
    try {
      await api.post<CurrentBooking>(`/quest/${questId}/booking`, { date, time, peopleCount, contactPerson, placeId, phone, withChildren });
      onSuccess();
    }
    catch (error) {
      onError();
    }
  }
);

export const cancelBookingAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'cancelBooking',
  async (reservationId, { dispatch, extra: api }) => {
    await api.delete(`/reservation/${reservationId}`);
    dispatch(fetchBookedQuestsAction());
  }
);

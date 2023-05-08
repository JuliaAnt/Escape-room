import { createAsyncThunk } from '@reduxjs/toolkit';
import { QuestCardType } from '../types/quest-card';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../consts';
import { QuestType } from '../types/quest';

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
  'fetchSelectedOffer',
  async (id, { extra: api }) => {
    const { data } = await api.get<QuestType>(`/v1/escape-room/quest/${id}`);
    return data;
  }
);

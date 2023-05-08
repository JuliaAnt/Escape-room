import { createAsyncThunk } from '@reduxjs/toolkit';
import { QuestCardType } from '../types/quest-card';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../consts';

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

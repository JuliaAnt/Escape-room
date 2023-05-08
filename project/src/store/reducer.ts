import { createSlice } from '@reduxjs/toolkit';
import { QuestCardType } from '../types/quest-card';
import { fetchQuestsAction } from './api-actions';
import { NameSpace } from '../consts';

type InitialState = {
  questCards: QuestCardType[];
}

const initialState: InitialState = {
  questCards: [],
};

export const reducer = createSlice({
  name: NameSpace.QuestsData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestsAction.fulfilled, (state, action) => {
        state.questCards = action.payload;
      });
  },
});

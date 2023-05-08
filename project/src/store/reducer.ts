import { createSlice } from '@reduxjs/toolkit';
import { QuestCardType } from '../types/quest-card';
import { fetchQuestsAction, fetchSelectedQuestAction } from './api-actions';
import { NameSpace } from '../consts';
import { QuestType } from '../types/quest';

type InitialState = {
  questCards: QuestCardType[];
  selectedQuest: QuestType | null;
}

const initialState: InitialState = {
  questCards: [],
  selectedQuest: null,
};

export const reducer = createSlice({
  name: NameSpace.QuestsData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestsAction.fulfilled, (state, action) => {
        state.questCards = action.payload;
      })
      .addCase(fetchSelectedQuestAction.fulfilled, (state, action) => {
        state.selectedQuest = action.payload;
      });
  },
});

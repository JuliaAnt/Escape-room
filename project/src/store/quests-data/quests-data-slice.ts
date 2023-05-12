import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { QuestCardType } from '../../types/quest-card';
import { fetchQuestsAction, fetchSelectedQuestAction } from '../api-actions';
import { FILTER_MAP, NameSpace } from '../../consts';
import { QuestType } from '../../types/quest';
import { FieldNameToFilter, SelectedFilter } from '../../types/filters';

type InitialState = {
  questCards: QuestCardType[];
  selectedQuest: QuestType | null;
  selectedFilters: SelectedFilter[];
  filteredQuestCards: QuestCardType[];
}

const initialState: InitialState = {
  questCards: [],
  selectedQuest: null,
  filteredQuestCards: [],
  selectedFilters: [
    {
      filterType: 'genreFilter',
      filterValue: 'all',
    },
    {
      filterType: 'levelFilter',
      filterValue: 'any',
    }
  ],
};

export const questsData = createSlice({
  name: NameSpace.QuestsData,
  initialState,
  reducers: {
    changeFiltersAction: (state, action: PayloadAction<SelectedFilter>) => {
      const filterIndex = state.selectedFilters.findIndex((filter) => filter.filterType === action.payload.filterType);
      if (filterIndex > -1) {
        state.selectedFilters[filterIndex] = action.payload;
      } else {
        state.selectedFilters.push(action.payload);
      }

      state.filteredQuestCards = state.questCards.filter((questCard) => state.selectedFilters.every((filter) => {
        const fieldName: FieldNameToFilter = FILTER_MAP[filter.filterType];
        return questCard[fieldName] === filter.filterValue || filter.filterValue === 'all' || filter.filterValue === 'any';
      }));
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestsAction.fulfilled, (state, action) => {
        state.questCards = action.payload;

        state.filteredQuestCards = state.questCards.filter((questCard) => state.selectedFilters.every((filter) => {
          const fieldName: FieldNameToFilter = FILTER_MAP[filter.filterType];
          return questCard[fieldName] === filter.filterValue || filter.filterValue === 'all' || filter.filterValue === 'any';
        }));
      })
      .addCase(fetchSelectedQuestAction.fulfilled, (state, action) => {
        state.selectedQuest = action.payload;
      });
  },
});

export const { changeFiltersAction } = questsData.actions;

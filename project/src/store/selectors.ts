import { NameSpace } from '../consts';
import { QuestType } from '../types/quest';
import { QuestCardType } from '../types/quest-card';
import { State } from '../types/state';

export const getQuests = (state: State): QuestCardType[] => state[NameSpace.QuestsData].questCards;
export const getSelectedQuest = (state: State): QuestType | null => state[NameSpace.QuestsData].selectedQuest;

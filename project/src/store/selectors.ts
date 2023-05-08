import { NameSpace } from '../consts';
import { QuestCardType } from '../types/quest-card';
import { State } from '../types/state';

export const getQuests = (state: State): QuestCardType[] => state[NameSpace.QuestsData].questCards;

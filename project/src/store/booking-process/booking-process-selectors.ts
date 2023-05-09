import { NameSpace } from '../../consts';
import { BookedQuest } from '../../types/booked-quest';
import { State } from '../../types/state';

export const getBookedQuests = (state: State): BookedQuest[] => state[NameSpace.Booking].myQuests;

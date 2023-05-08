import { LevelFilter, TypeFilter } from './types/filters';

export const TYPE_FILTERS: TypeFilter[] = [
  {
    text: 'Все квесты',
    type: 'all',
    icon: {
      name: 'icon-all-quests',
      width: '26',
      height: '30',
    },
  },
  {
    text: 'Приключения',
    type: 'adventure',
    icon: {
      name: 'icon-adventure',
      width: '36',
      height: '30',
    },
  },
  {
    text: 'Ужасы',
    type: 'horror',
    icon: {
      name: 'icon-horror',
      width: '30',
      height: '30',
    },
  },
  {
    text: 'Мистика',
    type: 'mystic',
    icon: {
      name: 'icon-mystic',
      width: '30',
      height: '30',
    },
  },
  {
    text: 'Детектив',
    type: 'detective',
    icon: {
      name: 'icon-detective',
      width: '40',
      height: '30',
    },
  },
  {
    text: 'Sci-fi',
    type: 'sciFi',
    icon: {
      name: 'icon-sci-fi',
      width: '28',
      height: '30',
    },
  },
];

export const LEVEL_FILTERS: LevelFilter[] = [
  {
    type: 'any',
    text: 'Любой',
  },
  {
    type: 'easy',
    text: 'Лёгкий',
  },
  {
    type: 'middle',
    text: 'Средний',
  },
  {
    type: 'hard',
    text: 'Сложный',
  }
];

export enum AppRoute {
  MyQuests = '/my-quests',
  Login = '/login',
  Main = '/',
  Quest = '/quest/:type',
  Booking = '/quest/:type/booking',
  Contact = '/contacts',
}


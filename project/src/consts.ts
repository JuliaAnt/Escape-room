import { LevelFilter, GenreFilter } from './types/filters';

export const GENRE_FILTERS: GenreFilter[] = [
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
  Quest = '/quest/:id',
  Booking = '/quest/:id/booking',
  Contact = '/contacts',
}

export enum APIRoute {
  Quests = '/v1/escape-room/quest',
  SelectedOffer = '/hotels/{hotelId}',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments/1',
  Favorites = '/favorite',
}

export enum NameSpace {
  User = 'USER',
  QuestsData = 'QUESTS_DATA',
  CurrentOfferData = 'CURRENT_OFFER_DATA',
}


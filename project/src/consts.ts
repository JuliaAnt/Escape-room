import { LevelFilter, GenreFilter, FilterType, FieldNameToFilter, SelectedFilter } from './types/filters';

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
    type: 'adventures',
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
    type: 'sci-fi',
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
    type: 'medium',
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
  Quests = '/quest',
  SelectedQuest = '/quest/{questId}',
  Login = '/login',
  Logout = '/logout',
  BookedQuests = '/reservation',
  BookingInfo = '/quest/{questId}/booking'
}

export enum NameSpace {
  User = 'USER',
  QuestsData = 'QUESTS_DATA',
  Booking = 'BOOKING',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const CITY = {
  title: 'Санкт-Петербург',
  lat: 59.93863,
  lng: 30.31413,
  zoom: 10,
};

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const MAP_SIZE = {
  bookingPage: {
    height: '529px',
    width: '890px',
    margin: 'auto',
  },
  contactsPage: {
    height: '370px',
    width: '617px',
    margin: 'auto',
  }
};

export const OFFICE_COORDS = {
  lat: 59.968456,
  lng: 30.31759,
};

export const FILTER_MAP: Record<FilterType, FieldNameToFilter> = {
  genreFilter: 'type',
  levelFilter: 'level',
};

export const INITIAL_FILTER: SelectedFilter[] = [
  {
    filterType: 'genreFilter',
    filterValue: 'all',
  },
  {
    filterType: 'levelFilter',
    filterValue: 'any',
  }
];

export const PAGES_LIST = {
  mainPage: 'mainPage',
  myQuestsPage: 'myQuestsPage',
  contacts: 'contacts',
};

export type GenreFilter = {
  text: string;
  type: string;
  icon: {
    name: string;
    width: string;
    height: string;
  };
};

export type LevelFilter = {
  type: string;
  text: string;
};

export type FilterType = 'genreFilter' | 'levelFilter';

export type FieldNameToFilter = 'type' | 'level';

export type SelectedFilter =
  {
    filterType: FilterType;
    filterValue: string;
  };

import { GENRE_FILTERS } from '../../consts';
import { GenreFilter } from '../../types/filters';
import GenreFilterItem from '../genre-filter-item/genre-filter-item';

function GenreFilterList(): JSX.Element {
  return (
    <ul className="filter__list">
      {GENRE_FILTERS.map((filter: GenreFilter) => <GenreFilterItem key={filter.type} filter={filter} />)}
    </ul>
  );

}

export default GenreFilterList;

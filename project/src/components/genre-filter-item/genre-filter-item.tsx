import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getSelectedFilters } from '../../store/quests-data/quests-data-selectors';
import { changeFiltersAction } from '../../store/quests-data/quests-data-slice';
import { GenreFilter } from '../../types/filters';

type GenreFilterItemProps = {
  filter: GenreFilter;
}

function GenreFilterItem({ filter }: GenreFilterItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { text, icon, type } = filter;

  const onFilterChange = () => {
    dispatch(changeFiltersAction({ filterType: 'genreFilter', filterValue: type }));
  };

  const selectedFilters = useAppSelector(getSelectedFilters);
  const selectedGenreFilter = selectedFilters.find((filterToFind) => filterToFind.filterType === 'genreFilter');
  const selectedGenreFilterValue = selectedGenreFilter?.filterValue;
  const checked = Boolean(type === selectedGenreFilterValue);

  return (
    <li key={type} className="filter__item">
      <input type="radio" name="type" id={type} onClick={onFilterChange} defaultChecked={checked} />
      <label className="filter__label" htmlFor={type}>
        <svg className="filter__icon" width={icon.width} height={icon.height} aria-hidden="true">
          <use xlinkHref={`#${icon.name}`}></use>
        </svg>
        <span className="filter__label-text">{text}</span>
      </label>
    </li>
  );
}

export default GenreFilterItem;

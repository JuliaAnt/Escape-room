import { useAppDispatch } from '../../hooks/redux-hooks';
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

  return (
    <li key={type} className="filter__item">
      <input type="radio" name="type" id={type} onClick={onFilterChange} />
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

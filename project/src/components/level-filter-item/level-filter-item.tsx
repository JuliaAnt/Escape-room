import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getSelectedFilters } from '../../store/quests-data/quests-data-selectors';
import { changeFiltersAction } from '../../store/quests-data/quests-data-slice';
import { LevelFilter } from '../../types/filters';

type LevelFilterItemProps = {
  filter: LevelFilter;
}

function LevelFilterItem({ filter }: LevelFilterItemProps): JSX.Element {
  const { text, type } = filter;
  const dispatch = useAppDispatch();

  const onFilterChange = () => {
    dispatch(changeFiltersAction({ filterType: 'levelFilter', filterValue: type }));
  };

  const selectedFilters = useAppSelector(getSelectedFilters);
  const selectedLevelFilter = selectedFilters.find((filterToFind) => filterToFind.filterType === 'levelFilter');
  const selectedLevelFilterValue = selectedLevelFilter?.filterValue;
  const checked = Boolean(type === selectedLevelFilterValue);

  return (
    <li className="filter__item">
      <input type="radio" name="level" id={type} onClick={onFilterChange} defaultChecked={checked} />
      <label className="filter__label" htmlFor={type}><span className="filter__label-text">{text}</span>
      </label>
    </li>
  );
}

export default LevelFilterItem;

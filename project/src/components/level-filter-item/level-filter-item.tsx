import { useAppDispatch } from '../../hooks/redux-hooks';
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

  return (
    <li className="filter__item">
      <input type="radio" name="level" id={type} onClick={onFilterChange} />
      <label className="filter__label" htmlFor={type}><span className="filter__label-text">{text}</span>
      </label>
    </li>
  );
}

export default LevelFilterItem;

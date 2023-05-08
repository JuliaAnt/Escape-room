import { LEVEL_FILTERS } from '../../consts';
import LevelFilterItem from '../level-filter-item/level-filter-item';

function LevelFilterList(): JSX.Element {
  return (
    <ul className="filter__list">
      {LEVEL_FILTERS.map((filter) => <LevelFilterItem key={filter.type} filter={filter} />)}
    </ul>
  );

}

export default LevelFilterList;

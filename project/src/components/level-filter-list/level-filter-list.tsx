import { LEVEL_FILTERS } from '../../consts';
import { LevelFilter } from '../../types/filters';
import LevelFilterItem from '../level-filter-item/level-filter-item';

function LevelFilterList(): JSX.Element {
  return (
    <ul className="filter__list">
      {LEVEL_FILTERS.map((filter: LevelFilter) => <LevelFilterItem key={filter.type} filter={filter} />)}
    </ul>
  );

}

export default LevelFilterList;

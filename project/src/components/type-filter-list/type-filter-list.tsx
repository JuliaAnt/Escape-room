import { TYPE_FILTERS } from '../../consts';
import TypeFilterItem from '../type-filter-item/type-filter-item';

function TypeFilterList(): JSX.Element {
  return (
    <ul className="filter__list">
      {TYPE_FILTERS.map((filter) => <TypeFilterItem key={filter.type} filter={filter} />)}
    </ul>
  );

}

export default TypeFilterList;

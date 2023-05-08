import { LevelFilter } from '../../types/filters';

type LevelFilterItemProps = {
  filter: LevelFilter;
}

function LevelFilterItem({ filter }: LevelFilterItemProps): JSX.Element {
  const { text, type } = filter;
  return (
    <li className="filter__item">
      <input type="radio" name="level" id={type} />
      <label className="filter__label" htmlFor={type}><span className="filter__label-text">{text}</span>
      </label>
    </li>
  );
}

export default LevelFilterItem;

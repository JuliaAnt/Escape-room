import { TypeFilter } from '../../types/filters';

type TypeFilterItemProps = {
  filter: TypeFilter;
}

function TypeFilterItem({ filter }: TypeFilterItemProps): JSX.Element {
  const { text, icon, type } = filter;
  return (
    <li key={type} className="filter__item">
      <input type="radio" name="type" id={type} checked />
      <label className="filter__label" htmlFor={type}>
        <svg className="filter__icon" width={icon.width} height={icon.height} aria-hidden="true">
          <use xlinkHref={`#${icon.name}`}></use>
        </svg>
        <span className="filter__label-text">{text}</span>
      </label>
    </li>
  );
}

export default TypeFilterItem;

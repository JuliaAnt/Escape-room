import { QuestCardType } from '../../types/quest-card';
import { Link } from 'react-router-dom';

type QuestCardProps = {
  questCard: QuestCardType;
}

function QuestCard({ questCard }: QuestCardProps): JSX.Element {
  const { title, previewImg, previewImgWebp, level, peopleMinMax, id } = questCard;
  return (
    <div key={id} className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source type="image/webp" srcSet={previewImgWebp} />
          <img src={previewImg} srcSet={previewImg} width="344" height="232" alt={title} />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link className="quest-card__link" to={`/quest/${id}`}>{title}</Link>
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width="11" height="14" aria-hidden="true">
              <use xlinkHref="#icon-person"></use>
            </svg>{`${peopleMinMax[0]}&ndash;${peopleMinMax[1]}&nbsp;чел`}
          </li>
          <li className="tags__item">
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-level"></use>
            </svg>{level}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default QuestCard;

import { useAppDispatch } from '../../hooks/redux-hooks';
import { cancelBookingAction } from '../../store/actions/api-actions';
import { QuestCardType } from '../../types/quest-card';
import { Link } from 'react-router-dom';

type QuestCardProps = {
  questCard: QuestCardType;
  isVisible: boolean;
}

function QuestCard({ questCard, isVisible }: QuestCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { title, previewImg, previewImgWebp, level, peopleMinMax, id, time, date, address, peopleCount, bookedQuestId } = questCard;

  let dateFormatted = '';
  if (date === 'today') {
    dateFormatted = 'Сегодня';
  } else if (date === 'tomorrow') {
    dateFormatted = 'Завтра';
  }

  const onCancelBooking = () => {
    if (bookedQuestId) {
      dispatch(cancelBookingAction(bookedQuestId));
    }
  };

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
          {isVisible && time && address ? <span className="quest-card__info">{`[${dateFormatted}, ${time}. ${address}]`}</span> : ''}
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width="11" height="14" aria-hidden="true">
              <use xlinkHref="#icon-person"></use>
            </svg>{peopleCount ? `${peopleCount} чел` : `${peopleMinMax[0]}-${peopleMinMax[1]} чел`}
          </li>
          <li className="tags__item">
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-level"></use>
            </svg>{level}
          </li>
        </ul>
        {isVisible && bookedQuestId ? <button className="btn btn--accent btn--secondary quest-card__btn" type="button" onClick={onCancelBooking}>Отменить</button> : ''}
      </div>
    </div>
  );
}

export default QuestCard;

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { cancelBookingAction } from '../../store/api-actions';
import { getBookedQuests } from '../../store/booking-process/booking-process-selectors';
import { BookedQuest } from '../../types/booked-quest';
import { QuestCardType } from '../../types/quest-card';
import { Link } from 'react-router-dom';

type QuestCardProps = {
  questCard: QuestCardType;
  isVisible: boolean;
}

function QuestCard({ questCard, isVisible }: QuestCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { title, previewImg, previewImgWebp, level, peopleMinMax, id } = questCard;

  const bookedQuests = useAppSelector(getBookedQuests);
  const bookedQuest: BookedQuest | undefined = bookedQuests.find((questToFind) => questToFind.quest.id === id);

  let date = '';
  if (bookedQuest && bookedQuest.date === 'today') {
    date = 'Сегодня';
  } else if (bookedQuest && bookedQuest.date === 'tomorrow') {
    date = 'Завтра';
  }

  const time = bookedQuest?.time || '';
  const address = bookedQuest?.location.address || '';
  const peopleCount = bookedQuest?.peopleCount || 0;

  const onCancelBooking = () => {
    if (bookedQuest) {
      dispatch(cancelBookingAction(bookedQuest.id));
    }
  };
  // eslint-disable-next-line no-console
  console.log(bookedQuests);

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
          {isVisible && bookedQuest ? <span className="quest-card__info">{`[${date}, ${time}. ${address}]`}</span> : ''}
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width="11" height="14" aria-hidden="true">
              <use xlinkHref="#icon-person"></use>
            </svg>{bookedQuest ? `${peopleCount} чел` : `${peopleMinMax[0]}-${peopleMinMax[1]} чел`}
          </li>
          <li className="tags__item">
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-level"></use>
            </svg>{level}
          </li>
        </ul>
        {isVisible && bookedQuest ? <button className="btn btn--accent btn--secondary quest-card__btn" type="button" onClick={onCancelBooking}>Отменить</button> : ''}
      </div>
    </div>
  );
}

export default QuestCard;

import { FormEvent, useState } from 'react';
import { BookingInfo } from '../../types/booking-info';
import BookingTimeList from '../booking-time-list/booking-time-list';
import { CurrentBooking } from '../../types/current-booking';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { sendBookingAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../consts';

type BookingFormProps = {
  selectedBookingPoint: BookingInfo;
  questId: string;
}

type SelectedDateTime = {
  date: string;
  time: string;
}
type FormData = {
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
}

function BookingForm({ selectedBookingPoint, questId }: BookingFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const today = selectedBookingPoint?.slots.today;
  const tomorrow = selectedBookingPoint?.slots.tomorrow;

  const [selectedDateTime, setSelectedTime] = useState<SelectedDateTime>({
    date: '',
    time: '',
  });
  const [formData, setFormData] = useState<FormData>({
    contactPerson: '',
    phone: '',
    withChildren: false,
    peopleCount: 0,
  });

  const selectedTimeChangeHandler = (time: string, date: string) => setSelectedTime({ time, date });

  const onSubmit = (currentBooking: CurrentBooking & { questId: string }) => {
    dispatch(sendBookingAction({
      ...currentBooking,
      onSuccess: () => navigate(AppRoute.MyQuests),
      // eslint-disable-next-line no-console
      onError: () => console.log('Hey!'),
    }));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit({
      date: selectedDateTime.date,
      time: selectedDateTime.time,
      contactPerson: formData.contactPerson,
      phone: formData.phone,
      withChildren: formData.withChildren,
      peopleCount: formData.peopleCount,
      placeId: selectedBookingPoint.id,
      questId: questId,
    });
  };

  return (
    <form className="booking-form" action="" method="post" onSubmit={handleSubmit}>
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Выбор даты и времени</legend>
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Сегодня</legend>
          <BookingTimeList date={'today'} timeList={today} onChange={selectedTimeChangeHandler} />
        </fieldset>
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Завтра</legend>
          <BookingTimeList date={'tomorrow'} timeList={tomorrow} onChange={selectedTimeChangeHandler} />
        </fieldset>
      </fieldset>
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Контактная информация</legend>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="name">Ваше имя</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Имя"
            required
            pattern="[А-Яа-яЁёA-Za-z'- ]{1,}"
            onChange={(e) => setFormData((state) => ({ ...state, contactPerson: e.target.value }))}
          />
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
          <input
            type="tel"
            id="tel"
            name="tel"
            placeholder="Телефон"
            required
            pattern="[0-9]{10,}"
            onChange={(e) => setFormData((state) => ({ ...state, phone: e.target.value }))}
          />
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="person">Количество участников</label>
          <input
            type="number"
            id="person"
            name="person"
            placeholder="Количество участников"
            required
            onChange={(e) => setFormData((state) => ({ ...state, peopleCount: +e.target.value }))}
          />
        </div>
        <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
          <input
            type="checkbox"
            id="children"
            name="children"
            onChange={(e) => setFormData((state) => ({ ...state, withChildren: Boolean(e.target.value) }))}
          />
          <span className="custom-checkbox__icon">
            <svg width="20" height="17" aria-hidden="true">
              <use xlinkHref="#icon-tick"></use>
            </svg>
          </span>
          <span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
        </label>
      </fieldset>
      <button className="btn btn--accent btn--cta booking-form__submit" type="submit">Забронировать</button>
      <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
        <input type="checkbox" id="id-order-agreement" name="user-agreement" required />
        <span className="custom-checkbox__icon">
          <svg width="20" height="17" aria-hidden="true">
            <use xlinkHref="#icon-tick"></use>
          </svg>
        </span>
        <span className="custom-checkbox__label">Я&nbsp;согласен с
          <a className="link link--active-silver link--underlined" href="#">правилами обработки персональных данных</a>&nbsp;и пользовательским соглашением
        </span>
      </label>
    </form>
  );
}

export default BookingForm;

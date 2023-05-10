import { useEffect } from 'react';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getBookingInfo, getSelectedBookingPoint } from '../../store/booking-process/booking-process-selectors';
import { fetchBookingInfoAction } from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import { getSelectedQuest } from '../../store/selectors';
import Map from '../../components/map/map';
import { CITY, MAP_SIZE } from '../../consts';
import BookingTimeList from '../../components/booking-time-list/booking-time-list';

function BookingPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id: questId } = useParams<{ id: string }>();

  useEffect(() => {
    if (questId) {
      dispatch(fetchBookingInfoAction(questId));
    }
  }, [questId, dispatch]);

  const bookingInfo = useAppSelector(getBookingInfo);
  const selectedQuest = useAppSelector(getSelectedQuest);
  let selectedBookingPoint = useAppSelector(getSelectedBookingPoint);

  if (selectedBookingPoint === null) {
    selectedBookingPoint = bookingInfo[0];
  }

  // eslint-disable-next-line no-console
  console.log(selectedBookingPoint);

  const address = selectedBookingPoint?.location.address;
  const today = selectedBookingPoint?.slots.today;
  const tomorrow = selectedBookingPoint?.slots.tomorrow;
  const title = selectedQuest?.title;

  return (
    <>
      <Logo />
      <main className="page-content decorated-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp" srcSet="img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x" /><img src="img/content/maniac/maniac-bg-size-m.jpg" srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x" width="1366" height="1959" alt="" />
          </picture>
        </div>
        <div className="container container--size-s">
          <div className="page-content__title-wrapper">
            <h1 className="subtitle subtitle--size-l page-content__subtitle">Бронирование квеста
            </h1>
            <p className="title title--size-m title--uppercase page-content__title">{title}</p>
          </div>
          <div className="page-content__item">
            <div className="booking-map">
              <div className="map">
                <div className="map__container">
                  <Map points={bookingInfo} city={CITY} selectedPoint={selectedBookingPoint} size={MAP_SIZE.boolingPage} />
                </div>
              </div>
              <p className="booking-map__address">{`Вы выбрали: ${address}`}</p>
            </div>
          </div>
          <form className="booking-form" action="https://echo.htmlacademy.ru/" method="post">
            <fieldset className="booking-form__section">
              <legend className="visually-hidden">Выбор даты и времени</legend>
              <fieldset className="booking-form__date-section">
                <legend className="booking-form__date-title">Сегодня</legend>
                <BookingTimeList date={'today'} timeList={today} />
              </fieldset>
              <fieldset className="booking-form__date-section">
                <legend className="booking-form__date-title">Завтра</legend>
                <BookingTimeList date={'tomorrow'} timeList={tomorrow} />
              </fieldset>
            </fieldset>
            <fieldset className="booking-form__section">
              <legend className="visually-hidden">Контактная информация</legend>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="name">Ваше имя</label>
                <input type="text" id="name" name="name" placeholder="Имя" required pattern="[А-Яа-яЁёA-Za-z'- ]{1,}" />
              </div>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
                <input type="tel" id="tel" name="tel" placeholder="Телефон" required pattern="[0-9]{10,}" />
              </div>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="person">Количество участников</label>
                <input type="number" id="person" name="person" placeholder="Количество участников" required />
              </div>
              <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
                <input type="checkbox" id="children" name="children" checked />
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
        </div>
      </main >
      <Footer />
    </>
  );
}

export default BookingPage;

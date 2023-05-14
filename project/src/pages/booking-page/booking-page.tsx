import { useEffect } from 'react';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getBookingInfo, getSelectedBookingPoint } from '../../store/booking-process/booking-process-selectors';
import { fetchBookingInfoAction } from '../../store/actions/api-actions';
import { useParams } from 'react-router-dom';
import { getSelectedQuest } from '../../store/quests-data/quests-data-selectors';
import Map from '../../components/map/map';
import { CITY, MAP_SIZE } from '../../consts';
import { changeBookingPointAction } from '../../store/booking-process/booking-process-slice';
import { BookingInfo } from '../../types/booking-info';
import BookingForm from '../../components/booking-form/booking-form';

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

  const address = selectedBookingPoint?.location.address;
  const title = selectedQuest?.title;
  const peopleMinMax = selectedQuest?.peopleMinMax;

  // eslint-disable-next-line no-console
  console.log(bookingInfo);

  const onSelectedBookingPointChange = (point: BookingInfo) => dispatch(changeBookingPointAction(point));

  return (
    <>
      <Logo currentPage={null} />
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
                  <Map points={bookingInfo} city={CITY} selectedPoint={selectedBookingPoint} size={MAP_SIZE.bookingPage} office={null} onPointChange={onSelectedBookingPointChange} />
                </div>
              </div>
              <p className="booking-map__address">{`Вы выбрали: ${address}`}</p>
            </div>
          </div>
          {!!questId && <BookingForm selectedBookingPoint={selectedBookingPoint} questId={questId} peopleMinMax={peopleMinMax} />}
        </div>
      </main >
      <Footer />
    </>
  );
}

export default BookingPage;

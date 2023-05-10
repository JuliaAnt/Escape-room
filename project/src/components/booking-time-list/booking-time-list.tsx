import { Slot } from '../../types/booking-info';
import BookingTimeInput from '../booking-time-input/booking-time-input';

type BookingTimeListProps = {
  timeList: Slot[];
  date: string;
}

function BookingTimeList({ timeList, date }: BookingTimeListProps): JSX.Element {
  return (
    <div className="booking-form__date-inner-wrapper">
      {timeList.map((timeItem) => <BookingTimeInput key={timeItem.time} timeItem={timeItem} date={date} />)}
    </div>
  );
}

export default BookingTimeList;

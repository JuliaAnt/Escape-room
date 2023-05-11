import { Slot } from '../../types/booking-info';
import BookingTimeInput from '../booking-time-input/booking-time-input';

type BookingTimeListProps = {
  timeList: Slot[];
  date: string;
  onChange: (time: string, date: string) => void;
}

function BookingTimeList({ timeList, date, onChange }: BookingTimeListProps): JSX.Element {
  return (
    <div className="booking-form__date-inner-wrapper">
      {timeList?.map((timeItem) => <BookingTimeInput key={`${timeItem.time}&${date}`} timeItem={timeItem} date={date} onChange={onChange} />)}
    </div>
  );
}

export default BookingTimeList;

import { Slot } from '../../types/booking-info';

type BookingTimeInputProps = {
  timeItem: Slot;
  date: string;
}

function BookingTimeInput({ timeItem, date }: BookingTimeInputProps): JSX.Element {
  const { isAvailable, time } = timeItem;
  const formattedTime = time.split(':');

  return (
    <label className="custom-radio booking-form__date">
      <input type="radio" id={`${date}${formattedTime[0]}h${formattedTime[1]}m`} name="date" required value={`${date}${formattedTime[0]}h${formattedTime[1]}m`} disabled={isAvailable} /><span className="custom-radio__label">{time}</span>
    </label>
  );
}

export default BookingTimeInput;

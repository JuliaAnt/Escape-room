import { Slot } from '../../types/booking-info';

type BookingTimeInputProps = {
  timeItem: Slot;
  date: string;
  onChange: (time: string, date: string) => void;
}

function BookingTimeInput({ timeItem, date, onChange }: BookingTimeInputProps): JSX.Element {
  const { isAvailable, time } = timeItem;
  const formattedTime = time.split(':');

  return (
    <label key={`${time}&${date}`} className="custom-radio booking-form__date">
      <input
        type="radio"
        id={`${date}${formattedTime[0]}h${formattedTime[1]}m`}
        name="date"
        required
        value={`${date}${formattedTime[0]}h${formattedTime[1]}m`}
        disabled={!isAvailable}
        onClick={() => onChange(time, date)}
      />
      <span className="custom-radio__label">{time}</span>
    </label>
  );
}

export default BookingTimeInput;

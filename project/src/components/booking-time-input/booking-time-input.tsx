import { Slot } from '../../types/booking-info';

type BookingTimeInputProps = {
  timeItem: Slot;
  date: string;
  isDisabledForm: boolean;
  onChange: (time: string, date: string) => void;
}

function BookingTimeInput({ timeItem, date, isDisabledForm, onChange }: BookingTimeInputProps): JSX.Element {
  const { isAvailable, time } = timeItem;
  const formattedTime = time.split(':');

  return (
    <label key={`${time}&${date}`} className="custom-radio booking-form__date">
      <input
        type="radio"
        id={`${date}${formattedTime[0]}h${formattedTime[1]}m`}
        name="date"
        value={`${date}${formattedTime[0]}h${formattedTime[1]}m`}
        disabled={!isAvailable || isDisabledForm}
        onClick={() => onChange(time, date)}
      />
      <span className="custom-radio__label">{time}</span>
    </label>
  );
}

export default BookingTimeInput;

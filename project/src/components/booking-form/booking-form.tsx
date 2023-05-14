import { useState } from 'react';
import { BookingInfo } from '../../types/booking-info';
import BookingTimeList from '../booking-time-list/booking-time-list';
import { CurrentBooking } from '../../types/current-booking';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { sendBookingAction } from '../../store/actions/api-actions';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { changeBookingPointAction } from '../../store/booking-process/booking-process-slice';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';

type BookingFormProps = {
  selectedBookingPoint: BookingInfo;
  questId: string;
  peopleMinMax: [number, number] | undefined;
}

type FormData = {
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
}

type ValidationData = {
  contactPerson: string;
  phone: string;
  userAgreement: string;
  peopleCount: number;
  time: {
    time: string;
    date: string;
  };
}

function BookingForm({ selectedBookingPoint, questId, peopleMinMax }: BookingFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const today = selectedBookingPoint?.slots.today;
  const tomorrow = selectedBookingPoint?.slots.tomorrow;

  const [formData, setFormData] = useState<FormData>({
    contactPerson: '',
    phone: '',
    withChildren: false,
    peopleCount: 0,
  });

  const [isDisabledForm, setDisabled] = useState<boolean>(false);

  const onSubmit = (currentBooking: CurrentBooking & { questId: string }) => {
    setDisabled(true);
    dispatch(sendBookingAction({
      ...currentBooking,
      onSuccess: () => {
        navigate(AppRoute.MyQuests);
        dispatch(changeBookingPointAction(null));
        setDisabled(false);
      },
      onError: () => {
        toast('Form was not send! Please, try again later.');
        setDisabled(false);
      }
    }));
  };

  const { register, handleSubmit,
    control,
    formState: { errors } } = useForm<ValidationData>();

  const submitHandler: SubmitHandler<ValidationData> = (data: ValidationData) => {
    onSubmit({
      phone: data.phone,
      contactPerson: data.contactPerson,
      peopleCount: Number(data.peopleCount),
      time: data.time.time,
      date: data.time.date,
      withChildren: formData.withChildren,
      placeId: selectedBookingPoint.id,
      questId: questId,
    });
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className="booking-form" action="" method="post" onSubmit={handleSubmit(submitHandler)} >
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Выбор даты и времени</legend>
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Сегодня</legend>
          <Controller
            control={control}
            name='time'
            rules={
              { required: 'Required booking time' }
            }
            render={({ field }) => (
              <BookingTimeList
                date='today'
                timeList={today}
                isDisabledForm={isDisabledForm}
                onChange={(time, date) => field.onChange({ time, date })}
              />
            )}
          />
        </fieldset>
        <fieldset className="booking-form__date-section">
          <legend className="booking-form__date-title">Завтра</legend>
          <Controller
            control={control}
            name='time'
            rules={
              { required: 'Required booking time' }
            }
            render={({ field }) => (
              <BookingTimeList
                date={'tomorrow'}
                timeList={tomorrow}
                isDisabledForm={isDisabledForm}
                onChange={(time, date) => field.onChange({ time, date })}
              />
            )}
          />
          {errors.time && <p role="alert" style={{ color: 'red' }}>{errors.time?.message}</p>}
        </fieldset>
      </fieldset>
      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Контактная информация</legend>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="name">Ваше имя</label>
          <input
            type="text"
            id="name"
            placeholder="Имя"
            disabled={isDisabledForm}
            {...register('contactPerson', {
              required: 'This field is required',
              pattern: {
                value: /^[А-Яа-яЁёA-Za-z'\- ]{1,}$/i,
                message: 'Invalid name'
              }
            })}
            onChange={(evt) => setFormData((state) => ({ ...state, contactPerson: evt.target.value }))}
          />
          {errors.contactPerson && <p role="alert" style={{ color: 'red' }}>{errors.contactPerson?.message}</p>}
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
          <input
            type="tel"
            id="tel"
            placeholder="Телефон"
            disabled={isDisabledForm}
            {...register('phone', {
              required: 'This field is required',
              pattern: {
                value: /^(\+7)[\s]\([0-9]{3}\)[\s][0-9]{3}[-][0-9]{2}[-][0-9]{2}$/,
                message: 'Invalid phone number. Number format must be +7 (000) 000-00-00'
              }
            })}
            onChange={(evt) => setFormData((state) => ({ ...state, phone: evt.target.value }))}
          />
          {errors.phone && <p role="alert" style={{ color: 'red' }}>{errors.phone?.message}</p>}
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="person">Количество участников</label>
          <input
            type="number"
            id="person"
            placeholder="Количество участников"
            disabled={isDisabledForm}
            {...register('peopleCount', {
              required: 'This field is required',
              min: {
                value: peopleMinMax ? peopleMinMax[0] : 0,
                message: `Minimum amount of people is ${peopleMinMax ? peopleMinMax[0] : 'undefined'}`
              },
              max: {
                value: peopleMinMax ? peopleMinMax[1] : 0,
                message: `Maximum amount of people is ${peopleMinMax ? peopleMinMax[1] : 'undefined'}`
              }
            })}
            onChange={(evt) => setFormData((state) => ({ ...state, peopleCount: +evt.target.value }))}
          />
          {errors.peopleCount && <p role="alert" style={{ color: 'red' }}>{errors.peopleCount?.message}</p>}
        </div>
        <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
          <input
            type="checkbox"
            id="children"
            name="children"
            disabled={isDisabledForm}
            onChange={(evt) => setFormData((state) => ({ ...state, withChildren: Boolean(evt.target.value) }))}
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
        <input
          type="checkbox"
          id="id-order-agreement"
          disabled={isDisabledForm}
          {...register('userAgreement', {
            required: 'This field is required',
          })}
        />
        <span className="custom-checkbox__icon">
          <svg width="20" height="17" aria-hidden="true">
            <use xlinkHref="#icon-tick"></use>
          </svg>
        </span>
        <span className="custom-checkbox__label">Я&nbsp;согласен с
          <a className="link link--active-silver link--underlined" href="#"> правилами обработки персональных данных</a>&nbsp;и пользовательским соглашением
        </span>
      </label>
      {errors.userAgreement && <><br /><p role="alert" style={{ margin: 'auto', color: 'red' }}>{errors.userAgreement?.message}</p></>}
    </form >
  );
}

export default BookingForm;

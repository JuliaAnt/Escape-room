import { useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { AuthData } from '../../types/auth-data';
import { loginAction } from '../../store/actions/api-actions';
import { AppRoute } from '../../consts';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

type ValidationData = {
  login: string;
  password: string;
  userAgreement: string;
}

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isDisabledForm, setDisabled] = useState<boolean>(false);

  const onSubmit = (authData: AuthData) => {
    setDisabled(true);
    dispatch(loginAction(authData)).then(() => {
      navigate(AppRoute.Main);
    });
    setDisabled(false);
  };

  const { register, handleSubmit, formState: { errors } } = useForm<ValidationData>();

  const submitHandler: SubmitHandler<ValidationData> = (data: ValidationData) => {
    onSubmit(data);
  };

  return (
    <>
      <Logo currentPage={null} />
      <main className="decorated-page login">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp" srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x" />
            <img src="img/content/maniac/maniac-size-m.jpg" srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x" width="1366" height="768" alt="" />
          </picture>
        </div>
        <div className="container container--size-l">
          <div className="login__form">
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form className="login-form" onSubmit={handleSubmit(submitHandler)}>
              <div className="login-form__inner-wrapper">
                <h1 className="title title--size-s login-form__title">Вход</h1>
                <div className="login-form__inputs">
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="email">E&nbsp;&ndash;&nbsp;mail</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Адрес электронной почты"
                      disabled={isDisabledForm}
                      {...register('login', {
                        required: 'This field is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                    />
                    {errors.login && <p role="alert" style={{ color: 'red' }}>{errors.login?.message}</p>}
                  </div>
                  <div className="custom-input login-form__input">
                    <label className="custom-input__label" htmlFor="password">Пароль</label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Пароль"
                      disabled={isDisabledForm}
                      {...register('password', {
                        required: 'This field is required',
                        pattern: {
                          value: /^(?=.*\d)(?=.*[a-zA-Z]).{3,}$/,
                          message: 'Invalid password. Password must be longer than or equal to 3 characters, at least one letter and one number'
                        }
                      })}
                    />
                    {errors.password && <p role="alert" style={{ color: 'red' }}>{errors.password?.message}</p>}
                  </div>
                </div>
                <button className="btn btn--accent btn--general login-form__submit" type="submit">Войти</button>
              </div>
              <label className="custom-checkbox login-form__checkbox">
                <input
                  type="checkbox"
                  id="id-order-agreement"
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
              {errors.userAgreement && <><br /><p role="alert" style={{ textAlign: 'center', color: 'red' }}>{errors.userAgreement?.message}</p></>}
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default LoginPage;

import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getAuthorizationStatus } from '../../store/user-process/user-process-selectors';
import { AppRoute, AuthorizationStatus, PAGES_LIST } from '../../consts';
import { logoutAction } from '../../store/actions/api-actions';

type LogoProps = {
  currentPage: string | null;
}

function Logo({ currentPage }: LogoProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.NoAuth) {
    return (
      <header className="header">
        <div className="container container--size-l">
          <a className="logo header__logo" href={AppRoute.Main} aria-label="Перейти на Главную">
            <svg width="134" height="52" aria-hidden="true">
              <use xlinkHref="#logo"></use>
            </svg>
          </a>
          <nav className="main-nav header__main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <Link className={`link${currentPage === PAGES_LIST.mainPage ? ' active' : ''}`} to={AppRoute.Main}>Квесты</Link>
              </li>
              <li className="main-nav__item">
                <Link className={`link${currentPage === PAGES_LIST.contacts ? ' active' : ''}`} to={AppRoute.Contact}>Контакты</Link>
              </li>
            </ul>
          </nav>
          <div className="header__side-nav">
            <Link className="btn header__side-item header__login-btn" to={AppRoute.Login}>Вход</Link>
            <a className="link header__side-item header__phone-link" href="tel:88003335599">8 (000) 111-11-11</a>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="container container--size-l">
        <a className="logo header__logo" href={AppRoute.Main} aria-label="Перейти на Главную">
          <svg width="134" height="52" aria-hidden="true">
            <use xlinkHref="#logo"></use>
          </svg>
        </a>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className={`link${currentPage === PAGES_LIST.mainPage ? ' active' : ''}`} to={AppRoute.Main}>Квесты</Link>
            </li>
            <li className="main-nav__item">
              <Link className={`link${currentPage === PAGES_LIST.contacts ? ' active' : ''}`} to={AppRoute.Contact}>Контакты</Link>
            </li>
            <li className="main-nav__item">
              <Link className={`link${currentPage === PAGES_LIST.myQuestsPage ? ' active' : ''}`} to={AppRoute.MyQuests}>Мои бронирования</Link>
            </li>
          </ul>
        </nav>
        <div className="header__side-nav">
          <Link className="btn btn--accent header__side-item"
            to={AppRoute.Main}
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(logoutAction());
            }}
          >Выйти
          </Link>
          <a className="link header__side-item header__phone-link" href="tel:88003335599">8 (000) 111-11-11</a>
        </div>
      </div>
    </header>
  );
}

export default Logo;

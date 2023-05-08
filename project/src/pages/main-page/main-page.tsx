import { useEffect } from 'react';
import LevelFilterList from '../../components/level-filter-list/level-filter-list';
import Logo from '../../components/logo/logo';
import GenreFilterList from '../../components/genre-filter-list/genre-filter-list';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getQuests } from '../../store/selectors';
import { fetchQuestsAction } from '../../store/api-actions';
import QuestCardGrid from '../../components/quest-card-grid/quest-card-grid';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const questCards = useAppSelector(getQuests);

  useEffect(() => {
    dispatch(fetchQuestsAction());
  }, [dispatch]);

  return (
    <>
      <Logo />
      <main className="page-content">
        <div className="container">
          <div className="page-content__title-wrapper">
            <h1 className="subtitle page-content__subtitle">квесты в Санкт-Петербурге
            </h1>
            <h2 className="title title--size-m page-content__title">Выберите тематику</h2>
          </div>
          <div className="page-content__item">
            <form className="filter" action="#" method="get">
              <fieldset className="filter__section">
                <legend className="visually-hidden">Тематика</legend>
                <GenreFilterList />
              </fieldset>
              <fieldset className="filter__section">
                <legend className="visually-hidden">Сложность</legend>
                <LevelFilterList />
              </fieldset>
            </form>
          </div>
          <h2 className="title visually-hidden">Выберите квест</h2>
          <QuestCardGrid questCards={questCards} />
        </div>
      </main>
      <footer className="footer">
        <div className="container container--size-l">
          <div className="socials">
            <ul className="socials__list">
              <li className="socials__item">
                <a className="socials__link" href="#" aria-label="Skype" target="_blank" rel="nofollow noopener noreferrer">
                  <svg className="socials__icon socials__icon--default" width="28" height="28" aria-hidden="true">
                    <use xlinkHref="#icon-skype-default"></use>
                  </svg>
                  <svg className="socials__icon socials__icon--interactive" width="28" height="28" aria-hidden="true">
                    <use xlinkHref="#icon-skype-interactive"></use>
                  </svg>
                </a>
              </li>
              <li className="socials__item">
                <a className="socials__link" href="#" aria-label="ВКонтакте" target="_blank" rel="nofollow noopener noreferrer">
                  <svg className="socials__icon socials__icon--default" width="28" height="28" aria-hidden="true">
                    <use xlinkHref="#icon-vk-default"></use>
                  </svg>
                  <svg className="socials__icon socials__icon--interactive" width="28" height="28" aria-hidden="true">
                    <use xlinkHref="#icon-vk-interactive"></use>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default MainPage;

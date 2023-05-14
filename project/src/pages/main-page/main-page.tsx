import { useEffect } from 'react';
import LevelFilterList from '../../components/level-filter-list/level-filter-list';
import Logo from '../../components/logo/logo';
import GenreFilterList from '../../components/genre-filter-list/genre-filter-list';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getErrorStatus, getFilteredQuestCards } from '../../store/quests-data/quests-data-selectors';
import { fetchQuestsAction } from '../../store/actions/api-actions';
import QuestCardGrid from '../../components/quest-card-grid/quest-card-grid';
import Footer from '../../components/footer/footer';
import { PAGES_LIST } from '../../consts';
import EmptyMainPage from '../empty-main-page/empty-main-page';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const questCards = useAppSelector(getFilteredQuestCards);
  const hasError = useAppSelector(getErrorStatus);

  useEffect(() => {
    dispatch(fetchQuestsAction());
  }, [dispatch]);

  if (hasError) {
    return (
      <EmptyMainPage />
    );
  }

  return (
    <>
      <Logo currentPage={PAGES_LIST.mainPage} />
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
          <QuestCardGrid questCards={questCards} isVisible={false} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default MainPage;

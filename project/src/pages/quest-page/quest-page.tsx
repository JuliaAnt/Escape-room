import { Link, useParams } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { GENRE_FILTERS, LEVEL_FILTERS } from '../../consts';
import { useEffect } from 'react';
import { store } from '../../store/index';
import { fetchSelectedQuestAction } from '../../store/api-actions';
import { getSelectedQuest } from '../../store/selectors';
import { useAppSelector } from '../../hooks/redux-hooks';
import Footer from '../../components/footer/footer';

function QuestPage(): JSX.Element {
  const { id: questId } = useParams<{ id: string }>();

  useEffect(() => {
    if (questId) {
      store.dispatch(fetchSelectedQuestAction(questId));
    }
  }, [questId]);

  const quest = useAppSelector(getSelectedQuest);
  const { title, type, previewImg, previewImgWebp, level, description, peopleMinMax, coverImg, coverImgWebp } = quest || {};
  const currentLevel = LEVEL_FILTERS.find((levelToFind) => levelToFind.type === level);
  const currentGenre = GENRE_FILTERS.find((genreToFind) => genreToFind.type === type);

  return (
    <>
      <Logo />
      <main className="decorated-page quest-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp" srcSet={`${previewImgWebp || ''}, ${coverImgWebp || ''} 2x`} />
            <img src={previewImg} srcSet={`${coverImg || ''} 2x`} width="1366" height="768" alt="" />
          </picture>
        </div>
        <div className="container container--size-l">
          <div className="quest-page__content">
            <h1 className="title title--size-l title--uppercase quest-page__title">{title}</h1>
            <p className="subtitle quest-page__subtitle"><span className="visually-hidden">Жанр:</span>{currentGenre?.text}
            </p>
            <ul className="tags tags--size-l quest-page__tags">
              <li className="tags__item">
                <svg width="11" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-person"></use>
                </svg>{peopleMinMax ? `${peopleMinMax[0]}-${peopleMinMax[1]} чел` : ''}
              </li>
              <li className="tags__item">
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-level"></use>
                </svg>{currentLevel?.text}
              </li>
            </ul>
            <p className="quest-page__description">{description}</p>
            <Link className="btn btn--accent btn--cta quest-page__btn" to={questId ? `/quest/${questId}/booking` : ''}>Забронировать</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default QuestPage;
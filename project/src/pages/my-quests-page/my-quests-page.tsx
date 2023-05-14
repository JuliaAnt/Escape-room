import { useEffect } from 'react';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import QuestCardGrid from '../../components/quest-card-grid/quest-card-grid';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { fetchBookedQuestsAction } from '../../store/actions/api-actions';
import { getBookedQuests } from '../../store/booking-process/booking-process-selectors';
import { QuestCardType } from '../../types/quest-card';
import { PAGES_LIST } from '../../consts';

function MyQuestsPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchBookedQuestsAction());
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const bookedQuests = useAppSelector(getBookedQuests);

  const bookedRenderedQuests: QuestCardType[] = [];
  bookedQuests.map((bookedQuest) => {
    bookedRenderedQuests.push({
      time: bookedQuest.time,
      date: bookedQuest.date,
      address: bookedQuest.location.address,
      peopleCount: bookedQuest.peopleCount,
      bookedQuestId: bookedQuest.id,
      ...bookedQuest.quest,
    });
    return bookedRenderedQuests;
  });

  return (
    <>
      <Logo currentPage={PAGES_LIST.myQuestsPage} />
      <main className="page-content decorated-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp" srcSet="img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x" />
            <img src="img/content/maniac/maniac-bg-size-m.jpg" srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x" width="1366" height="1959" alt="" />
          </picture>
        </div>
        <div className="container">
          <div className="page-content__title-wrapper">
            <h1 className="title title--size-m page-content__title">Мои бронирования</h1>
          </div>
          <QuestCardGrid questCards={bookedRenderedQuests} isVisible />
        </div>
      </main >
      <Footer />
    </>
  );
}

export default MyQuestsPage;

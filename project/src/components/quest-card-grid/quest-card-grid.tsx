import { QuestCardType } from '../../types/quest-card';
import QuestCard from '../quest-card/quest-card';

type QuestCardGridProps = {
  questCards: QuestCardType[];
}

function QuestCardGrid({ questCards }: QuestCardGridProps): JSX.Element {
  return (
    <div className="cards-grid">
      {questCards.map((questCard) => <QuestCard key={questCard.id} questCard={questCard} />)}
    </div>
  );

}

export default QuestCardGrid;

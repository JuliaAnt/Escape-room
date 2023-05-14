import { QuestCardType } from '../../types/quest-card';
import QuestCard from '../quest-card/quest-card';

type QuestCardGridProps = {
  questCards: QuestCardType[];
  isVisible: boolean;
}

function QuestCardGrid({ questCards, isVisible }: QuestCardGridProps): JSX.Element {
  return (
    <div className="cards-grid">
      {questCards.map((questCard) => <QuestCard key={questCard.id} questCard={questCard} isVisible={isVisible} />)}
    </div>
  );

}

export default QuestCardGrid;

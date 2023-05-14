export type QuestCardType = {
  id: string;
  title: string;
  type: string;
  previewImg: string;
  previewImgWebp: string;
  peopleMinMax: [number, number];
  level: string;
  time: string | null;
  date: string | null;
  address: string | null;
  peopleCount: number | null;
  bookedQuestId: string | null;
}

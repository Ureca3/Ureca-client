import { RecommendCardList } from '@/components/counseling-recommend/recommend-cardlist/RecommendCardList';
import { TitleCard } from '@/components/counseling-recommend/titlecard/TitleCard';

const page = () => {
  return (
    <div className="mx-7.5 my-4">
      <TitleCard title="5G 요금제 변경 상담" />
      <RecommendCardList />
    </div>
  );
};

export default page;

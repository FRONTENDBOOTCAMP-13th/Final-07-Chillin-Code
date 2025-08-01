import MobileRecentProducts from '@/app/recentPage/mobile/product';

const sampleProducts = [
  {
    id: 1,
    name: '[마녀배달부 키키] 마그넷',
    price: 9000,
    image: '/images/products/kiki/kiki-magnet.svg',
    category: '마녀배달부 키키',
    viewedAt: new Date('2025-01-25T10:30:00'),
    likes: 0,
    comments: 0,
  },
  {
    id: 2,
    name: '[이웃집 토토로] 소토토로 미니피규어',
    price: 46000,
    image: '/images/products/totoro/totoro-mini-figure.svg',
    category: '이웃집 토토로',
    viewedAt: new Date('2025-01-23T09:15:00'),
    likes: 0,
    comments: 0,
  },
  {
    id: 3,
    name: '[하울의 움직이는 성] 라이트업 디오라마',
    price: 308000,
    image: '/images/products/howl/howl-diorama.svg',
    category: '하울의 움직이는 성',
    viewedAt: new Date('2025-01-22T14:20:00'),
    likes: 0,
    comments: 0,
  },
  {
    id: 4,
    name: '[하울의 움직이는 성] 라이트업 디오라마',
    price: 308000,
    image: '/images/products/howl/howl-diorama.svg',
    category: '하울의 움직이는 성',
    viewedAt: new Date('2025-01-22T14:20:00'),
    likes: 0,
    comments: 0,
  },
  {
    id: 5,
    name: '[하울의 움직이는 성] 5라이트업 디오라마',
    price: 308000,
    image: '/images/products/howl/howl-diorama.svg',
    category: '하울의 움직이는 성',
    viewedAt: new Date('2025-01-22T14:20:00'),
    likes: 0,
    comments: 0,
  },
  {
    id: 6,
    name: '[하울의 움직이는 성] 6라이트업 디오라마',
    price: 308000,
    image: '/images/products/howl/howl-diorama.svg',
    category: '하울의 움직이는 성',
    viewedAt: new Date('2025-01-24T14:20:00'),
    likes: 0,
    comments: 0,
  },
  {
    id: 7,
    name: '[하울의 움직이는 성] 7라이트업 디오라마',
    price: 308000,
    image: '/images/products/howl/howl-diorama.svg',
    category: '하울의 움직이는 성',
    viewedAt: new Date('2025-01-19T14:20:00'),
    likes: 0,
    comments: 0,
  },
];

export default function Page() {
  const sortedProducts = [...sampleProducts].sort(
    (a, b) => b.viewedAt.getTime() - a.viewedAt.getTime(),
  );

  return <MobileRecentProducts initialProducts={sortedProducts.slice(0, 5)} />;
}

import { productDetailFetch } from '@/app/fetch/product';
import { Product } from '@/app/types/productType';
import MobileProductDetailContent from '@/app/products/[id]/mobileDetailContent';
import WebProductDetailContent from '@/app/products/[id]/webDetailContent';

type Props = Promise<{ id: string }>;

// 프로미스 타입으로 지정을 해줘야함

export default async function ProductDetailPage({ params }: { params: Props }) {
  const { id } = await params;
  const res = await productDetailFetch(id);

  // 프로미스 객체에 있는 id가 string이다

  let product: Product | null = null; // 블록 밖에서 선언

  if (res.ok === 1) {
    product = res.item;
  } else {
    console.error(res.message);
  }

  if (!product) {
    return <div>상품을 불러올 수 없습니다.</div>;
  }

  return (
    <>
      <MobileProductDetailContent product={product} />

      <WebProductDetailContent product={product} />
    </>
  );
}

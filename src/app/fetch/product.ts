import { ApiRes, ApiResPromise } from '../types/apiType';
import { Product } from '../types/productType';

// 페이지 네이션 되는 버전
export async function productFetch(): ApiResPromise<Product[]> {
  const server = process.env.NEXT_PUBLIC_BASE_URL;
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const url = `${server}/products`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'client-Id': clientId as string,
    },
  });
  const resJson: ApiRes<Product[]> = await res.json();
  console.log('API 응답:', resJson); // 응답 내용 확인
  return resJson;
}

// **상품 상세 조회
export async function productDetailFetch(id: string): ApiResPromise<Product> {
  const server = process.env.NEXT_PUBLIC_BASE_URL;
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const url = `${server}/products/${id}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'client-Id': clientId as string,
    },
  });
  const resJson: ApiRes<Product> = await res.json();
  console.log('상세 API 응답:', resJson);
  return resJson;
}

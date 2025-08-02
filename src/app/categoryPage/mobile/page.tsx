import CategoryClient from '@/app/categoryPage/mobile/categoryClient';
import { productFetch } from '@/app/fetch/product';
import { Product } from '@/app/types/productType';

export default async function CategoryPage() {
  let products: Product[] = [];
  let categories: string[] = [];
  let movies: string[] = [];
  let error: string | null = null;

  try {
    const data = await productFetch();

    if (data.ok === 0) {
      throw new Error(data.message || '상품 조회 실패');
    }

    products = data.item || [];

    // 카테고리 추출 (중복 제거)
    const allCategories = products
      .flatMap((product: Product) => product.extra?.category || [])
      .filter((category): category is string => !!category);
    categories = [...new Set(allCategories)];

    // 영화 추출 (중복 제거)
    const allMovies = products
      .map((product: Product) => product.extra?.movie)
      .filter((movie): movie is string => !!movie);
    movies = [...new Set(allMovies)];
  } catch (err) {
    console.error('Error:', err);
    error = err instanceof Error ? err.message : '알 수 없는 오류';
  }

  if (error) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <p>오류가 발생했습니다: {error}</p>
      </div>
    );
  }

  return <CategoryClient initialProducts={products} categories={categories} movies={movies} />;
}

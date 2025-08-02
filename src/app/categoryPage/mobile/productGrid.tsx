import ProductCard from './productCard';
import styles from '@/styles/categoryPage/mobile/categoryProductGrid.module.css';
import { Product } from '@/app/types/productType';

interface ProductGridProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  viewMode: 'grid' | 'list';
}

export default function ProductGrid({
  products,
  currentPage,
  totalPages,
  onPageChange,
  viewMode,
}: ProductGridProps) {
  // 페이지네이션 버튼 생성
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    // 이전 버튼
    if (currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          className={styles.page_btn}
          onClick={() => onPageChange(currentPage - 1)}
        >
          이전
        </button>,
      );
    }

    // 페이지 번호 버튼들
    const startPage = Math.max(1, Math.min(totalPages - maxVisiblePages + 1, currentPage - 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`${styles.page_number} ${currentPage === i ? styles.active : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>,
      );
    }

    // 다음 버튼
    if (currentPage < totalPages) {
      buttons.push(
        <button
          key="next"
          className={styles.page_btn}
          onClick={() => onPageChange(currentPage + 1)}
        >
          다음
        </button>,
      );
    }

    return buttons;
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.product_list} ${viewMode === 'grid' ? styles.grid_view : styles.list_view}`}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} viewMode={viewMode} />
          ))
        ) : (
          <div className={styles.no_products}>
            <p>조건에 맞는 상품이 없습니다.</p>
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && <div className={styles.pagination}>{renderPaginationButtons()}</div>}
    </div>
  );
}

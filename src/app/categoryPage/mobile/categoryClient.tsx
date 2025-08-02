'use client';

import { useState, useEffect } from 'react';
import CategoryHeader from '@/app/categoryPage/mobile/header';
import ProductGrid from '@/app/categoryPage/mobile/productGrid';
import FilterModal from '@/app/categoryPage/mobile/filterModal';
import { Product } from '@/app/types/productType';
import styles from '@/styles/categoryPage/mobile/categoryPage.module.css';

interface CategoryClientProps {
  initialProducts: Product[];
  categories: string[];
  movies: string[];
}

export default function CategoryClient({
  initialProducts,
  categories,
  movies,
}: CategoryClientProps) {
  const [products] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);

  // 필터 상태
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [selectedMovie, setSelectedMovie] = useState<string>('전체');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(999900);
  const [sortBy, setSortBy] = useState<string>('신상품순');
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);

  // 뷰 모드 (그리드/리스트)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // 필터 모달
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // 필터링 로직
  useEffect(() => {
    let filtered = [...products];

    // 카테고리 필터
    if (selectedCategory !== '전체') {
      filtered = filtered.filter((product) => product.extra?.category?.includes(selectedCategory));
    }

    // 영화 필터
    if (selectedMovie !== '전체') {
      filtered = filtered.filter((product) => product.extra?.movie === selectedMovie);
    }

    // 가격 필터
    filtered = filtered.filter((product) => product.price >= minPrice && product.price <= maxPrice);

    // 정렬
    switch (sortBy) {
      case '신상품순':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case '인기순':
        filtered.sort((a, b) => (b.extra?.likes || 0) - (a.extra?.likes || 0));
        break;
      case '낮은가격순':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case '높은가격순':
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로
  }, [products, selectedCategory, selectedMovie, minPrice, maxPrice, sortBy]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // 필터 모달 열기
  const handleFilterOpen = () => {
    setIsFilterModalOpen(true);
  };

  // 필터 모달 닫기
  const handleFilterClose = () => {
    setIsFilterModalOpen(false);
  };

  // 필터 적용
  const handleFilterApply = (filters: {
    category: string;
    movie: string;
    minPrice: number;
    maxPrice: number;
  }) => {
    setSelectedCategory(filters.category);
    setSelectedMovie(filters.movie);
    setMinPrice(filters.minPrice);
    setMaxPrice(filters.maxPrice);
    setIsFilterModalOpen(false);
  };

  // 필터 초기화
  const handleFilterReset = () => {
    setSelectedCategory('전체');
    setSelectedMovie('전체');
    setMinPrice(0);
    setMaxPrice(999900);
  };

  return (
    <div className={styles.container}>
      <CategoryHeader
        sortBy={sortBy}
        setSortBy={setSortBy}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        onFilterClick={handleFilterOpen}
        totalProducts={filteredProducts.length}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <ProductGrid
        products={currentProducts}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        viewMode={viewMode}
      />

      {isFilterModalOpen && (
        <FilterModal
          categories={categories}
          movies={movies}
          selectedCategory={selectedCategory}
          selectedMovie={selectedMovie}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onClose={handleFilterClose}
          onApply={handleFilterApply}
          onReset={handleFilterReset}
        />
      )}
    </div>
  );
}

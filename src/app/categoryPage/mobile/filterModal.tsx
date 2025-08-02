'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/categoryPage/mobile/categoryFiterModal.module.css';

interface FilterModalProps {
  categories: string[];
  movies: string[];
  selectedCategory: string;
  selectedMovie: string;
  minPrice: number;
  maxPrice: number;
  onClose: () => void;
  onApply: (filters: {
    category: string;
    movie: string;
    minPrice: number;
    maxPrice: number;
  }) => void;
  onReset: () => void;
}

const priceRanges = [
  { label: '~3만원', min: 0, max: 30000 },
  { label: '3만원~5만원', min: 30000, max: 50000 },
  { label: '5만원~10만원', min: 50000, max: 100000 },
  { label: '10만원~30만원', min: 100000, max: 300000 },
  { label: '30만원~', min: 300000, max: 999900 },
];

export default function FilterModal({
  categories,
  movies,
  selectedCategory,
  selectedMovie,
  minPrice,
  maxPrice,
  onClose,
  onApply,
  onReset,
}: FilterModalProps) {
  const [tempCategory, setTempCategory] = useState(selectedCategory);
  const [tempMovie, setTempMovie] = useState(selectedMovie);
  const [tempMinPrice, setTempMinPrice] = useState(minPrice);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // 모달 애니메이션을 위한 효과
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);

    // ESC 키로 모달 닫기
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.body.style.overflow = 'hidden'; // 배경 스크롤 방지

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, []);

  // 가격 범위 선택
  const handlePriceRangeSelect = (range: (typeof priceRanges)[0]) => {
    setTempMinPrice(range.min);
    setTempMaxPrice(range.max);
    setSelectedPriceRange(range.label);
  };

  // 모달 닫기 (애니메이션 포함)
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // 애니메이션 완료 후 실제 닫기
  };

  // 필터 적용
  const handleApply = () => {
    onApply({
      category: tempCategory,
      movie: tempMovie,
      minPrice: tempMinPrice,
      maxPrice: tempMaxPrice,
    });
  };

  // 필터 초기화
  const handleReset = () => {
    setTempCategory('전체');
    setTempMovie('전체');
    setTempMinPrice(0);
    setTempMaxPrice(999900);
    setSelectedPriceRange('');
    onReset();
  };

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className={`${styles.overlay} ${isVisible ? styles.visible : ''}`}
        onClick={handleClose}
      />

      {/* 모달 컨텐츠 */}
      <div className={`${styles.modal} ${isVisible ? styles.visible : ''}`}>
        {/* 모달 헤더 */}
        <div className={styles.modal_header}>
          <h2 className={styles.modal_title}>필터</h2>
          <button className={styles.close_button} onClick={handleClose}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* 모달 바디 */}
        <div className={styles.modal_body}>
          {/* 카테고리 섹션 */}
          <div className={styles.filter_section}>
            <h3 className={styles.section_title}>카테고리</h3>
            <div className={styles.category_grid}>
              <button
                className={`${styles.category_button} ${tempCategory === '전체' ? styles.active : ''}`}
                onClick={() => setTempCategory('전체')}
              >
                전체
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`${styles.category_button} ${tempCategory === category ? styles.active : ''}`}
                  onClick={() => setTempCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* 영화 섹션 */}
          <div className={styles.filter_section}>
            <h3 className={styles.section_title}>영화</h3>
            <div className={styles.movie_grid}>
              <button
                className={`${styles.movie_button} ${tempMovie === '전체' ? styles.active : ''}`}
                onClick={() => setTempMovie('전체')}
              >
                전체
              </button>
              {movies.map((movie) => (
                <button
                  key={movie}
                  className={`${styles.movie_button} ${tempMovie === movie ? styles.active : ''}`}
                  onClick={() => setTempMovie(movie)}
                >
                  {movie}
                </button>
              ))}
            </div>
          </div>

          {/* 가격 섹션 */}
          <div className={styles.filter_section}>
            <h3 className={styles.section_title}>가격</h3>

            {/* 가격 범위 버튼들 */}
            <div className={styles.price_buttons}>
              {priceRanges.map((range) => (
                <button
                  key={range.label}
                  className={`${styles.price_button} ${selectedPriceRange === range.label ? styles.active : ''}`}
                  onClick={() => handlePriceRangeSelect(range)}
                >
                  {range.label}
                </button>
              ))}
            </div>

            {/* 가격 슬라이더 */}
            <div className={styles.price_slider_container}>
              <div className={styles.price_inputs}>
                <input
                  type="number"
                  placeholder="최소 가격"
                  value={tempMinPrice}
                  onChange={(e) => setTempMinPrice(Number(e.target.value))}
                  className={styles.price_input}
                  min="0"
                  max="999900"
                />
                <span className={styles.price_separator}>~</span>
                <input
                  type="number"
                  placeholder="최대 가격"
                  value={tempMaxPrice}
                  onChange={(e) => setTempMaxPrice(Number(e.target.value))}
                  className={styles.price_input}
                  min="0"
                  max="999900"
                />
              </div>

              <div className={styles.price_sliders}>
                <input
                  type="range"
                  min={0}
                  max={999900}
                  step={1000}
                  value={tempMinPrice}
                  onChange={(e) => setTempMinPrice(Number(e.target.value))}
                  className={styles.range_slider}
                />
                <input
                  type="range"
                  min={0}
                  max={999900}
                  step={1000}
                  value={tempMaxPrice}
                  onChange={(e) => setTempMaxPrice(Number(e.target.value))}
                  className={styles.range_slider}
                />
              </div>

              <div className={styles.price_display}>
                {tempMinPrice.toLocaleString()}원 ~ {tempMaxPrice.toLocaleString()}원
              </div>
            </div>
          </div>
        </div>

        {/* 모달 푸터 */}
        <div className={styles.modal_footer}>
          <button className={styles.reset_button} onClick={handleReset}>
            초기화
          </button>
          <button className={styles.apply_button} onClick={handleApply}>
            적용하기
          </button>
        </div>
      </div>
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/categoryPage/web/categoryPage.module.css';
import { productFetch } from '@/app/fetch/product';
import { Product } from '@/app/types/productType';
import Link from 'next/link';

import { addRecentProduct } from '@/utils/recentProduct';

import Image from 'next/image';

interface Filter {
  name: string;
  emptyIcon: string;
  filledIcon: string;
}

const filters: Filter[] = [
  { name: '전체', emptyIcon: '/icons/all-empty.svg', filledIcon: '/icons/all-filled.svg' },
];

const priceRanges = [
  { label: '~3만원', min: 0, max: 30000 },
  { label: '3만원~5만원', min: 30000, max: 50000 },
  { label: '5만원~10만원', min: 50000, max: 100000 },
  { label: '10만원~30만원', min: 100000, max: 300000 },
  { label: '30만원~', min: 300000, max: Infinity },
];

export default function CategoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 필터 상태
  const [activeFilter, setActiveFilter] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [selectedMovie, setSelectedMovie] = useState<string>('전체');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(999900);
  const [sortBy, setSortBy] = useState<string>('신상품순');
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);

  // 동적 카테고리 및 영화 목록
  const [categories, setCategories] = useState<string[]>([]);
  const [movies, setMovies] = useState<string[]>([]);

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);

  // 신상품/베스트 탭
  const [highlightTab, setHighlightTab] = useState('신상품');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await productFetch();

        if (data.ok === 0) {
          throw new Error(data.message || '상품 조회 실패');
        }

        const fetchedProducts = data.item || [];
        setProducts(fetchedProducts);

        // 카테고리 추출 (중복 제거)
        const allCategories = fetchedProducts
          .flatMap((product: Product) => product.extra?.category || [])
          .filter((category): category is string => !!category);
        const uniqueCategories = [...new Set(allCategories)];
        setCategories(uniqueCategories);

        // 영화 추출 (중복 제거)
        const allMovies = fetchedProducts
          .map((product: Product) => product.extra?.movie)
          .filter((movie): movie is string => !!movie);
        const uniqueMovies = [...new Set(allMovies)];
        setMovies(uniqueMovies);
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : '알 수 없는 오류');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 하이라이트 박스 스크롤 이벤트 처리
  useEffect(() => {
    const scroll_container = document.querySelector(`.${styles.highlight_products}`) as HTMLElement;

    if (!scroll_container) return;

    const handle_wheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const scroll_amount = e.deltaY * 0.8;
      scroll_container.scrollLeft += scroll_amount;
    };

    const handle_touch_start = (e: TouchEvent) => {
      const container = e.currentTarget as HTMLElement;
      container.dataset.touch_start_x = e.touches[0].clientX.toString();
      container.dataset.scroll_left = container.scrollLeft.toString();
    };

    const handle_touch_move = (e: TouchEvent) => {
      const container = e.currentTarget as HTMLElement;
      if (!container.dataset.touch_start_x) return;

      const touch_x = e.touches[0].clientX;
      const start_x = parseFloat(container.dataset.touch_start_x || '0');
      const scroll_left = parseFloat(container.dataset.scroll_left || '0');

      container.scrollLeft = scroll_left - (touch_x - start_x);
    };

    const handle_mouse_down = (e: MouseEvent) => {
      const container = e.currentTarget as HTMLElement;
      if ((e.target as HTMLElement).closest(`.${styles.highlight_card}`)) {
        return;
      }

      let is_down = true;
      const start_x = e.pageX - container.offsetLeft;
      const scroll_left = container.scrollLeft;
      container.style.cursor = 'grabbing';

      const handle_mouse_move = (e: MouseEvent) => {
        if (!is_down) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - start_x) * 1.5;
        container.scrollLeft = scroll_left - walk;
      };

      const handle_mouse_up = () => {
        is_down = false;
        container.style.cursor = 'grab';
        document.removeEventListener('mousemove', handle_mouse_move);
        document.removeEventListener('mouseup', handle_mouse_up);
      };

      document.addEventListener('mousemove', handle_mouse_move);
      document.addEventListener('mouseup', handle_mouse_up);
    };

    scroll_container.addEventListener('wheel', handle_wheel, { passive: false });
    scroll_container.addEventListener('mousedown', handle_mouse_down);
    scroll_container.addEventListener('touchstart', handle_touch_start, { passive: false });
    scroll_container.addEventListener('touchmove', handle_touch_move, { passive: false });
    scroll_container.style.cursor = 'grab';
    scroll_container.style.userSelect = 'none';

    return () => {
      scroll_container.removeEventListener('wheel', handle_wheel);
      scroll_container.removeEventListener('mousedown', handle_mouse_down);
      scroll_container.removeEventListener('touchstart', handle_touch_start);
      scroll_container.removeEventListener('touchmove', handle_touch_move);
    };
  }, [highlightTab, products]); // highlightTab이나 products가 변경될 때마다 이벤트 재등록

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
  }, [products, selectedCategory, selectedMovie, minPrice, maxPrice, activeFilter, sortBy]);

  // 하이라이트 상품 가져오기
  const getHighlightProducts = () => {
    if (highlightTab === '신상품') {
      return products.filter((product) => product.extra?.isNew).slice(0, 5);
    } else {
      return products.filter((product) => product.extra?.isBest).slice(0, 5);
    }
  };

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // 초기화 함수
  const handleReset = () => {
    setSelectedCategory('전체');
    setSelectedMovie('전체');
    setSelectedPriceRange('');
    setMinPrice(0);
    setMaxPrice(999900);
    setActiveFilter('전체');
    setSortBy('신상품순');
    setCurrentPage(1);
  };

  // 가격 범위 선택
  const handlePriceRangeSelect = (range: (typeof priceRanges)[0]) => {
    setMinPrice(range.min);
    setMaxPrice(range.max === Infinity ? 999900 : range.max);
    setSelectedPriceRange(range.label);
  };

  // 페이지 변경
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    console.log('로딩 중');
  }

  if (error) {
    console.log('에러 발생');
  }

  return (
    <div className={styles.container}>
      {/* 최상단 Breadcrumb 영역 */}
      <div className={styles.top_breadcrumb}>
        <span>HOME</span>
        <span>&gt;</span>
        <span>CATEGORY</span>
        <span>&gt;</span>
        <span>
          <b>{selectedCategory}</b>
        </span>
      </div>

      <div className={styles.main_content}>
        {/* 사이드바 */}
        <div className={styles.sidebar}>
          <div className={styles.category_section}>
            <h3 className={styles.section_title}>카테고리</h3>
            <span
              className={`${styles.section_list_all} ${selectedCategory === '전체' ? styles.active : ''}`}
              onClick={() => setSelectedCategory('전체')}
              style={{ cursor: 'pointer' }}
            >
              <b>전체</b>
            </span>
            <ul className={styles.category_list}>
              {categories.map((category) => (
                <li key={category} className={styles.category_item}>
                  <a
                    href="#"
                    className={`${styles.category_link} ${selectedCategory === category ? styles.active : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedCategory(category);
                    }}
                  >
                    ㆍ{category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.filter_section}>
            <h3 className={styles.section_title}>MOVIE</h3>
            <div className={styles.movie_content}>
              <p
                onClick={() => setSelectedMovie('전체')}
                style={{
                  cursor: 'pointer',
                  fontWeight: selectedMovie === '전체' ? 'bold' : 'normal',
                }}
              >
                ㆍ전체
              </p>
              {movies.map((movie) => (
                <p
                  key={movie}
                  onClick={() => setSelectedMovie(movie)}
                  style={{
                    cursor: 'pointer',
                    fontWeight: selectedMovie === movie ? 'bold' : 'normal',
                  }}
                >
                  ㆍ{movie}
                </p>
              ))}
            </div>
          </div>

          <div className={styles.price_section}>
            <h3 className={styles.section_title}>가격</h3>
            <div className={styles.price_filter}>
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
              <div className={styles.price_slider}>
                <input
                  type="range"
                  min={0}
                  max={999900}
                  step={1000}
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                />
                <input
                  type="range"
                  min={0}
                  max={999900}
                  step={1000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>

              {/* 금액 입력 + 검색 */}
              <div className={styles.price_input_wrapper}>
                <input
                  type="text"
                  placeholder={`${minPrice.toLocaleString()}~${maxPrice.toLocaleString()} 원`}
                  className={styles.price_input}
                  value={`${minPrice.toLocaleString()}~${maxPrice.toLocaleString()} 원`}
                  readOnly
                />
                <button className={styles.search_btn}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.49928 0.890625C7.14387 0.89074 5.80814 1.21499 4.60353 1.83632C3.39893 2.45765 2.36037 3.35804 1.57451 4.46238C0.788656 5.56672 0.278287 6.84297 0.0859852 8.18467C-0.106316 9.52637 0.0250263 10.8946 0.469055 12.1752C0.913084 13.4558 1.65692 14.6117 2.63851 15.5464C3.6201 16.481 4.81098 17.1674 6.11179 17.5482C7.4126 17.929 8.78562 17.9933 10.1163 17.7355C11.447 17.4778 12.6967 16.9056 13.7613 16.0666L17.4133 19.7186C17.6019 19.9008 17.8545 20.0016 18.1167 19.9993C18.3789 19.997 18.6297 19.8919 18.8151 19.7064C19.0005 19.521 19.1057 19.2702 19.108 19.008C19.1102 18.7458 19.0094 18.4932 18.8273 18.3046L15.1753 14.6526C16.1633 13.3992 16.7784 11.893 16.9504 10.3064C17.1223 8.71968 16.8441 7.11665 16.1475 5.68072C15.4509 4.24479 14.3642 3.03398 13.0116 2.18686C11.659 1.33973 10.0952 0.890518 8.49928 0.890625ZM1.99928 9.39062C1.99928 7.66672 2.6841 6.01342 3.90308 4.79443C5.12207 3.57544 6.77537 2.89062 8.49928 2.89062C10.2232 2.89062 11.8765 3.57544 13.0955 4.79443C14.3145 6.01342 14.9993 7.66672 14.9993 9.39062C14.9993 11.1145 14.3145 12.7678 13.0955 13.9868C11.8765 15.2058 10.2232 15.8906 8.49928 15.8906C6.77537 15.8906 5.12207 15.2058 3.90308 13.9868C2.6841 12.7678 1.99928 11.1145 1.99928 9.39062Z"
                      fill="#6B7878"
                    />
                  </svg>
                </button>
              </div>

              {/* 초기화 버튼 */}
              <button className={styles.reset_btn} onClick={handleReset}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.0002 1C12.1232 1.00003 14.1779 1.7506 15.8011 3.11905C17.4243 4.48749 18.5114 6.3857 18.8704 8.47819C19.2294 10.5707 18.8371 12.7227 17.7629 14.5539C16.6886 16.3851 15.0016 17.7776 12.9999 18.4853C10.9983 19.193 8.81093 19.1702 6.82443 18.4211C4.83792 17.672 3.18019 16.2448 2.14422 14.3916C1.10826 12.5385 0.760759 10.3788 1.16315 8.29421C1.56553 6.20964 2.6919 4.33442 4.34316 3"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 2.5H5V6.5"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                초기화
              </button>
            </div>
          </div>
        </div>

        {/* 상품 목록 */}
        <div className={styles.product_area}>
          <div className={styles.highlight_box}>
            <div className={styles.tab_buttons}>
              <button
                className={`${styles.highlight_tab} ${highlightTab === '신상품' ? styles.active : ''}`}
                onClick={() => setHighlightTab('신상품')}
              >
                신상품
              </button>
              <button
                className={`${styles.highlight_tab} ${highlightTab === '베스트' ? styles.active : ''}`}
                onClick={() => setHighlightTab('베스트')}
              >
                베스트
              </button>
            </div>

            <div className={styles.highlight_products}>
              {getHighlightProducts().map((product) => (
                <div
                  key={product._id}
                  className={styles.highlight_card}
                  onClick={() => addRecentProduct(product._id)}
                >
                  <Link href={`/products/${product._id}`}>
                    {product.mainImages?.[0]?.path && (
                      <Image
                        src={`/${product.mainImages[0].path}`}
                        alt={product.name}
                        width={180}
                        height={180}
                      />
                    )}
                    <h4>{product.name}</h4>
                    <p>{product.price?.toLocaleString()}원</p>
                    <p>
                      평점 {product.extra?.rating || 0} / 리뷰 {product.extra?.reviewCount || 0}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* 상단 필터 바 */}
          <div className={styles.product_filter_bar}>
            <div className={styles.filter_left}>
              <span className={styles.filter_count}>
                <b>{filteredProducts.length.toLocaleString()}</b>개의 상품이 있습니다
              </span>
            </div>
            <div className={styles.filter_buttons}>
              {/* 왼쪽: 필터 라디오 버튼들 */}
              <div className={styles.filter_buttons_left}>
                {filters.map((f) => (
                  <button
                    key={f.name}
                    className={`${styles.filter_btn} ${activeFilter === f.name ? styles.active : ''}`}
                    onClick={() => setActiveFilter(f.name)}
                  >
                    {/* 라디오 버튼 */}
                    <div className={styles.radio_check_box_wrapper}>
                      <input
                        type="checkbox"
                        className={styles.check_input}
                        checked={activeFilter === f.name}
                        readOnly
                      />
                      <label className={styles.radio_check_box_label}>
                        <span className={styles.radio_check_box} />
                      </label>
                    </div>
                    {/* 필터 이름 */}
                    {f.name}
                  </button>
                ))}
              </div>

              {/* 오른쪽: 드롭다운 박스들 */}
              <div className={styles.header_center}>
                <select
                  className={styles.sort_select}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="신상품순">신상품순</option>
                  <option value="인기순">인기순</option>
                  <option value="낮은가격순">낮은가격순</option>
                  <option value="높은가격순">높은가격순</option>
                </select>
                <select
                  className={styles.count_select}
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                >
                  <option value={20}>20개씩</option>
                  <option value={40}>40개씩</option>
                  <option value={60}>60개씩</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.product_grid}>
            {currentProducts.map((product) => (
              <div
                key={product._id}
                className={styles.product_card}
                onClick={() => addRecentProduct(product._id)}
              >
                <Link href={`/products/${product._id}`} key={product._id}>
                  <div className={styles.product_image}>
                    {product.mainImages?.[0]?.path && (
                      <Image
                        src={`/${product.mainImages[0].path}`}
                        alt={product.name}
                        width={180}
                        height={180}
                      />
                    )}
                  </div>
                  <h4 className={styles.product_name}>{product.name}</h4>
                  <p className={styles.product_price}>{product.price?.toLocaleString()}원</p>
                  <p className={styles.product_actions}>
                    평점 {product.extra?.rating || 0} /리뷰{product.extra?.reviewCount || 0}
                  </p>
                </Link>
              </div>
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className={styles.pagination}>
            {/* 첫 페이지로 */}
            <button
              className={styles.page_btn}
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              <span>
                <svg
                  width="6"
                  height="12"
                  viewBox="0 0 6 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.22638 0.897971L0.13935 5.93589C0.0500037 6.02438 0 6.14306 0 6.26663C0 6.3902 0.0500037 6.50888 0.13935 6.59737L5.22638 11.6372C5.268 11.6785 5.31776 11.7113 5.37272 11.7336C5.42769 11.756 5.48674 11.7676 5.5464 11.7676C5.60606 11.7676 5.66512 11.756 5.72008 11.7336C5.77505 11.7113 5.82481 11.6785 5.86643 11.6372C5.95206 11.5526 6 11.439 6 11.3207C6 11.2024 5.95206 11.0888 5.86643 11.0041L1.08274 6.26663L5.86643 1.53008C5.95177 1.4455 5.99952 1.3321 5.99952 1.21403C5.99952 1.09595 5.95177 0.98255 5.86643 0.897971C5.82481 0.856705 5.77505 0.823907 5.72008 0.801511C5.66512 0.779116 5.60606 0.767578 5.5464 0.767578C5.48674 0.767578 5.42769 0.779116 5.37272 0.801511C5.31776 0.823907 5.268 0.856705 5.22638 0.897971Z"
                    fill="black"
                  />
                </svg>
                <svg
                  width="6"
                  height="12"
                  viewBox="0 0 6 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.22638 0.897971L0.13935 5.93589C0.0500037 6.02438 0 6.14306 0 6.26663C0 6.3902 0.0500037 6.50888 0.13935 6.59737L5.22638 11.6372C5.268 11.6785 5.31776 11.7113 5.37272 11.7336C5.42769 11.756 5.48674 11.7676 5.5464 11.7676C5.60606 11.7676 5.66512 11.756 5.72008 11.7336C5.77505 11.7113 5.82481 11.6785 5.86643 11.6372C5.95206 11.5526 6 11.439 6 11.3207C6 11.2024 5.95206 11.0888 5.86643 11.0041L1.08274 6.26663L5.86643 1.53008C5.95177 1.4455 5.99952 1.3321 5.99952 1.21403C5.99952 1.09595 5.95177 0.98255 5.86643 0.897971C5.82481 0.856705 5.77505 0.823907 5.72008 0.801511C5.66512 0.779116 5.60606 0.767578 5.5464 0.767578C5.48674 0.767578 5.42769 0.779116 5.37272 0.801511C5.31776 0.823907 5.268 0.856705 5.22638 0.897971Z"
                    fill="black"
                  />
                </svg>
              </span>
            </button>

            {/* 이전 페이지 */}
            <button
              className={styles.page_btn}
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <span>
                <svg
                  width="6"
                  height="12"
                  viewBox="0 0 6 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.22638 0.897971L0.13935 5.93589C0.0500037 6.02438 0 6.14306 0 6.26663C0 6.3902 0.0500037 6.50888 0.13935 6.59737L5.22638 11.6372C5.268 11.6785 5.31776 11.7113 5.37272 11.7336C5.42769 11.756 5.48674 11.7676 5.5464 11.7676C5.60606 11.7676 5.66512 11.756 5.72008 11.7336C5.77505 11.7113 5.82481 11.6785 5.86643 11.6372C5.95206 11.5526 6 11.439 6 11.3207C6 11.2024 5.95206 11.0888 5.86643 11.0041L1.08274 6.26663L5.86643 1.53008C5.95177 1.4455 5.99952 1.3321 5.99952 1.21403C5.99952 1.09595 5.95177 0.98255 5.86643 0.897971C5.82481 0.856705 5.77505 0.823907 5.72008 0.801511C5.66512 0.779116 5.60606 0.767578 5.5464 0.767578C5.48674 0.767578 5.42769 0.779116 5.37272 0.801511C5.31776 0.823907 5.268 0.856705 5.22638 0.897971Z"
                    fill="black"
                  />
                </svg>
              </span>
            </button>

            {/* 페이지 번호들 */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              return (
                <button
                  key={pageNum}
                  className={`${styles.page_number} ${currentPage === pageNum ? styles.active : ''}`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* 다음 페이지 */}
            <button
              className={styles.page_btn}
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <span>
                <svg
                  width="6"
                  height="12"
                  viewBox="0 0 6 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: 'rotate(180deg)' }}
                >
                  <path
                    d="M5.22638 0.897971L0.13935 5.93589C0.0500037 6.02438 0 6.14306 0 6.26663C0 6.3902 0.0500037 6.50888 0.13935 6.59737L5.22638 11.6372C5.268 11.6785 5.31776 11.7113 5.37272 11.7336C5.42769 11.756 5.48674 11.7676 5.5464 11.7676C5.60606 11.7676 5.66512 11.756 5.72008 11.7336C5.77505 11.7113 5.82481 11.6785 5.86643 11.6372C5.95206 11.5526 6 11.439 6 11.3207C6 11.2024 5.95206 11.0888 5.86643 11.0041L1.08274 6.26663L5.86643 1.53008C5.95177 1.4455 5.99952 1.3321 5.99952 1.21403C5.99952 1.09595 5.95177 0.98255 5.86643 0.897971C5.82481 0.856705 5.77505 0.823907 5.72008 0.801511C5.66512 0.779116 5.60606 0.767578 5.5464 0.767578C5.48674 0.767578 5.42769 0.779116 5.37272 0.801511C5.31776 0.823907 5.268 0.856705 5.22638 0.897971Z"
                    fill="black"
                  />
                </svg>
              </span>
            </button>

            {/* 마지막 페이지로 */}
            <button
              className={styles.page_btn}
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              <span>
                <svg
                  width="6"
                  height="12"
                  viewBox="0 0 6 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: 'rotate(180deg)' }}
                >
                  <path
                    d="M5.22638 0.897971L0.13935 5.93589C0.0500037 6.02438 0 6.14306 0 6.26663C0 6.3902 0.0500037 6.50888 0.13935 6.59737L5.22638 11.6372C5.268 11.6785 5.31776 11.7113 5.37272 11.7336C5.42769 11.756 5.48674 11.7676 5.5464 11.7676C5.60606 11.7676 5.66512 11.756 5.72008 11.7336C5.77505 11.7113 5.82481 11.6785 5.86643 11.6372C5.95206 11.5526 6 11.439 6 11.3207C6 11.2024 5.95206 11.0888 5.86643 11.0041L1.08274 6.26663L5.86643 1.53008C5.95177 1.4455 5.99952 1.3321 5.99952 1.21403C5.99952 1.09595 5.95177 0.98255 5.86643 0.897971C5.82481 0.856705 5.77505 0.823907 5.72008 0.801511C5.66512 0.779116 5.60606 0.767578 5.5464 0.767578C5.48674 0.767578 5.42769 0.779116 5.37272 0.801511C5.31776 0.823907 5.268 0.856705 5.22638 0.897971Z"
                    fill="black"
                  />
                </svg>
                <svg
                  width="6"
                  height="12"
                  viewBox="0 0 6 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: 'rotate(180deg)' }}
                >
                  <path
                    d="M5.22638 0.897971L0.13935 5.93589C0.0500037 6.02438 0 6.14306 0 6.26663C0 6.3902 0.0500037 6.50888 0.13935 6.59737L5.22638 11.6372C5.268 11.6785 5.31776 11.7113 5.37272 11.7336C5.42769 11.756 5.48674 11.7676 5.5464 11.7676C5.60606 11.7676 5.66512 11.756 5.72008 11.7336C5.77505 11.7113 5.82481 11.6785 5.86643 11.6372C5.95206 11.5526 6 11.439 6 11.3207C6 11.2024 5.95206 11.0888 5.86643 11.0041L1.08274 6.26663L5.86643 1.53008C5.95177 1.4455 5.99952 1.3321 5.99952 1.21403C5.99952 1.09595 5.95177 0.98255 5.86643 0.897971C5.82481 0.856705 5.77505 0.823907 5.72008 0.801511C5.66512 0.779116 5.60606 0.767578 5.5464 0.767578C5.48674 0.767578 5.42769 0.779116 5.37272 0.801511C5.31776 0.823907 5.268 0.856705 5.22638 0.897971Z"
                    fill="black"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

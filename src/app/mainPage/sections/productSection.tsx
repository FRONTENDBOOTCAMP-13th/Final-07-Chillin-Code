'use client';

import React, { useState, useEffect, JSX } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { productFetch } from '@/app/fetch/product';
import { Product } from '@/app/types/productType';
import styles from '../../../styles/mainPage/sections/productSection.module.css';
import { addRecentProduct } from '@/utils/recentProduct';
import ResponsiveLink from '@/app/mainPage/sections/responsiveLink';

// Hero 이미지 매핑 함수
const getHeroImage = (movieName: string): string => {
  const heroImages: Record<string, string> = {
    '마녀배달부 키키': '/images/mainPage/kiki-hero.svg',
    '이웃집 토토로': '/images/mainPage/totoro-hero.svg',
    '하울의 움직이는 성': '/images/mainPage/howls-hero.svg',
  };
  return heroImages[movieName] || '/images/mainPage/default-hero.svg';
};

export default function ProductSection(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await productFetch();
        console.log('API Response:', data);

        if (data.ok === 0) {
          throw new Error(data.message || '상품 조회 실패');
        }

        const fetchedProducts = data.item || [];
        setProducts(fetchedProducts);

        // API 데이터에서 영화 카테고리 추출 (중복 제거)
        const uniqueMovies = [
          ...new Set(
            fetchedProducts
              .map((product: Product) => product.extra?.movie)
              .filter((movie): movie is string => !!movie),
          ),
        ];

        setCategories(uniqueMovies);
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : '알 수 없는 오류');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 스크롤 이벤트 처리
  useEffect(() => {
    const scroll_containers = document.querySelectorAll(
      `.${styles.product_row_scroll}`,
    ) as NodeListOf<HTMLElement>;

    const handle_wheel = (e: WheelEvent) => {
      e.preventDefault();
      const scroll_amount = e.deltaY * 0.8;
      (e.currentTarget as HTMLElement).scrollLeft += scroll_amount;
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
      if ((e.target as HTMLElement).closest(`.${styles.product_card}`)) {
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
        const walk = (x - start_x) * 1.5; // 리뷰 섹션보다 느린 드래그 속도
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

    scroll_containers.forEach((container) => {
      container.addEventListener('wheel', handle_wheel, { passive: false });
      container.addEventListener('mousedown', handle_mouse_down);
      container.addEventListener('touchstart', handle_touch_start, { passive: false });
      container.addEventListener('touchmove', handle_touch_move, { passive: false });
      container.style.cursor = 'grab';
    });

    return () => {
      scroll_containers.forEach((container) => {
        container.removeEventListener('wheel', handle_wheel);
        container.removeEventListener('mousedown', handle_mouse_down);
        container.removeEventListener('touchstart', handle_touch_start);
        container.removeEventListener('touchmove', handle_touch_move);
      });
    };
  }, [categories]); // categories가 변경될 때마다 이벤트 리스너 재등록

  // 카테고리별 상품 필터링 (최대 6개)
  const getRowProducts = (movie: string) =>
    products.filter((product) => product.extra?.movie === movie).slice(0, 6);

  const handleCategoryClick = (category: string) => {
    console.log(`Category clicked: ${category}`);
  };

  if (loading) {
    console.log('ProductSection: 로딩 중...');
  }

  if (error) {
    console.log('ProductSection 에러 발생:', error);
  }

  if (products.length === 0) {
    console.log('ProductSection: 상품 데이터가 없습니다');
  }

  return (
    <section className={styles.product_section}>
      {/* 카테고리 탭 */}
      <div className={styles.section_header}>
        <div className={styles.category_tabs}>
          {categories.map((category) => (
            <ResponsiveLink key={category}>
              <button
                type="button"
                className={styles.tab}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            </ResponsiveLink>
          ))}
        </div>
      </div>

      {/* 카테고리별 상품 리스트 */}
      <div className={styles.product_rows}>
        {categories.map((category) => {
          const categoryProducts = getRowProducts(category);
          if (categoryProducts.length === 0) return null;

          return (
            <div key={category} className={styles.product_row}>
              <div className={styles.product_wrapper}>
                {/* 좌측 hero 이미지 */}
                <div className={styles.product_hero}>
                  <Image
                    src={getHeroImage(category)}
                    alt={`${category} hero`}
                    width={360}
                    height={530}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>

                {/* 우측 상품 스크롤 */}
                <div className={styles.product_row_scroll}>
                  {categoryProducts.map((product) => (
                    <Link
                      href={`/products/${product._id}`}
                      key={product._id}
                      className={styles.product_link}
                    >
                      <div
                        className={styles.product_card}
                        onClick={() => addRecentProduct(product._id)} // 클릭 시 최근 본 상품 저장
                      >
                        <div className={styles.product_image}>
                          {product.mainImages?.[0]?.path && (
                            <Image
                              src={`/${product.mainImages[0].path}`}
                              alt={product.name}
                              width={200}
                              height={200}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          )}
                        </div>
                        <div className={styles.product_info}>
                          <p className={styles.product_category}>[{product.extra?.movie}]</p>
                          <h4 className={styles.product_name}>{product.name}</h4>
                          <p className={styles.product_price}>
                            {product.price?.toLocaleString()}원
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { productFetch } from '@/app/fetch/product';
import { Product } from '@/app/types/productType';
import { getRecentProducts, removeRecentProduct } from '@/utils/recentProduct';
import styles from '@/styles/recentPage/mobile/recentProduct.module.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// 모바일 환경에서 최근 본 상품을 표시하는 컴포넌트
export default function MobileRecentProducts() {
  // 상태 관리
  const [recentProducts, setRecentProducts] = useState<Product[]>([]); // 최근 본 상품 목록
  const [loading, setLoading] = useState(true); // 로딩 상태
  const router = useRouter(); // 라우터 훅

  // 컴포넌트 마운트 시 최근 본 상품 데이터 가져오기
  useEffect(() => {
    const fetchRecent = async () => {
      const ids = getRecentProducts(); // 로컬 스토리지에서 최근 본 상품 ID 배열 가져오기

      // 최근 본 상품이 없는 경우
      if (ids.length === 0) {
        setRecentProducts([]);
        setLoading(false);
        return;
      }

      // 상품 데이터 API 호출
      const data = await productFetch();

      // API 호출 실패 시
      if (data.ok === 0) {
        setRecentProducts([]);
        setLoading(false);
        return;
      }

      const allProducts: Product[] = data.item || [];

      // 로컬 스토리지에 저장된 ID 순서대로 상품 필터링 (최신순 유지)
      const filtered = ids
        .map((id) => allProducts.find((p) => p._id === id))
        .filter((p): p is Product => !!p); // 타입 가드로 undefined 제거

      setRecentProducts(filtered);
      setLoading(false);
    };

    fetchRecent();
  }, []);

  // 상품 삭제 핸들러
  // id를 이용하면 추가적으로 속성을 안넣어도 최근 본 상품을 구현 가능 (근데 알아서 삭제가 안되서 필요하면 추가로 기능 구현 해야할 듯)
  const handleRemoveProduct = (productId: number) => {
    removeRecentProduct(productId); // 로컬 스토리지에서 상품 제거
    setRecentProducts(recentProducts.filter((product) => product._id !== productId)); // 상태 업데이트
  };

  // 닫기 버튼 핸들러
  const handleClose = () => {
    router.back(); // 바로 이전 페이지로 이동
  };

  // 로딩 중 UI -> 나중에 토토로가 정류장에서 기다리는 이미지 등으로 교체해야 할듯합니다.
  if (loading) return <div className={styles.loading}>로딩 중...</div>;

  // 최근 본 상품이 없는 경우 UI
  if (recentProducts.length === 0) {
    return <div className={styles.empty_state}>최근 본 상품이 없습니다.</div>;
  }

  return (
    <div className={styles.container}>
      {/* 헤더 영역 */}
      <header className={styles.header}>
        <h1 className={styles.title}>최근 본 상품</h1>
        {/* 닫기 버튼 */}
        <button className={styles.close_button} onClick={handleClose} aria-label="닫기">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.9997 12.7087L6.75374 17.9547C6.66041 18.0481 6.54574 18.0981 6.40974 18.1047C6.27374 18.1114 6.15241 18.0614 6.04574 17.9547C5.93908 17.8481 5.88574 17.7301 5.88574 17.6007C5.88574 17.4714 5.93908 17.3534 6.04574 17.2467L11.2917 12.0007L6.04574 6.75472C5.95241 6.66139 5.90241 6.54672 5.89574 6.41072C5.88908 6.27472 5.93908 6.15339 6.04574 6.04672C6.15241 5.94005 6.27041 5.88672 6.39974 5.88672C6.52908 5.88672 6.64708 5.94005 6.75374 6.04672L11.9997 11.2927L17.2457 6.04672C17.3391 5.95339 17.4541 5.90339 17.5907 5.89672C17.7261 5.89005 17.8471 5.94005 17.9537 6.04672C18.0604 6.15339 18.1137 6.27139 18.1137 6.40072C18.1137 6.53005 18.0604 6.64805 17.9537 6.75472L12.7077 12.0007L17.9537 17.2467C18.0471 17.3401 18.0971 17.4551 18.1037 17.5917C18.1104 17.7271 18.0604 17.8481 17.9537 17.9547C17.8471 18.0614 17.7291 18.1147 17.5997 18.1147C17.4704 18.1147 17.3524 18.0614 17.2457 17.9547L11.9997 12.7087Z"
              fill="#6B7878"
            />
          </svg>
        </button>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className={styles.content}>
        <div className={styles.product_list}>
          {/* 최근 본 상품 목록 렌더링 */}
          {recentProducts.map((product) => (
            <Link
              href={`/products/${product._id}`}
              key={product._id}
              className={styles.product_link}
            >
              {/* 개별 상품 아이템 */}
              <div key={product._id} className={styles.product_item}>
                {/* 상품 이미지 */}
                <Image
                  src={`/${product.mainImages?.[0]?.path || 'default-product-image.png'}`}
                  alt={product.name}
                  className={styles.product_image}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/default-product-image.png';
                  }}
                  width={100}
                  height={100}
                />

                {/* 상품 정보 */}
                <div className={styles.product_info}>
                  <div className={styles.brand_name}>{product.extra.movie || '상품'}</div>
                  <div className={styles.product_name}>{product.name}</div>
                  <div className={styles.product_price}>
                    {product.price?.toLocaleString() ?? '0'}원
                    <div className={styles.product_actions}>
                      {/* 좋아요 버튼 (현재는 비활성화 상태) */}
                      <button
                        className={`${styles.like_button}`}
                        onClick={(e) => {
                          e.preventDefault();

                          // 좋아요 기능은 추후 구현 예정
                        }}
                      >
                        <svg
                          width="12"
                          height="14"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.24 8.25002C1.84461 7.85725 1.53134 7.38971 1.31845 6.87466C1.10556 6.3596 0.997308 5.80733 1 5.25002C1 4.12285 1.44777 3.04184 2.2448 2.24481C3.04183 1.44778 4.12283 1.00002 5.25 1.00002C6.83 1.00002 8.21 1.86002 8.94 3.14002H10.06C10.4311 2.48908 10.9681 1.94811 11.6163 1.57219C12.2645 1.19628 13.0007 0.998856 13.75 1.00002C14.8772 1.00002 15.9582 1.44778 16.7552 2.24481C17.5522 3.04184 18 4.12285 18 5.25002C18 6.42002 17.5 7.50002 16.76 8.25002L9.5 15.5L2.24 8.25002ZM17.46 8.96002C18.41 8.00002 19 6.70002 19 5.25002C19 3.85763 18.4469 2.52227 17.4623 1.53771C16.4777 0.553141 15.1424 1.8052e-05 13.75 1.8052e-05C12 1.8052e-05 10.45 0.850018 9.5 2.17002C9.0151 1.49652 8.37661 0.948336 7.63748 0.570946C6.89835 0.193557 6.0799 -0.00216431 5.25 1.8052e-05C3.85761 1.8052e-05 2.52226 0.553141 1.53769 1.53771C0.553123 2.52227 0 3.85763 0 5.25002C0 6.70002 0.59 8.00002 1.54 8.96002L9.5 16.92L17.46 8.96002Z"
                            fill="#6B7878"
                          />
                        </svg>
                      </button>

                      {/* 장바구니 버튼 (현재는 비활성화 상태) */}
                      <button
                        className={`${styles.cart_button}`}
                        onClick={(e) => {
                          e.preventDefault();
                          // 장바구니 기능은 추후 구현 예정
                        }}
                      >
                        <svg
                          width="12"
                          height="14"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 0.874721C0 0.713697 0.0632147 0.559268 0.175738 0.445406C0.28826 0.331545 0.440874 0.267578 0.600006 0.267578H2.40002C2.53386 0.267616 2.66384 0.312933 2.7693 0.396322C2.87476 0.479712 2.94964 0.596387 2.98203 0.727792L3.46803 2.69615H17.4002C17.4913 2.69618 17.5812 2.71721 17.6631 2.75766C17.745 2.7981 17.8168 2.8569 17.8729 2.92958C17.929 3.00227 17.968 3.08693 17.9869 3.17714C18.0058 3.26735 18.0042 3.36074 17.9822 3.45022L16.1821 10.7359C16.1498 10.8673 16.0749 10.984 15.9694 11.0674C15.864 11.1508 15.734 11.1961 15.6001 11.1961H4.80004C4.66621 11.1961 4.53622 11.1508 4.43076 11.0674C4.3253 10.984 4.25043 10.8673 4.21804 10.7359L1.93202 1.48186H0.600006C0.440874 1.48186 0.28826 1.4179 0.175738 1.30404C0.0632147 1.19017 0 1.03575 0 0.874721ZM3.76803 3.91044L5.26805 9.98186H15.1321L16.6322 3.91044H3.76803ZM6.00006 13.6247C5.68179 13.6247 5.37656 13.7527 5.15152 13.9804C4.92647 14.2081 4.80004 14.517 4.80004 14.839C4.80004 15.1611 4.92647 15.4699 5.15152 15.6976C5.37656 15.9254 5.68179 16.0533 6.00006 16.0533C6.31832 16.0533 6.62355 15.9254 6.84859 15.6976C7.07364 15.4699 7.20007 15.1611 7.20007 14.839C7.20007 14.517 7.07364 14.2081 6.84859 13.9804C6.62355 13.7527 6.31832 13.6247 6.00006 13.6247ZM3.60003 14.839C3.60003 14.1949 3.85289 13.5772 4.30298 13.1217C4.75307 12.6663 5.36353 12.4104 6.00006 12.4104C6.63658 12.4104 7.24704 12.6663 7.69713 13.1217C8.14722 13.5772 8.40008 14.1949 8.40008 14.839C8.40008 15.4831 8.14722 16.1008 7.69713 16.5563C7.24704 17.0117 6.63658 17.2676 6.00006 17.2676C5.36353 17.2676 4.75307 17.0117 4.30298 16.5563C3.85289 16.1008 3.60003 15.4831 3.60003 14.839ZM14.4001 13.6247C14.0819 13.6247 13.7766 13.7527 13.5516 13.9804C13.3266 14.2081 13.2001 14.517 13.2001 14.839C13.2001 15.1611 13.3266 15.4699 13.5516 15.6976C13.7766 15.9254 14.0819 16.0533 14.4001 16.0533C14.7184 16.0533 15.0236 15.9254 15.2487 15.6976C15.4737 15.4699 15.6001 15.1611 15.6001 14.839C15.6001 14.517 15.4737 14.2081 15.2487 13.9804C15.0236 13.7527 14.7184 13.6247 14.4001 13.6247ZM12.0001 14.839C12.0001 14.1949 12.253 13.5772 12.7031 13.1217C13.1532 12.6663 13.7636 12.4104 14.4001 12.4104C15.0367 12.4104 15.6471 12.6663 16.0972 13.1217C16.5473 13.5772 16.8002 14.1949 16.8002 14.839C16.8002 15.4831 16.5473 16.1008 16.0972 16.5563C16.5473 17.0117 15.0367 17.2676 14.4001 17.2676C13.7636 17.2676 13.1532 17.0117 12.7031 16.5563C12.253 16.1008 12.0001 15.4831 12.0001 14.839Z"
                            fill="#6B7878"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 상품 삭제 버튼 */}
                <button
                  className={styles.remove_button}
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveProduct(product._id);
                  }}
                  aria-label="상품 삭제"
                >
                  <span className={styles.remove_icon}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0ZM9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1Z"
                        fill="#6B7878"
                      />
                      <path
                        d="M5.44895 13.3477L5 12.8987L8.55105 9.34766L5 5.79661L5.44895 5.34766L9 8.8987L12.551 5.34766L13 5.79661L9.44895 9.34766L13 12.8987L12.551 13.3477L9 9.79661L5.44895 13.3477Z"
                        fill="#6B7878"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

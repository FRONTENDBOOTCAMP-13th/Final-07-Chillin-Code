'use client';

import { useRouter } from 'next/navigation';
import { Product } from '@/app/types/productType';
import Image from 'next/image';
import detail_styles from '@/styles/detailPage/detailPage.module.css';
import ProductDetailCalc from '@/app/products/[id]/prouctDetailCalc';
import { useCartStore } from '@/zustand/userCartStore';
import { useCallback, useState } from 'react';

interface MobileProductDetailContentProps {
  product: Product;
}

export default function MobileProductDetailContent({ product }: MobileProductDetailContentProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = useCallback(() => {
    setQuantity((prev) => Math.min(prev + 1, 99));
  }, []);

  const handleDecrease = useCallback(() => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  }, []);

  const addItemToCart = () => {
    useCartStore.getState().addItem({
      id: product._id.toString(), // 고유한 문자열 ID
      name: product.name,
      price: product.price,
      quantity: quantity,
      color: '베이지',
      size: '대형',
      imageSrc: `/${product.mainImages[0].path}`,
    });

    alert('장바구니에 담겼습니다!');
  };
  return (
    <>
      {/* 모바일 상세 페이지 */}
      <div className={detail_styles.mobile_detail_top_img_wrapper}>
        {product.mainImages?.[0]?.path && (
          <Image
            className={detail_styles.mobile_detail_top_img}
            src={`/${product.mainImages[0].path}`}
            alt={product.name}
            fill
          />
        )}

        <button
          type="button"
          onClick={() => router.back()}
          className={detail_styles.mobile_back_button_wrapper}
          style={{ background: 'none', border: 'none', padding: 0 }}
        >
          {/* 뒤로가기 SVG */}
          <svg
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className={detail_styles.mobile_back_button}
          >
            <rect
              x="15"
              y="15.6523"
              width="15"
              height="15"
              transform="rotate(180 15 15.6523)"
              fill="url(#pattern0_315_1191)"
            />
            <defs>
              <pattern
                id="pattern0_315_1191"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use xlinkHref="#image0_315_1191" transform="scale(0.00195312)" />
              </pattern>
              <image
                id="image0_315_1191"
                width="512"
                height="512"
                preserveAspectRatio="none"
                xlinkHref="data:image/png;base64,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rr/++sf2f05//fWP7f+8/vrrr7/+kf136K+//rH9d+qvv/6x/V/QX3/9UzXon91/l/766x/bf7f++usf2/9F/fXXX3/9I/u/pL/++sf2f1l//fWP7b9Hf/3111//RI2v6K+//rH9X9Vff/311z+yf6/++usf2/81/fXXX3/9I/v36a+//qkWvK6//vrH9n9Df/3111//yP79+uuvf2z/N/XXX3/99Y/s/5b+yS7SX3/9c/vv1V9//WP779Nff/311z+y/3799dc/tv/b+idr0l9//XP7v6O//vrrr39k/3f111//2P7v6a+//qkW6p/d/4D++usf2/99/fXXX3/9I/sP6K+//qma9M+2Xf9oN+sfreN3/aN9oH+0VfpnG9Q/2lX6Z7td/2wH9M82qX+0xfpnu1r/bF36Z+vQP9sV+mdrnNY/2zH9s23TP9tq/bM1TeifbaP+2Zac0D/bBv2zNQzon63lqP7Z2o/P1X9E/whtY7P37292mwyL+mbr31NzmRhrD5+ff6jLVaKeDHQPn/PK4NTgGieJs2z9nkPjJyePDO1e1+IaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBP/gLKc+MdiCJDlgAAAABJRU5ErkJggg=="
              />
            </defs>
          </svg>
        </button>
      </div>

      {/* 나머지 UI (상품명, 가격, 배송정책, 상세내용 등) */}
      <div className={detail_styles.mobile_detail_page_wrapper}>
        <div className={detail_styles.mobile_detail_page_tit}>
          <h1 className={detail_styles.mobile_detail_page_tit_name}>{product.name}</h1>
          <h2 className={detail_styles.mobile_detail_page_tit_price}>
            {product.price?.toLocaleString()} 원
          </h2>
        </div>
        {/* 모바일 배송비 부분 */}
        <section className={detail_styles.mobile_detail_shipping_fee_wrapper}>
          <h2 className={detail_styles.mobile_detail_shipping_fee_tit}>배송비</h2>
          <p className={detail_styles.mobile_detail_shipping_fee}>
            배송비 2,500원,
            <br />
            50,000원 이상 무료 배송
          </p>
          <div className={detail_styles.mobile_detail_shipping_policy_wrapper}>
            <p className={detail_styles.mobile_detail_shipping_policy}>배송정책</p>
            <button className={detail_styles.mobile_detail_shipping_policy_button}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.5 8.25C5.58719 8.25 5.65991 8.22067 5.71817 8.162C5.77643 8.10333 5.80556 8.03081 5.80556 7.94444V5.19444C5.80556 5.10767 5.77622 5.03515 5.71756 4.97689C5.65889 4.91863 5.58617 4.8893 5.49939 4.88889C5.41261 4.88848 5.34009 4.91781 5.28183 4.97689C5.22357 5.03596 5.19444 5.10848 5.19444 5.19444V7.94444C5.19444 8.03122 5.22378 8.10374 5.28244 8.162C5.34111 8.22026 5.41383 8.24959 5.50061 8.25M5.5 4.01928C5.60674 4.01928 5.69617 3.98322 5.76828 3.91111C5.84039 3.839 5.87624 3.74978 5.87583 3.64344C5.87543 3.53711 5.83937 3.44768 5.76767 3.37517C5.69596 3.30265 5.60674 3.26659 5.5 3.267C5.39326 3.26741 5.30404 3.30346 5.23233 3.37517C5.16063 3.44687 5.12457 3.5363 5.12417 3.64344C5.12376 3.75059 5.15981 3.83981 5.23233 3.91111C5.30485 3.98241 5.39407 4.01846 5.5 4.01928ZM5.50183 11C4.7412 11 4.0262 10.8558 3.35683 10.5673C2.68746 10.2785 2.10507 9.88655 1.60967 9.39155C1.11426 8.89655 0.72213 8.31478 0.433278 7.64622C0.144426 6.97767 0 6.26287 0 5.50183C0 4.7408 0.144426 4.0258 0.433278 3.35683C0.721722 2.68746 1.11304 2.10507 1.60722 1.60967C2.10141 1.11426 2.68339 0.72213 3.35317 0.433278C4.02294 0.144426 4.73794 0 5.49817 0C6.25839 0 6.97339 0.144426 7.64317 0.433278C8.31254 0.721722 8.89493 1.11324 9.39033 1.60783C9.88574 2.10243 10.2779 2.68441 10.5667 3.35378C10.8556 4.02315 11 4.73794 11 5.49817C11 6.25839 10.8558 6.97339 10.5673 7.64317C10.2789 8.31294 9.88696 8.89533 9.39156 9.39033C8.89615 9.88533 8.31437 10.2775 7.64622 10.5667C6.97807 10.856 6.26328 11.0004 5.50183 11ZM5.5 10.3889C6.86481 10.3889 8.02083 9.91528 8.96805 8.96805C9.91528 8.02083 10.3889 6.86481 10.3889 5.5C10.3889 4.13518 9.91528 2.97917 8.96805 2.03194C8.02083 1.08472 6.86481 0.611111 5.5 0.611111C4.13519 0.611111 2.97917 1.08472 2.03194 2.03194C1.08472 2.97917 0.611111 4.13518 0.611111 5.5C0.611111 6.86481 1.08472 8.02083 2.03194 8.96805C2.97917 9.91528 4.13519 10.3889 5.5 10.3889Z"
                  fill="#919F9F"
                />
              </svg>
            </button>
          </div>
        </section>
        <div className={detail_styles.mobile_detail_quantity_wrapper}>
          <p className={detail_styles.mobile_detail_quantity_tit}>{product.name}</p>
          <div className={detail_styles.mobile_detail_quantity_button_wrapper}>
            <ProductDetailCalc
              quantity={quantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
            <p className={detail_styles.mobile_detail_shipping_policy_price}>
              {product.price?.toLocaleString()}원
            </p>
          </div>
        </div>
        <div className={detail_styles.mobile_detail_shopping_cart_button_wrapper}>
          <button
            className={detail_styles.mobile_detail_shopping_cart_button}
            onClick={addItemToCart}
          >
            장바구니
          </button>
          <button className={detail_styles.mobile_detail_shopping_buy_button}>구매하기</button>
        </div>

        {/* 모바일 상품정보 */}
        <details className={detail_styles.mobile_detail_dropdown}>
          <summary className={detail_styles.mobile_detail_dropdown_summary}>
            <span className={detail_styles.mobile_detail_product_info_point_text}>
              상품정보 및 유의사항 펼치기
            </span>
            <svg
              className={detail_styles.mobile_detail_dropdown_icon}
              width="12"
              height="8"
              viewBox="0 0 11 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.130393 1.22589L5.16831 6.31292C5.2568 6.40227 5.37548 6.45227 5.49905 6.45227C5.62262 6.45227 5.74131 6.40227 5.8298 6.31292L10.8696 1.22589C10.9109 1.18427 10.9437 1.13451 10.9661 1.07955C10.9885 1.02458 11 0.965528 11 0.905868C11 0.846208 10.9885 0.787152 10.9661 0.732187C10.9437 0.677222 10.9109 0.627462 10.8696 0.585842C10.785 0.500211 10.6714 0.452271 10.5531 0.452271C10.4348 0.452271 10.3212 0.500211 10.2366 0.585842L5.49905 5.36953L0.762501 0.585842C0.677922 0.500505 0.564518 0.45275 0.446447 0.45275C0.328376 0.45275 0.214972 0.500505 0.130393 0.585842C0.0891271 0.627462 0.0563286 0.677222 0.0339334 0.732187C0.0115381 0.787152 0 0.846208 0 0.905868C0 0.965528 0.0115381 1.02458 0.0339334 1.07955C0.0563286 1.13451 0.0891271 1.18427 0.130393 1.22589Z"
                fill="#6b7878"
              />
            </svg>
          </summary>
          <div className={detail_styles.mobile_detail_dropdown_content}>
            <section className={detail_styles.mobile_detail_product_info_wrapper}>
              <h2 className={detail_styles.mobile_detail_product_info_tit}>상품정보</h2>
              <hr className={detail_styles.mobile_detail_page_divider} />
              <div className={detail_styles.mobile_detail_product_info_text_wrapper}>
                <p className={detail_styles.mobile_detail_product_info_point_text}>브랜드</p>
                <p className={detail_styles.mobile_detail_product_info_text}>
                  {product.extra?.movie}
                </p>
              </div>
              <div className={detail_styles.mobile_detail_product_info_text_wrapper}>
                <p className={detail_styles.mobile_detail_product_info_point_text}>원산지</p>
                <p className={detail_styles.mobile_detail_product_info_text}>
                  수입산 아시아 필리핀
                </p>
              </div>
              <div className={detail_styles.mobile_detail_product_info_button_wrapper}>
                <p className={detail_styles.mobile_detail_product_info_point_text}>
                  상품정보 및 유의사항 펼치기
                </p>
                <button className={detail_styles.mobile_detail_product_info_button}>
                  <svg
                    width="11"
                    height="7"
                    viewBox="0 0 11 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.130393 1.22589L5.16831 6.31292C5.2568 6.40227 5.37548 6.45227 5.49905 6.45227C5.62262 6.45227 5.74131 6.40227 5.8298 6.31292L10.8696 1.22589C10.9109 1.18427 10.9437 1.13451 10.9661 1.07955C10.9885 1.02458 11 0.965528 11 0.905868C11 0.846208 10.9885 0.787152 10.9661 0.732187C10.9437 0.677222 10.9109 0.627462 10.8696 0.585842C10.785 0.500211 10.6714 0.452271 10.5531 0.452271C10.4348 0.452271 10.3212 0.500211 10.2366 0.585842L5.49905 5.36953L0.762501 0.585842C0.677922 0.500505 0.564518 0.45275 0.446447 0.45275C0.328376 0.45275 0.214972 0.500505 0.130393 0.585842C0.0891271 0.627462 0.0563286 0.677222 0.0339334 0.732187C0.0115381 0.787152 0 0.846208 0 0.905868C0 0.965528 0.0115381 1.02458 0.0339334 1.07955C0.0563286 1.13451 0.0891271 1.18427 0.130393 1.22589Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </div>
            </section>

            {/* 상세페이지 메인 내용 */}

            <section className={detail_styles.mobile_detail_product_description_wrapper}>
              <div className={detail_styles.mobile_detail_product_description_guide_wrapper}>
                <button className={detail_styles.mobile_detail_product_description_guide_button}>
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.72617 9.94527H5.28451C5.48312 9.94527 5.64751 10.0104 5.77767 10.1405C5.90784 10.2707 5.97262 10.4348 5.97201 10.6328C5.97139 10.8308 5.90631 10.9952 5.77676 11.1259C5.6472 11.2567 5.48312 11.3215 5.28451 11.3203H2.30534C2.04562 11.3203 1.82806 11.2323 1.65267 11.0563C1.47728 10.8803 1.38928 10.6627 1.38867 10.4036V7.42444C1.38867 7.22583 1.45376 7.06174 1.58392 6.93219C1.71409 6.80263 1.87817 6.73755 2.07617 6.73694C2.27417 6.73633 2.43856 6.80141 2.56934 6.93219C2.70012 7.06297 2.76489 7.22705 2.76367 7.42444V8.98277L5.0095 6.73694C5.147 6.59944 5.30742 6.53069 5.49075 6.53069C5.67409 6.53069 5.83451 6.59944 5.97201 6.73694C6.10951 6.87444 6.17825 7.03486 6.17825 7.21819C6.17825 7.40152 6.10951 7.56194 5.97201 7.69944L3.72617 9.94527ZM10.097 3.57444L7.85117 5.82027C7.71367 5.95777 7.55326 6.02652 7.36992 6.02652C7.18659 6.02652 7.02617 5.95777 6.88867 5.82027C6.75117 5.68277 6.68242 5.52236 6.68242 5.33902C6.68242 5.15569 6.75117 4.99527 6.88867 4.85777L9.1345 2.61194H7.57617C7.37756 2.61194 7.21317 2.54686 7.083 2.41669C6.95284 2.28652 6.88806 2.12244 6.88867 1.92444C6.88928 1.72644 6.95437 1.56236 7.08392 1.43219C7.21348 1.30202 7.37756 1.23694 7.57617 1.23694H10.5553C10.8151 1.23694 11.0329 1.32494 11.2089 1.50094C11.3849 1.67694 11.4726 1.89449 11.472 2.15361V5.13277C11.472 5.33138 11.4069 5.49577 11.2768 5.62594C11.1466 5.75611 10.9825 5.82088 10.7845 5.82027C10.5865 5.81966 10.4224 5.75458 10.2923 5.62502C10.1621 5.49547 10.097 5.33138 10.097 5.13277V3.57444ZM14.0616 21.4036C13.6949 21.4036 13.3435 21.3349 13.0074 21.1974C12.6713 21.0599 12.3734 20.8612 12.1137 20.6015L8.08034 16.5453C7.89701 16.3619 7.81298 16.1367 7.82825 15.8697C7.84353 15.6026 7.94284 15.3771 8.12617 15.1932C8.37062 14.9487 8.65723 14.7844 8.986 14.7C9.31478 14.6157 9.63928 14.6197 9.95951 14.7119L11.472 15.1474V7.65361C11.472 7.39388 11.56 7.17633 11.736 7.00094C11.912 6.82555 12.1296 6.73755 12.3887 6.73694C12.6478 6.73633 12.8656 6.82433 13.0423 7.00094C13.2189 7.17755 13.3066 7.39511 13.3053 7.65361V14.0703H14.222V11.3203C14.222 11.0606 14.31 10.843 14.486 10.6676C14.662 10.4922 14.8796 10.4042 15.1387 10.4036C15.3978 10.403 15.6156 10.491 15.7923 10.6676C15.9689 10.8442 16.0566 11.0618 16.0553 11.3203V14.0703H16.972V12.2369C16.972 11.9772 17.06 11.7597 17.236 11.5843C17.412 11.4089 17.6296 11.3209 17.8887 11.3203C18.1478 11.3197 18.3656 11.4077 18.5423 11.5843C18.7189 11.7609 18.8066 11.9784 18.8053 12.2369V14.0703H19.722C19.722 13.8106 19.81 13.593 19.986 13.4176C20.162 13.2422 20.3796 13.1542 20.6387 13.1536C20.8978 13.153 21.1156 13.241 21.2923 13.4176C21.4689 13.5942 21.5566 13.8118 21.5553 14.0703V17.7369C21.5553 18.7453 21.1963 19.6085 20.4783 20.3265C19.7602 21.0446 18.897 21.4036 17.8887 21.4036H14.0616Z"
                      fill="#081818"
                    />
                  </svg>
                </button>
                <p className={detail_styles.mobile_detail_product_description_guide}>
                  상세정보를{' '}
                  <span className={detail_styles.mobile_detail_product_description_guide_point}>
                    확대
                  </span>
                  해서 볼 수 있습니다.
                </p>
              </div>

              <div className={detail_styles.mobile_detail_product_description_logo_wrapper}>
                <Image
                  className={detail_styles.mobile_detail_product_description_logo}
                  src="/logo/sophie-logo.svg"
                  alt="소피의 창고 로고"
                  fill
                  sizes="100%"
                />
              </div>

              <h2 className={detail_styles.mobile_detail_product_description_text}>
                이곳에서 판매하는 제품은 ‘스튜디오 지브리’ 국내 정식 발매 제품입니다.
              </h2>

              {/* 모바일 이미지 나열 부분 */}
              <div className={detail_styles.mobile_detail_img_wrapper}>
                <Image
                  className={detail_styles.mobile_detail_top_img}
                  src={`/${product.mainImages[0].path}`}
                  alt={product.name}
                  fill
                />
              </div>
              <p className={detail_styles.mobile_detail_product_item_description}>
                이웃집 토토로 극중 명장면을 분재풍으로 재해석한 워터가든입니다. <br /> 나뭇잎에서
                빗방울이 똑똑 떨어지도록 섬세하게 만들었어요. <br />
                보는 이의 마음을 사로잡는 편안함을 느낄 수 있는 워터가든입니다!
              </p>
              <div className={detail_styles.mobile_detail_img_wrapper}>
                <Image
                  className={detail_styles.mobile_detail_top_img}
                  src={`/${product.mainImages[0].path}`}
                  alt={product.name}
                  fill
                />
              </div>
              <div className={detail_styles.mobile_detail_img_wrapper}>
                <Image
                  className={detail_styles.mobile_detail_top_img}
                  src={`/${product.mainImages[0].path}`}
                  alt={product.name}
                  fill
                />
              </div>

              {/* 모바일 유의사항 */}
              <div className={detail_styles.mobile_detail_notice_wrapper}>
                <ul className={detail_styles.mobile_detail_notice_tit}>
                  유의사항
                  <li className={detail_styles.mobile_detail_notice}>
                    본 사이트 상의 모든 콘텐츠에 대한 권리는 ㈜대원미디어에 있으며, 이에 대한 무단
                    사용 행위는 저작권법에 근거 5천만원 이하의 벌금 또는 5년 이하의 징역에 처해질 수
                    있습니다.
                  </li>
                  <li className={detail_styles.mobile_detail_notice_point}>
                    상품의 컬러는 고객의 모니터 환경 및 설정에 따라 실제 컬러와 다르게 보일 수
                    있습니다.
                  </li>
                  <li className={detail_styles.mobile_detail_notice}>
                    지브의 상품의 경우, 수작업으로 제작되기 때문에 상품 이미지와 약간의
                    차이&#40;세밀한 부분&#41;가 있을 수 있습니다. 또한 사이즈는 재는 방법에 따라
                    약간의 오차가 있을 수 있습니다.
                  </li>
                </ul>
              </div>
            </section>

            {/* 모바일 인기상품 */}
            <section className={detail_styles.mobile_detail_best_sellers_wrapper}>
              <h2 className={detail_styles.mobile_detail_best_sellers_tit}>인기상품</h2>
              <div className={detail_styles.mobile_detail_best_sellers_container_wrapper}>
                <div className={detail_styles.mobile_detail_best_sellers_container}>
                  <div className={detail_styles.mobile_detail_best_sellers_img_wrapper}>
                    <Image
                      className={detail_styles.mobile_detail_top_img}
                      src={`/${product.mainImages[0].path}`}
                      alt={product.name}
                      fill
                    />
                  </div>
                  <p className={detail_styles.mobile_detail_best_sellers_name}>
                    하울의 움직이는 성 KM-M11
                  </p>
                  <p className={detail_styles.mobile_detail_best_sellers_price}>1,8000원</p>
                  <p className={detail_styles.mobile_detail_best_sellers_score}>
                    평점 4.9 / 리뷰 37
                  </p>
                </div>
                <div className={detail_styles.mobile_detail_best_sellers_container}>
                  <div className={detail_styles.mobile_detail_best_sellers_img_wrapper}>
                    <Image
                      className={detail_styles.mobile_detail_top_img}
                      src={`/${product.mainImages[0].path}`}
                      alt={product.name}
                      fill
                    />
                  </div>
                  <p className={detail_styles.mobile_detail_best_sellers_name}>
                    하울의 움직이는 성 KM-M11
                  </p>
                  <p className={detail_styles.mobile_detail_best_sellers_price}>1,8000원</p>
                  <p className={detail_styles.mobile_detail_best_sellers_score}>
                    평점 4.9 / 리뷰 37
                  </p>
                </div>
                <div className={detail_styles.mobile_detail_best_sellers_container}>
                  <div className={detail_styles.mobile_detail_best_sellers_img_wrapper}>
                    <Image
                      className={detail_styles.mobile_detail_top_img}
                      src={`/${product.mainImages[0].path}`}
                      alt={product.name}
                      fill
                    />
                  </div>
                  <p className={detail_styles.mobile_detail_best_sellers_name}>
                    하울의 움직이는 성 KM-M11
                  </p>
                  <p className={detail_styles.mobile_detail_best_sellers_price}>1,8000원</p>
                  <p className={detail_styles.mobile_detail_best_sellers_score}>
                    평점 4.9 / 리뷰 37
                  </p>
                </div>
              </div>
            </section>

            {/* 모바일 장바구니 상품 */}
            <section className={detail_styles.mobile_detail_cart_wrapper}>
              <h2 className={detail_styles.mobile_detail_cart_tit}>장바구니 상품</h2>
              <ul className={detail_styles.mobile_detail_cart_list_wrapper}>
                <li className={detail_styles.mobile_detail_cart_list}>
                  장바구니에 담긴 상품이 없습니다.
                </li>
              </ul>
            </section>
          </div>
        </details>
      </div>
    </>
  );
}

'use client';

import { Product } from '@/app/types/productType';
import detail_styles from '@/styles/detailPage/detailPage.module.css';
import ProductDetailContent from '@/app/products/[id]/prouctDetailCalc';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/zustand/userCartStore';
import { useCallback, useState } from 'react';
interface WebProductDetailContentProps {
  product: Product;
}

export default function WebProductDetailContent({ product }: WebProductDetailContentProps) {
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
      {/* 웹 상세 페이지 */}
      {/* 웹 상단 현재 위치 */}
      <div className={detail_styles.web_detail_page_wrapper}>
        <div
          className={detail_styles.web_detail_page_navigation}
          aria-label="현재 위치"
          role="navigation"
        >
          <p className={detail_styles.web_detail_page_current_page}>
            HOME &nbsp; &gt; &nbsp; MOVIE &nbsp; &gt; &nbsp;
            <span className={detail_styles.web_detail_page_navigation_current}>
              {product.extra?.movie}
            </span>
          </p>
        </div>

        {/* 웹 최상단 이미지 부분 */}
        <section className={detail_styles.web_detail_top_wrapper}>
          <div className={detail_styles.web_detail_top_img_wrapper}>
            <Image
              className={detail_styles.web_detail_img}
              src={`/${product.mainImages[0].path}`}
              alt={product.name}
              fill
            />
          </div>

          <div className={detail_styles.web_detail_top_img_sm_container}>
            <div className={detail_styles.web_detail_top_img_sm_wrapper}>
              <Image
                className={detail_styles.web_detail_sm_img}
                src={`/${product.mainImages[0].path}`}
                alt={product.name}
                fill
              />
            </div>
            <div className={detail_styles.web_detail_top_img_sm_wrapper}>
              <Image
                className={detail_styles.web_detail_sm_img}
                src={`/${product.mainImages[0].path}`}
                alt={product.name}
                fill
              />
            </div>
          </div>

          {/* 웹 최상단 우측 상품 정보 부분 */}
          <div className={detail_styles.web_detail_product_info_wrapper}>
            <div className={detail_styles.web_detail_product_info}>
              <h1 className={detail_styles.web_detail_product_info_tit}>{product.name}</h1>
              <p className={detail_styles.web_detail_product_info_price}>
                {product.price?.toLocaleString()}원
              </p>
            </div>
            <div className={detail_styles.web_detail_shipping_fee_wrapper}>
              <div className={detail_styles.web_detail_shipping_fee_text_wrapper}>
                <h2 className={detail_styles.web_detail_shipping_fee_tit}>배송비</h2>
                <p className={detail_styles.web_detail_shipping_fee}>
                  배송비 2,500원, 50,000원 이상 무료 배송
                </p>
              </div>
              <div className={detail_styles.web_detail_shipping_policy_wrapper}>
                <p className={detail_styles.web_detail_shipping_policy}>배송정책</p>
                <button className={detail_styles.web_detail_shipping_policy_button}>
                  <svg
                    width="16"
                    height="16"
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
            </div>

            <div className={detail_styles.web_detail_quantity_wrapper}>
              <p className={detail_styles.web_detail_quantity_tit}>{product.name}</p>
              <div className={detail_styles.web_detail_quantity_button_wrapper}>
                <ProductDetailContent
                  quantity={quantity}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                />
                <p className={detail_styles.web_detail_shipping_policy_price}>
                  {product.price?.toLocaleString()}원
                </p>
              </div>
            </div>

            <div className={detail_styles.web_detail_price_wrapper}>
              <p className={detail_styles.web_detail_price_text}>총 상품금액</p>
              <p className={detail_styles.web_detail_price}>
                {(product.price * quantity).toLocaleString()}
              </p>
            </div>

            <div className={detail_styles.web_detail_shopping_cart_button_wrapper}>
              <button
                className={detail_styles.web_detail_shopping_cart_button}
                onClick={addItemToCart}
              >
                장바구니
              </button>
              <button className={detail_styles.web_detail_shopping_buy_button}>구매하기</button>
            </div>
          </div>
        </section>

        {/* 웹 네비 */}
        <nav className={detail_styles.web_detail_nav}>
          <Link className={detail_styles.web_nav_item} href="#void">
            상세정보
          </Link>
          <Link className={detail_styles.web_nav_item} href="#void">
            리뷰
          </Link>
          <Link className={detail_styles.web_nav_item} href="#void">
            Q&A
          </Link>
          <Link className={detail_styles.web_nav_item} href="#void">
            반품/교환정보
          </Link>
        </nav>
        <hr className={detail_styles.web_detail_nav_divider} />

        <section className={detail_styles.web_detail_container}>
          {/* 웹 상품정보 */}
          {/* 웹 버전 드롭다운 */}
          <details className={detail_styles.web_detail_dropdown}>
            <summary className={detail_styles.web_detail_dropdown_summary}>
              <span>상품정보 및 유의사항</span>
              <svg
                className={detail_styles.web_detail_dropdown_icon}
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
            </summary>
            <div className={detail_styles.web_detail_dropdown_content}>
              {/* 웹 전용 드롭다운 내용 */}
              <div className={detail_styles.web_detail_info_wrapper}>
                <h2 className={detail_styles.web_detail_info_tit}>상품정보</h2>
                <hr className={detail_styles.web_detail_info_divider} />
                <div className={detail_styles.web_detail_info}>
                  <p className={detail_styles.web_detail_info_point_text}>브랜드</p>
                  <p className={detail_styles.web_detail_info_text}>{product.extra?.movie}</p>
                  <p className={detail_styles.web_detail_info_point_text}>원산지</p>
                  <p className={detail_styles.web_detail_info_text}>수입산 아시아 필리핀</p>
                </div>
                <div className={detail_styles.web_detail_info}>
                  <p className={detail_styles.web_detail_info_point_text}>상품관리코드</p>
                  <p className={detail_styles.web_detail_info_text}>499059429509</p>
                  <p className={detail_styles.web_detail_info_point_text}>사용연령</p>
                  <p className={detail_styles.web_detail_info_text}>10세 이상</p>
                </div>
                <div className={detail_styles.web_detail_info_notice_wrapper}>
                  <h2 className={detail_styles.web_detail_info_notice}>유의사항</h2>
                  <ul className={detail_styles.web_detail_info_notice_list_wrapper}>
                    <li className={detail_styles.web_detail_info_notice_list}>
                      본 사이트에 등록된 대표이미지와 다를 수 있습니다. 이에 대한 반품 사유는
                      반영되지 않으며 오배송이 아닌 단순 변심 또는 외관상 차이에 따른 반품은 불가할
                      수 있습니다.
                    </li>
                    <li className={detail_styles.web_detail_info_notice_list}>
                      스파이더코디의 전 상품은 사용연령 15세 이상 전용상품으로 명시됨
                    </li>
                    <li className={detail_styles.web_detail_info_notice_list}>
                      스파이더코디의 상품정보 내 연령 소유자만이 제품을 소지하고 소프트웨어 및 앱을
                      활용한 정보기 등록이 가능합니다.
                    </li>
                    <li className={detail_styles.web_detail_info_notice_list}>
                      스파이더코디의 앱 등록 및 인증절차를 위한 테스트코드와 제품등록정보가
                      동봉되어있으며, 등록 이후 인증된 앱 연동 수행 외 별도 대응하지 않습니다.
                    </li>
                    <li className={detail_styles.web_detail_info_notice_list}>
                      상품의 색상은 고객의 모니터 환경 및 설정에 따라 차이가 날 수 있습니다.
                    </li>
                  </ul>
                </div>
              </div>

              {/* 상세페이지 메인 내용 */}
              <section className={detail_styles.web_detail_product_description_wrapper}>
                <div className={detail_styles.web_detail_product_description_logo_wrapper}>
                  <Image
                    className={detail_styles.web_detail_product_description_logo}
                    src="/logo/sophie-logo.svg"
                    alt="소피의 창고 로고"
                    fill
                    sizes="100%"
                  />
                </div>
                <h2 className={detail_styles.web_detail_product_description_text}>
                  이곳에서 판매하는 제품은 ‘스튜디오 지브리’ 국내 정식 발매 제품입니다.
                </h2>

                {/* 웹 이미지 나열 부분 */}
                <div className={detail_styles.web_detail_img_wrapper}>
                  <Image
                    className={detail_styles.web_detail_img}
                    src={`/${product.mainImages[0].path}`}
                    alt={product.name}
                    fill
                  />
                </div>
                <p className={detail_styles.web_detail_product_item_description}>
                  이웃집 토토로 극중 명장면을 분재풍으로 재해석한 워터가든입니다. <br /> 나뭇잎에서
                  빗방울이 똑똑 떨어지도록 섬세하게 만들었어요. <br />
                  보는 이의 마음을 사로잡는 편안함을 느낄 수 있는 워터가든입니다!
                </p>
                <div className={detail_styles.web_detail_img_wrapper}>
                  <Image
                    className={detail_styles.web_detail_img}
                    src={`/${product.mainImages[0].path}`}
                    alt={product.name}
                    fill
                  />
                </div>
                <div className={detail_styles.web_detail_img_wrapper}>
                  <Image
                    className={detail_styles.web_detail_img}
                    src={`/${product.mainImages[0].path}`}
                    alt={product.name}
                    fill
                  />
                </div>

                {/* 웹 유의사항 */}
                <div className={detail_styles.web_detail_notice_wrapper}>
                  <h2 className={detail_styles.web_detail_notice_tit}>유의사항</h2>
                  <ul className={detail_styles.web_detail_notice_list}>
                    <li className={detail_styles.web_detail_notice}>
                      본 사이트 상의 모든 콘텐츠에 대한 권리는 ㈜대원미디어에 있으며, 이에 대한 무단
                      사용 행위는 저작권법에 근거 5천만원 이하의 벌금 또는 5년 이하의 징역에 처해질
                      수 있습니다.
                    </li>
                    <li className={detail_styles.web_detail_notice}>
                      상품의 컬러는 고객의 모니터 환경 및 설정에 따라 실제 컬러와 다르게 보일 수
                      있습니다.
                    </li>
                    <li className={detail_styles.web_detail_notice}>
                      지브의 상품의 경우, 수작업으로 제작되기 때문에 상품 이미지와 약간의
                      차이&#40;세밀한 부분&#41;가 있을 수 있습니다. 또한 사이즈는 재는 방법에 따라
                      약간의 오차가 있을 수 있습니다.
                    </li>
                  </ul>
                </div>

                {/* 웹 배송정책 안내 */}
                <div className={detail_styles.web_detail_notice_wrapper}>
                  <h2 className={detail_styles.web_detail_notice_tit}>배송정책 안내</h2>
                  <ul className={detail_styles.web_detail_notice_list}>
                    <li className={detail_styles.web_detail_notice}>
                      총 구입 금액이 50,000원 이상일 때는 무료 배송입니다.
                    </li>
                    <li className={detail_styles.web_detail_notice}>
                      총 구입 금액이 50,000원 미만일 때는 2,500원의 배송비가 부과됩니다.
                    </li>
                    <li className={detail_styles.web_detail_notice}>
                      단, 제주도 및 기타 도서지방은 배송료 외에 항공료 및 도선료 5,000원이 추가
                      부과됩니다.
                    </li>
                    <li className={detail_styles.web_detail_notice}>
                      입점사 상품의 경우, 업체기준에 따라 배송비가 책정되는 관계로 상기 정책과
                      상이할 수 있습니다.
                    </li>
                  </ul>
                </div>
              </section>

              {/* 웹 인기상품 */}
              <section className={detail_styles.web_detail_best_sellers_wrapper}>
                <div className={detail_styles.web_detail_best_sellers_tit_wrapper}>
                  <h2 className={detail_styles.web_detail_best_sellers_tit}>인기상품</h2>
                  <div className={detail_styles.web_detail_best_sellers_button_wrapper}>
                    <button className={detail_styles.web_detail_best_sellers_button_left}>
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 38 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 19C0 8.50659 8.50659 0 19 0C29.4934 0 38 8.50659 38 19C38 29.4934 29.4934 38 19 38C8.50659 38 0 29.4934 0 19ZM1 19C1 28.9411 9.05887 37 19 37C28.9411 37 37 28.9411 37 19C37 9.05887 28.9411 1 19 1C9.05887 1 1 9.05887 1 19Z"
                          fill="black"
                        />
                        <path
                          d="M23.2218 10.5554L14.7773 18.9999L23.2218 27.4443"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button className={detail_styles.web_detail_best_sellers_button_right}>
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 38 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M38 19C38 29.4934 29.4934 38 19 38C8.50659 38 0 29.4934 0 19C0 8.50659 8.50659 0 19 0C29.4934 0 38 8.50659 38 19ZM37 19C37 9.05887 28.9411 1 19 1C9.05887 1 1 9.05887 1 19C1 28.9411 9.05887 37 19 37C28.9411 37 37 28.9411 37 19Z"
                          fill="black"
                        />
                        <path
                          d="M14.7782 27.4446L23.2227 19.0001L14.7782 10.5557"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className={detail_styles.web_detail_best_sellers_container_wrapper}>
                  <div className={detail_styles.web_detail_best_sellers_container}>
                    <div className={detail_styles.web_detail_best_sellers_img_wrapper}>
                      <Image
                        className={detail_styles.web_detail_best_sellers_img}
                        src="/images/products/howl/howl-diorama.svg"
                        fill
                        alt="상품 이미지"
                      />
                    </div>
                    <p className={detail_styles.web_detail_best_sellers_name}>
                      하울의 움직이는 성 KM-M11
                    </p>
                    <p className={detail_styles.web_detail_best_sellers_price}>1,8000원</p>
                    <p className={detail_styles.web_detail_best_sellers_score}>
                      평점 4.9 / 리뷰 37
                    </p>
                  </div>
                  <div className={detail_styles.web_detail_best_sellers_container}>
                    <div className={detail_styles.web_detail_best_sellers_img_wrapper}>
                      <Image
                        className={detail_styles.web_detail_best_sellers_img}
                        src="/images/products/howl/howl-diorama.svg"
                        fill
                        alt="상품 이미지"
                      />
                    </div>
                    <p className={detail_styles.web_detail_best_sellers_name}>
                      하울의 움직이는 성 KM-M11
                    </p>
                    <p className={detail_styles.web_detail_best_sellers_price}>1,8000원</p>
                    <p className={detail_styles.web_detail_best_sellers_score}>
                      평점 4.9 / 리뷰 37
                    </p>
                  </div>
                  <div className={detail_styles.web_detail_best_sellers_container}>
                    <div className={detail_styles.web_detail_best_sellers_img_wrapper}>
                      <Image
                        className={detail_styles.web_detail_best_sellers_img}
                        src="/images/products/howl/howl-diorama.svg"
                        fill
                        alt="상품 이미지"
                      />
                    </div>
                    <p className={detail_styles.web_detail_best_sellers_name}>
                      하울의 움직이는 성 KM-M11
                    </p>
                    <p className={detail_styles.web_detail_best_sellers_price}>1,8000원</p>
                    <p className={detail_styles.web_detail_best_sellers_score}>
                      평점 4.9 / 리뷰 37
                    </p>
                  </div>
                  <div className={detail_styles.web_detail_best_sellers_container}>
                    <div className={detail_styles.web_detail_best_sellers_img_wrapper}>
                      <Image
                        className={detail_styles.web_detail_best_sellers_img}
                        src="/images/products/howl/howl-diorama.svg"
                        fill
                        alt="상품 이미지"
                      />
                    </div>
                    <p className={detail_styles.web_detail_best_sellers_name}>
                      하울의 움직이는 성 KM-M11
                    </p>
                    <p className={detail_styles.web_detail_best_sellers_price}>1,8000원</p>
                    <p className={detail_styles.web_detail_best_sellers_score}>
                      평점 4.9 / 리뷰 37
                    </p>
                  </div>
                </div>
              </section>

              {/* 웹 장바구니 상품 */}
              <section className={detail_styles.web_detail_cart_wrapper}>
                <div className={detail_styles.web_detail_cart_tit_wrapper}>
                  <h2 className={detail_styles.web_detail_cart_tit}>장바구니 상품</h2>
                  <div className={detail_styles.web_detail_cart_button_wrapper}>
                    <button className={detail_styles.web_detail_cart_button_left}>
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 38 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 19C0 8.50659 8.50659 0 19 0C29.4934 0 38 8.50659 38 19C38 29.4934 29.4934 38 19 38C8.50659 38 0 29.4934 0 19ZM1 19C1 28.9411 9.05887 37 19 37C28.9411 37 37 28.9411 37 19C37 9.05887 28.9411 1 19 1C9.05887 1 1 9.05887 1 19Z"
                          fill="black"
                        />
                        <path
                          d="M23.2218 10.5554L14.7773 18.9999L23.2218 27.4443"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button className={detail_styles.web_detail_cart_button_right}>
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 38 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M38 19C38 29.4934 29.4934 38 19 38C8.50659 38 0 29.4934 0 19C0 8.50659 8.50659 0 19 0C29.4934 0 38 8.50659 38 19ZM37 19C37 9.05887 28.9411 1 19 1C9.05887 1 1 9.05887 1 19C1 28.9411 9.05887 37 19 37C28.9411 37 37 28.9411 37 19Z"
                          fill="black"
                        />
                        <path
                          d="M14.7782 27.4446L23.2227 19.0001L14.7782 10.5557"
                          stroke="black"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className={detail_styles.web_detail_cart_container_wrapper}>
                  <div className={detail_styles.web_detail_cart_container}>
                    <div className={detail_styles.web_detail_cart_img_wrapper}>
                      <Image
                        className={detail_styles.web_detail_cart_img}
                        src="/images/products/howl/howl-diorama.svg"
                        fill
                        alt="상품 이미지"
                      />
                    </div>
                    <p className={detail_styles.web_detail_cart_name}>하울의 움직이는 성 KM-M11</p>
                    <p className={detail_styles.web_detail_cart_price}>1,8000원</p>
                    <p className={detail_styles.web_detail_cart_score}>평점 4.9 / 리뷰 37</p>
                  </div>
                  <div className={detail_styles.web_detail_cart_container}>
                    <div className={detail_styles.web_detail_cart_img_wrapper}>
                      <Image
                        className={detail_styles.web_detail_cart_img}
                        src="/images/products/howl/howl-diorama.svg"
                        fill
                        alt="상품 이미지"
                      />
                    </div>
                    <p className={detail_styles.web_detail_cart_name}>하울의 움직이는 성 KM-M11</p>
                    <p className={detail_styles.web_detail_cart_price}>1,8000원</p>
                    <p className={detail_styles.web_detail_cart_score}>평점 4.9 / 리뷰 37</p>
                  </div>
                  <div className={detail_styles.web_detail_cart_container}>
                    <div className={detail_styles.web_detail_cart_img_wrapper}>
                      <Image
                        className={detail_styles.web_detail_cart_img}
                        src="/images/products/howl/howl-diorama.svg"
                        fill
                        alt="상품 이미지"
                      />
                    </div>
                    <p className={detail_styles.web_detail_cart_name}>하울의 움직이는 성 KM-M11</p>
                    <p className={detail_styles.web_detail_cart_price}>1,8000원</p>
                    <p className={detail_styles.web_detail_cart_score}>평점 4.9 / 리뷰 37</p>
                  </div>
                  <div className={detail_styles.web_detail_cart_container}>
                    <div className={detail_styles.web_detail_cart_img_wrapper}>
                      <Image
                        className={detail_styles.web_detail_cart_img}
                        src="/images/products/howl/howl-diorama.svg"
                        fill
                        alt="상품 이미지"
                      />
                    </div>
                    <p className={detail_styles.web_detail_cart_name}>하울의 움직이는 성 KM-M11</p>
                    <p className={detail_styles.web_detail_cart_price}>1,8000원</p>
                    <p className={detail_styles.web_detail_cart_score}>평점 4.9 / 리뷰 37</p>
                  </div>
                </div>
              </section>
            </div>
          </details>
        </section>
      </div>
    </>
  );
}

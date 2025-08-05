'use client';
import { useMemo } from 'react';
import order_styles from '@/styles/order/order.module.css';
import Image from 'next/image';
import { useCartStore } from '@/zustand/userCartStore';
import Link from 'next/link';

export default function MobileItemBasket() {
  // 장바구니 스토어에서 아이템들 가져오기
  const items = useCartStore((state) => state.items);

  // 총 수량 계산
  const totalQuantity = useMemo(() => {
    if (!items || items.length === 0) return 0;
    return items.reduce((total, item) => total + (item.quantity || 1), 0);
  }, [items]);

  // 총 상품 금액 계산
  const totalPrice = useMemo(() => {
    if (!items || items.length === 0) return 0;
    return items.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);
  }, [items]);

  // 배송비 계산 (50,000원 이상 무료배송, 미만 시 2,500원)
  const shippingFee = useMemo(() => {
    if (totalPrice === 0) return 0;
    return totalPrice >= 50000 ? 0 : 2500;
  }, [totalPrice]);

  // 최종 결제 금액 계산
  const finalTotalPrice = useMemo(() => {
    return totalPrice + shippingFee;
  }, [totalPrice, shippingFee]);

  // 가격을 천 단위로
  const formatPrice = (price: number) => {
    return (price || 0).toLocaleString('ko-KR');
  };

  return (
    <>
      {/* 주문상품 영역 */}
      <div className={order_styles.mobile_order_item_header}>
        <span>주문상품</span>
        <div className={order_styles.mobile_order_total_arrow_icon_wrapper}>
          <span>총{totalQuantity}건</span>
          <button type="button" className={order_styles.mobile_order_arrow_icon_wrapper}>
            <Image src="/icons/circle-arrow-close-icon.svg" fill alt="주문상품 접기 아이콘" />
          </button>
        </div>
      </div>

      {/* 장바구니 영역 */}
      <div className={order_styles.mobile_order_item_basket_section}>
        <div className={order_styles.mobile_order_item_basket_header}>
          <span>장바구니</span>
          <button type="button" className={order_styles.mobile_order_basket_arrow_icon_wrapper}>
            <Image src="/icons/arrow-icon.svg" fill alt="장바구니 열고 닫는 아이콘" />
          </button>
        </div>

        {/* 장바구니 아이템 추가되는 영역 */}
        <div className={order_styles.mobile_order_item_list}>
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className={order_styles.mobile_order_item_area}>
                {/* 상품 이미지 영역 */}
                <div className={order_styles.mobile_order_item}>
                  <div className={order_styles.mobile_order_item_image_wrapper}>
                    <Image
                      src={item.imageSrc || '/images/shopping-cart-test-image/totoro-image.svg'}
                      fill
                      alt="상품이미지"
                    />
                  </div>
                  <div className={order_styles.mobile_order_item_details}>
                    <span>{item.name}</span>
                    {(item.color || item.size) && (
                      <div className={order_styles.mobile_order_item_options}>
                        {item.color && <span>색상: {item.color}</span>}
                        {item.size && <span>사이즈: {item.size}</span>}
                      </div>
                    )}
                  </div>
                </div>

                {/* 상품 수량 */}
                <div className={order_styles.mobile_order_basket_item_count_wrapper}>
                  <span className={order_styles.mobile_order_basket_item_count}>
                    {item.quantity}개
                  </span>
                </div>

                {/* 상품 가격 */}
                <div className={order_styles.mobile_order_basket_item_price_wrapper}>
                  <span>상품금액</span>
                  <span>{formatPrice(item.price * item.quantity)}원</span>
                </div>
              </div>
            ))
          ) : (
            <div className={order_styles.mobile_order_item_area}>
              <div className={order_styles.mobile_order_item}>
                <span>장바구니에 상품이 없습니다.</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 최종 영수증 영역 */}
      <div className={order_styles.mobile_order_final_recipe_section}>
        {/* 최종 영수증 상단부 영역 */}
        <div className={order_styles.mobile_order_final_recipe_top_section}>
          <div className={order_styles.mobile_order_fianl_recipe_total_title}>
            <span>총 상품수량</span>
            <span>총 상품금액</span>
            <span>총 할인금액</span>
            <span>총 배송비</span>
          </div>
          <div className={order_styles.mobile_order_fianl_recipe_item_info}>
            <span>{totalQuantity}개</span>
            <span>{formatPrice(totalPrice)}원</span>
            <span>0원</span>
            <span>{formatPrice(shippingFee)}원</span>
          </div>
        </div>

        <hr className={order_styles.mobile_order_final_recipe_line} />

        {/* 최종 영수증 하단부 영역 */}
        <div className={order_styles.mobile_order_final_recipe_bottom_section}>
          <div className={order_styles.mobile_order_final_recipe_bottom_total_title}>
            <span>총 결제 금액</span>
            <span>적립예상 스탬프</span>
          </div>
          <div className={order_styles.mobile_order_final_recipe_bottom_item_info}>
            <span className={order_styles.mobile_order_final_recipe_bottom_item_total_price}>
              {formatPrice(finalTotalPrice)}원
            </span>
            <span>{totalQuantity}개</span>
          </div>
        </div>
      </div>

      {/* 장바구니 가기 버튼 */}
      <Link
        className={order_styles.mobile_order_go_shopping_cart_button_wrapper}
        href="/shoppingcart"
      >
        <button type="button" className={order_styles.mobile_order_go_shopping_cart_button}>
          <span>&lt; </span>
          <span> 장바구니 가기</span>
        </button>
      </Link>
    </>
  );
}

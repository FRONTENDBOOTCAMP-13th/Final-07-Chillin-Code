'use client';
import { useMemo } from 'react';
import order_styles from '@/styles/order/order.module.css';
import { useCartStore } from '@/zustand/userCartStore';

export default function MobilePayInfo() {
  const items = useCartStore((state) => state.items);

  // 총 상품 가격 계산
  const totalPrice = useMemo(() => {
    if (!items || items.length === 0) return 0;
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
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

  // 가격 포맷팅
  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

  return (
    <div className={order_styles.mobile_order_pay_info_section}>
      <span>결제정보</span>
      <div className={order_styles.mobile_order_pay_info_wrapper}>
        {/* 상품합계 금액 */}
        <div className={order_styles.mobile_order_pay_info_row_layout}>
          <div className={order_styles.mobile_order_pay_info_title}>
            <span>상품 합계 금액</span>
          </div>
          {/* 기능 구현 시 이부분에 최종 총 가격 기입*/}
          <div className={order_styles.mobile_order_pay_info_total_item_price}>
            <span>{formatPrice(totalPrice)}원</span>
          </div>
        </div>
        <div className={order_styles.mobile_order_pay_info_row_layout}>
          <div className={order_styles.mobile_order_pay_info_title}>
            <span>배송비</span>
          </div>
          <div className={order_styles.mobile_order_pay_info_total_item_info}>
            <span>{formatPrice(shippingFee)}원</span>
          </div>
        </div>
        <div className={order_styles.mobile_order_pay_info_row_layout}>
          <div className={order_styles.mobile_order_pay_info_title}>
            <span>할인 금액</span>
          </div>
          <div
            className={`${order_styles.mobile_order_pay_info_total_item_info} ${order_styles.mobile_pay_info_total_sale_info}`}
          >
            <span>할인: ( - ) 0 원 </span>
            <span className={order_styles.mobile_order_pay_info_total_sale_info}>
              (즉시할인 0원+추가할인 0원)
            </span>
          </div>
        </div>
        <div className={order_styles.mobile_order_pay_info_row_layout}>
          <div className={order_styles.mobile_order_pay_info_title}>
            <span>스탬프 적용 상품</span>
          </div>
          <div className={order_styles.mobile_order_pay_info_total_item_info}>
            <span>없음</span>
          </div>
        </div>
        <div className={order_styles.mobile_order_pay_info_row_layout}>
          <div
            className={`${order_styles.mobile_order_pay_info_title} ${order_styles.mobile_order_pay_info_total_price}`}
          >
            <span>최종 결제 금액</span>
          </div>
          <div className={order_styles.mobile_order_pay_info_total_item_price}>
            <span>{formatPrice(finalTotalPrice)}원</span>
          </div>
        </div>
      </div>
    </div>
  );
}

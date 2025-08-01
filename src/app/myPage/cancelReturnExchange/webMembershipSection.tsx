'use client';

import cancelReturnExchange_styles from '@/styles/myPage/orderDelivery.module.css';
import styles from '@/styles/components/button.module.css';

export default function WebMembershipSection() {
  return (
    <section className={cancelReturnExchange_styles.web_order_delivery_membership_wrapper}>
      <div className={cancelReturnExchange_styles.web_order_delivery_membership}>
        <p className={cancelReturnExchange_styles.web_order_delivery_membership_name}>장유하님의</p>
        {/* 버튼 컴포넌트 대체 전 임시 버튼 */}
        <button className={`${styles.inquiry_button} `}>조회</button>
      </div>

      <hr className={cancelReturnExchange_styles.web_order_delivery_membership_divider} />

      <div className={cancelReturnExchange_styles.web_order_delivery_stamp}>
        <p className={cancelReturnExchange_styles.web_order_delivery_label}>스탬프</p>
        <p className={cancelReturnExchange_styles.web_order_delivery_count}>0 개</p>
      </div>

      <hr className={cancelReturnExchange_styles.web_order_delivery_membership_divider} />

      <div className={cancelReturnExchange_styles.web_order_delivery_membership_point}>
        <p className={cancelReturnExchange_styles.web_order_delivery_membership_label}>
          통합 멤버십 포인트
        </p>
        <p className={cancelReturnExchange_styles.web_order_delivery_membership_point_count}>
          1,000 p
        </p>
        <p className={cancelReturnExchange_styles.web_order_delivery_membership_point_info}>
          상품 구매 후 구매 확정 시 직접 반영 됩니다.
        </p>
      </div>
    </section>
  );
}

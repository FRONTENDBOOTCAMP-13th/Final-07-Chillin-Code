'use client';

import Link from 'next/link';
import orderDelivery_styles from '@/styles/myPage/orderDelivery.module.css';

export default function MobileNavigation() {
  return (
    <nav className={orderDelivery_styles.mobile_order_delivery_nav}>
      <Link className={orderDelivery_styles.mobile_nav_item} href="/myPage/orderDelivery">
        주문/배송 조회
      </Link>
      <Link className={orderDelivery_styles.mobile_nav_item} href="/myPage/wishlist">
        찜 리스트
      </Link>
      <Link className={orderDelivery_styles.mobile_nav_item} href="/myPage/rewards">
        당첨 내역
      </Link>
    </nav>
  );
}

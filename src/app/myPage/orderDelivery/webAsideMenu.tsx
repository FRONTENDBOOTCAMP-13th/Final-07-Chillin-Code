'use client';

import Link from 'next/link';
import orderDelivery_styles from '@/styles/myPage/orderDelivery.module.css';

export default function WebAsideMenu() {
  return (
    <aside className={orderDelivery_styles.web_order_delivery_aside}>
      <hr className={orderDelivery_styles.web_order_delivery_aside_divider_top} />
      <h1 className={orderDelivery_styles.web_order_delivery_list}>마이페이지</h1>

      <h2 className={orderDelivery_styles.web_order_delivery_list_tit}>쇼핑 정보</h2>
      <ul className={orderDelivery_styles.web_order_delivery_list_text}>
        <li>
          <Link href="/myPage/orderDelivery">• 주문/배송 조회</Link>
        </li>
        <li>
          <Link href="#/myPage/wishlist">• 찜 리스트</Link>
        </li>
      </ul>

      <hr className={orderDelivery_styles.web_order_delivery_aside_divider} />
      <h2 className={orderDelivery_styles.web_order_delivery_list_tit}>혜택 관리</h2>
      <ul className={orderDelivery_styles.web_order_delivery_list_text}>
        <li>
          <Link href="/myPage/stamp">• 스탬프</Link>
        </li>
        <li>
          <Link href="/myPage/rewards">• 당첨 내역</Link>
        </li>
      </ul>

      <hr className={orderDelivery_styles.web_order_delivery_aside_divider} />
      <h2 className={orderDelivery_styles.web_order_delivery_list_tit}>회원 정보</h2>
      <ul className={orderDelivery_styles.web_order_delivery_list_text}>
        <li>
          <Link href="/myPage/authCheck/editUserInfo">• 회원 정보 수정</Link>
        </li>
        <li>
          <Link href="/myPage/marketingAgreement">• 마케팅 수신 동의</Link>
        </li>
        <li>
          <Link href="/myPage/accountDelete">• 회원 탈퇴</Link>
        </li>
        <li>
          <Link href="/addShippingAddress">• 배송지 관리</Link>
        </li>
      </ul>
    </aside>
  );
}

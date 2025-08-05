'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import order_styles from '@/styles/order/order.module.css';
import check_box_styles from '@/styles/components/check-box.module.css';
import Image from 'next/image';
import { useCartStore } from '@/zustand/userCartStore';
import useUserStore from '@/zustand/userStore';
import Link from 'next/link';

export default function MobileTotalPrice() {
  const router = useRouter();
  const { user } = useUserStore();
  const items = useCartStore((state) => state.items);
  const setUser = useUserStore.getState().setUser;
  // 체크박스 상태
  const [termsChecked, setTermsChecked] = useState(false);
  const [orderChecked, setOrderChecked] = useState(false);
  const [ageChecked, setAgeChecked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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
  // 총 개수
  const totalQuantity = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);
  // 모든 체크박스가 체크되었는지 확인
  const allChecked = termsChecked && orderChecked && ageChecked;

  // 주문 데이터 생성 함수
  const generateOrderData = () => {
    return {
      type: 'order',
      user_id: user?._id || 1,
      products: items.map((item) => ({
        _id: parseInt(item.id),
        seller_id: 2,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: {
          path: item.imageSrc,
          name: `${item.name}.jpg`,
        },
        option: `${item.color || ''} ${item.size || ''}`.trim() || '기본옵션',
      })),
      cost: {
        products: totalPrice,
        shippingFees: shippingFee,
        total: finalTotalPrice,
      },
      address: {
        name: user?.name || '고객',
        phone: user?.phone || '',
        address: user?.address || '',
        zipCode: '00000',
      },
      state: 'OS010', // 주문접수
    };
  };

  // 결제하기 버튼 클릭 핸들러
  const handlePayment = async () => {
    if (!allChecked) {
      alert('모든 필수 약관에 동의해주세요.');
      return;
    }

    if (items.length === 0) {
      alert('장바구니에 상품이 없습니다.');
      return;
    }

    if (!user?.token?.accessToken) {
      alert('로그인이 필요합니다.');
      router.push('/login');
      return;
    }

    setIsProcessing(true);

    try {
      // 주문 데이터 생성
      const orderData = generateOrderData();

      // API로 주문 데이터 전송
      const response = await fetch('https://fesp-api.koyeb.app/market/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token.accessToken}`,
          'Client-id': 'febc13-final07-emjf',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '주문 처리에 실패했습니다.');
      }

      const result = await response.json();

      if (result.ok) {
        alert(
          `주문이 완료되었습니다!\n주문번호: ${result.item?.orderNumber || 'ORD-' + Date.now()}`,
        );
        // 스탬프 개수 계산
        const currentStamp = user?.extra?.stamp ?? 0;
        const updatedStamp = currentStamp + totalQuantity;

        try {
          const res = await fetch(`https://fesp-api.koyeb.app/market/users/${user._id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token.accessToken}`,
              'Client-id': 'febc13-final07-emjf',
            },
            body: JSON.stringify({ extra: { stamp: updatedStamp } }),
          });

          if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || '스탬프 업데이트 실패');
          }

          setUser({
            ...user,
            extra: {
              ...user.extra,
              stamp: updatedStamp,
            },
          });
        } catch (err) {
          console.error('스탬프 업데이트 중 에러:', err);
        }
        // 주문 조회 페이지로 이동
        router.push('/myPage/orderDelivery');
      } else {
        throw new Error(result.message || '주문 처리에 실패했습니다.');
      }
    } catch (error) {
      console.error('주문 처리 중 오류 발생:', error);
      const errorMessage = error instanceof Error ? error.message : '오류가 발생했습니다.';
      alert(`주문 처리 중 오류가 발생했습니다.\n${errorMessage}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className={order_styles.mobile_order_total_price_header}>
        <span>최종 결제 금액</span>
        <span className={order_styles.mobile_order_total_price}>
          {formatPrice(finalTotalPrice)}원
        </span>
      </div>

      {/* 결제수단 선택/결제 영역 */}
      <div className={order_styles.mobile_order_total_price_checkbox_wrapper}>
        <div className={order_styles.mobile_order_check_box_row_layout}>
          {/* 체크 박스 */}
          <div className={check_box_styles.check_box_wrapper}>
            <input
              type="checkbox"
              className={check_box_styles.check_input}
              checked={termsChecked}
              onChange={(e) => setTermsChecked(e.target.checked)}
            />
            <label className={check_box_styles.check_box_label}>
              <svg
                width="10"
                height="6.8"
                viewBox="0 0 13 10"
                fill="black"
                xmlns="http://www.w3.org/2000/svg"
                className={check_box_styles.check_box_icon}
              >
                <path
                  d="M4.15364 7.8347L0.859644 4.5427C0.813521 4.49494 0.758348 4.45685 0.697346 4.43065C0.636344 4.40444 0.570734 4.39065 0.504345 4.39007C0.437955 4.3895 0.372115 4.40215 0.310667 4.42729C0.249219 4.45243 0.193393 4.48956 0.146447 4.5365C0.0995002 4.58345 0.0623736 4.63927 0.0372332 4.70072C0.0120927 4.76217 -0.00055803 4.82801 1.88785e-05 4.8944C0.000595787 4.96079 0.0143889 5.0264 0.0405934 5.0874C0.0667979 5.1484 0.104889 5.20358 0.152644 5.2497L4.15264 9.2497L12.1526 1.2497C12.2437 1.1554 12.2941 1.0291 12.293 0.897999C12.2918 0.7669 12.2393 0.641495 12.1466 0.548791C12.0539 0.456086 11.9284 0.403502 11.7973 0.402363C11.6662 0.401223 11.5399 0.451621 11.4456 0.5427L4.15264 7.8347H4.15364Z"
                  fill="currentColor"
                />
              </svg>
            </label>
          </div>
          <div className={order_styles.mobile_order_total_price_wrapper}>
            <span>
              <span className={order_styles.mobile_order_check_require}>(필수)</span> 이용약관
            </span>
            <button type="button">
              <Image src="/icons/circle-arrow-close-icon.svg" fill alt="이용약관 버튼" />
            </button>
          </div>
        </div>

        <div className={order_styles.mobile_order_check_box_row_layout}>
          {/* 체크 박스 */}
          <div className={check_box_styles.check_box_wrapper}>
            <input
              type="checkbox"
              className={check_box_styles.check_input}
              checked={orderChecked}
              onChange={(e) => setOrderChecked(e.target.checked)}
            />
            <label className={check_box_styles.check_box_label}>
              <svg
                width="10"
                height="6.8"
                viewBox="0 0 13 10"
                fill="black"
                xmlns="http://www.w3.org/2000/svg"
                className={check_box_styles.check_box_icon}
              >
                <path
                  d="M4.15364 7.8347L0.859644 4.5427C0.813521 4.49494 0.758348 4.45685 0.697346 4.43065C0.636344 4.40444 0.570734 4.39065 0.504345 4.39007C0.437955 4.3895 0.372115 4.40215 0.310667 4.42729C0.249219 4.45243 0.193393 4.48956 0.146447 4.5365C0.0995002 4.58345 0.0623736 4.63927 0.0372332 4.70072C0.0120927 4.76217 -0.00055803 4.82801 1.88785e-05 4.8944C0.000595787 4.96079 0.0143889 5.0264 0.0405934 5.0874C0.0667979 5.1484 0.104889 5.20358 0.152644 5.2497L4.15264 9.2497L12.1526 1.2497C12.2437 1.1554 12.2941 1.0291 12.293 0.897999C12.2918 0.7669 12.2393 0.641495 12.1466 0.548791C12.0539 0.456086 11.9284 0.403502 11.7973 0.402363C11.6662 0.401223 11.5399 0.451621 11.4456 0.5427L4.15264 7.8347H4.15364Z"
                  fill="currentColor"
                />
              </svg>
            </label>
          </div>
          <span>
            <span className={order_styles.mobile_order_check_require}>(필수) </span>주문 내용 확인
            및 결제 동의
          </span>
        </div>

        <div className={order_styles.mobile_order_check_box_row_layout}>
          {/* 체크 박스 */}
          <div className={check_box_styles.check_box_wrapper}>
            <input
              type="checkbox"
              className={check_box_styles.check_input}
              checked={ageChecked}
              onChange={(e) => setAgeChecked(e.target.checked)}
            />
            <label className={check_box_styles.check_box_label}>
              <svg
                width="10"
                height="6.8"
                viewBox="0 0 13 10"
                fill="black"
                xmlns="http://www.w3.org/2000/svg"
                className={check_box_styles.check_box_icon}
              >
                <path
                  d="M4.15364 7.8347L0.859644 4.5427C0.813521 4.49494 0.758348 4.45685 0.697346 4.43065C0.636344 4.40444 0.570734 4.39065 0.504345 4.39007C0.437955 4.3895 0.372115 4.40215 0.310667 4.42729C0.249219 4.45243 0.193393 4.48956 0.146447 4.5365C0.0995002 4.58345 0.0623736 4.63927 0.0372332 4.70072C0.0120927 4.76217 -0.00055803 4.82801 1.88785e-05 4.8944C0.000595787 4.96079 0.0143889 5.0264 0.0405934 5.0874C0.0667979 5.1484 0.104889 5.20358 0.152644 5.2497L4.15264 9.2497L12.1526 1.2497C12.2437 1.1554 12.2941 1.0291 12.293 0.897999C12.2918 0.7669 12.2393 0.641495 12.1466 0.548791C12.0539 0.456086 11.9284 0.403502 11.7973 0.402363C11.6662 0.401223 11.5399 0.451621 11.4456 0.5427L4.15264 7.8347H4.15364Z"
                  fill="currentColor"
                />
              </svg>
            </label>
          </div>
          <span>
            <span className={order_styles.mobile_order_check_require}>(필수) </span>만 14세
            이상입니다.
          </span>
        </div>
      </div>

      {/* 장바구니, 결제하기 버튼 영역 */}
      <div className={order_styles.mobile_order_total_button_wrapper}>
        <Link className={order_styles.mobile_order_cart_button} href="/shoppingcart">
          장바구니
        </Link>
        <button
          className={order_styles.mobile_order_pay_button}
          onClick={handlePayment}
          disabled={!allChecked || isProcessing}
          style={{
            opacity: !allChecked || isProcessing ? 0.8 : 1,
            cursor: !allChecked || isProcessing ? 'not-allowed' : 'pointer',
          }}
        >
          결제하기
        </button>
      </div>

      {/* 최하단 결제내역 설명 영역 */}
      <div className={order_styles.mobile_order_footer_section}>
        <span>• 회원할인이 적용되는 경우 실제 상품가와 판매가가 노출됩니다.</span>
        <span>
          • 특가상품 및 일부상품은 스탬프 적용이 제한됩니다. 스탬프 적용은{' '}
          <strong>마이페이지&gt;당첨내역</strong>에서 확인가능합니다.
        </span>
        <span>• 스탬프는 상품 1개 구매시 1개씩 적립됩니다.</span>
        <span>• 50,000원 이상 구매 시 무료배송입니다.</span>
      </div>
    </>
  );
}

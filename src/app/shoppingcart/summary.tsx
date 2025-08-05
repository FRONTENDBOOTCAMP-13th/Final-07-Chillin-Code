'use client';

import styles from '@/styles/components/button.module.css';
import shopping_cart_styles from '@/styles/shoppingCart/shoppingCart.module.css';
import { useCartStore } from '@/zustand/userCartStore';
import { useRouter } from 'next/navigation';

interface SummaryProps {
  viewType: 'mobile' | 'web';
}

export default function Summary({ viewType }: SummaryProps) {
  const isMobile = viewType === 'mobile';
  const items = useCartStore((state) => state.items);
  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const router = useRouter();

  const handlePayment = () => {
    if (items.length === 0) {
      alert('장바구니가 비어 있습니다.');
      return;
    }
    router.push('/order');
  };
  return (
    <div
      className={
        isMobile
          ? shopping_cart_styles.mobile_shopping_cart_recipe_section
          : shopping_cart_styles.web_shopping_cart_recipe_section
      }
    >
      <div
        className={
          isMobile
            ? shopping_cart_styles.mobile_shopping_cart_recipe_text_wrapper
            : shopping_cart_styles.web_shopping_cart_recipe_text_wrapper
        }
      >
        <span>SUMMARY</span>
      </div>

      <div
        className={
          isMobile
            ? shopping_cart_styles.mobile_shopping_cart_recipe_buy_wrapper
            : shopping_cart_styles.web_shopping_cart_recipe_buy_wrapper
        }
      >
        <span>구매내역</span>
      </div>

      <div
        className={
          isMobile
            ? shopping_cart_styles.mobile_shopping_cart_recipe_new_item_wrapper
            : shopping_cart_styles.web_shopping_cart_recipe_new_item_wrapper
        }
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={
              isMobile
                ? shopping_cart_styles.mobile_shopping_cart_recipe_item_row_wrapper
                : shopping_cart_styles.web_shopping_cart_recipe_item_row_wrapper
            }
          >
            {/* 상품명 줄 */}
            <div
              className={
                isMobile
                  ? shopping_cart_styles.mobile_shopping_cart_recipe_item_label_row
                  : shopping_cart_styles.web_shopping_cart_recipe_item_label_row
              }
            >
              <span className={shopping_cart_styles.item_title}>상품명</span>
              <span>{item.name}</span>
            </div>

            {/* 상품 가격 줄 */}
            <div
              className={
                isMobile
                  ? shopping_cart_styles.mobile_shopping_cart_recipe_item_label_row
                  : shopping_cart_styles.web_shopping_cart_recipe_item_label_row
              }
            >
              <span className={shopping_cart_styles.item_title}>상품 가격</span>
              <span>{(item.price * item.quantity).toLocaleString()} 원</span>
            </div>
          </div>
        ))}
      </div>

      <div
        className={
          isMobile
            ? shopping_cart_styles.mobile_shopping_cart_recipe_total_price_wrapper
            : shopping_cart_styles.web_shopping_cart_recipe_total_price_wrapper
        }
      >
        <span>총 가격</span>
        <span>{totalPrice.toLocaleString()} 원</span>
      </div>

      <div
        className={
          isMobile
            ? shopping_cart_styles.mobile_shopping_cart_buy_button_wrapper
            : shopping_cart_styles.web_shopping_cart_buy_button_wrapper
        }
      >
        <button className={styles.payment_button} onClick={handlePayment}>
          결제하기
        </button>
      </div>
    </div>
  );
}

'use client';
import detail_styles from '@/styles/detailPage/detailPage.module.css';
import styles from '@/styles/components/button.module.css';

interface ProductDetailContentProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function ProductDetailCalc({
  quantity,
  onIncrease,
  onDecrease,
}: ProductDetailContentProps) {
  return (
    <div
      className={`${detail_styles.web_detail_quantity_button} ${detail_styles.mobile_detail_quantity_button}`}
    >
      <button className={styles.calc_minus_button} onClick={onDecrease} aria-label="수량 감소">
        <svg
          width="15"
          height="1"
          viewBox="0 0 14 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0.5 1V0H13.5V1H0.5Z" fill="black" />
        </svg>
      </button>

      <button className={styles.calc_number_button}>{quantity}</button>

      <button className={styles.calc_plus_button} onClick={onIncrease} aria-label="수량 증가">
        <svg
          width="15"
          height="15"
          viewBox="0 0 14 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.292969 7V6H6.29297V0H7.29297V6H13.293V7H7.29297V13H6.29297V7H0.292969Z"
            fill="black"
          />
        </svg>
      </button>
    </div>
  );
}

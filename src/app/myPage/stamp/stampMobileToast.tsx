'use client';
import styles from '@/styles/components/button.module.css';
import stamp_page_styles from '@/styles/stamp/stamp.module.css';
import Image from 'next/image';
import { productFetch } from '@/app/fetch/product';
import { useEffect, useState } from 'react';
import { Product } from '@/app/types/productType';

interface StampMobileToastProps {
  onClose: () => void;
}

export default function StampMobileToast({ onClose }: StampMobileToastProps) {
  const [rollingProducts, setRollingProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRolling, setIsRolling] = useState(true);
  const [winner, setWinner] = useState<Product | null>(null);
// 스탬프 가챠 애니메이션
  useEffect(() => {
    async function startGatcha() {
      const res = await productFetch();
      if (res.ok && res.item.length > 0) {
        const shuffled = res.item.sort(() => 0.5 - Math.random());
        const previewItems = shuffled.slice(0, 10);
        setRollingProducts(previewItems);

        let index = 0;
        const interval = setInterval(() => {
          setCurrentIndex(index);
          index++;

          if (index >= previewItems.length) {
            clearInterval(interval);
            setWinner(previewItems[previewItems.length - 1]);
            setIsRolling(false);
          }
        }, 250);
      }
    }

    startGatcha();
  }, []);

  const currentProduct = rollingProducts[currentIndex];
  const imagePath = (isRolling ? currentProduct : winner)?.mainImages?.[0]?.path;
  return (
    <div className={stamp_page_styles.mobile_toast_ui_root_header}>
      <div className={stamp_page_styles.mobile_toast_ui_header_text}>
        <h2>
          <span className={stamp_page_styles.mobile_toast_ui_user_name}>김진섭</span>님 축하합니다!
        </h2>
        <span>
          당신은 아래 상품에
          <span className={stamp_page_styles.mobile_toast_ui_lotto_text}>당첨</span> 되셨습니다!
        </span>
      </div>

      <div className={stamp_page_styles.mobile_toast_ui_item_wrapper}>
        <div className={stamp_page_styles.mobile_toast_ui_confetti_wrapper}>
          <Image src="/images/stampImages/toastUI/confetti.svg" fill alt="빵빠레 이미지" />
        </div>
        <div className={stamp_page_styles.mobile_toast_ui_lotto_item}>
          {imagePath && <Image src={`/${imagePath}`} fill alt="상품 이미지" sizes="140px" />}
        </div>
      </div>

      {!isRolling && winner && (
        <div className={stamp_page_styles.mobile_toast_ui_item_info}>
          <div className={stamp_page_styles.mobile_toast_ui_item_section}>
            <div className={stamp_page_styles.mobile_toast_ui_item_title_wrapper}>
              <span className={stamp_page_styles.mobile_toast_ui_item_title}>상품명</span>
              <span className={stamp_page_styles.mobile_toast_ui_item_brand}>브랜드</span>
            </div>
            <div className={stamp_page_styles.mobile_toast_ui_item_info_wrapper}>
              <span className={stamp_page_styles.mobile_toast_ui_item_name}>{winner.name}</span>
              <span className={stamp_page_styles.mobile_toast_ui_item_brand_name}>
                {winner.extra.movie}
              </span>
            </div>
          </div>
          <div className={stamp_page_styles.mobile_toast_ui_button_wrapper}>
            <button className={styles.close_button} onClick={onClose}>
              닫기
            </button>
            <button className={styles.quick_link_button}>바로가기</button>
          </div>
          <div className={stamp_page_styles.mobile_toast_ui_footer_text}>
            <span>상품은 마이페이지 &gt; 혜택관리 &gt; 당첨내역에서 확인하세요!</span>
          </div>
        </div>
      )}
    </div>
  );
}

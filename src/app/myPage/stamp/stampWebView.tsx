'use client';
import { useState } from 'react';
import stamp_page_styles from '@/styles/stamp/stamp.module.css';

import StampWebMainContent from '@/app/myPage/stamp/StampWebMainContent';
import StampWebSideContent from '@/app/myPage/stamp/StampWebSideContent';
import StampWebToast from '@/app/myPage/stamp/StampWebToast';
import StampWebSideToast from '@/app/myPage/stamp/StampWebSideToast';
import WebAsideMenu from '../orderDelivery/webAsideMenu';

export default function StampWebView() {
  const [toast, setToast] = useState(false);
  const showToast = () => setToast(true);
  const closeToast = () => setToast(false);

  return (
    <div className={stamp_page_styles.web_root_section}>
      <div className={stamp_page_styles.web_path_wrapper}>
        HOME &gt; 마이페이지 &gt; 혜택관리 &gt; <span>스탬프</span>
      </div>

      <div className={stamp_page_styles.web_main_page_section}>
        <WebAsideMenu />
        <StampWebMainContent />
        <StampWebSideContent onClick={showToast} />
        {toast && (
          <>
            <StampWebToast onClose={closeToast} />
            <StampWebSideToast onClose={closeToast} />
          </>
        )}
      </div>
    </div>
  );
}

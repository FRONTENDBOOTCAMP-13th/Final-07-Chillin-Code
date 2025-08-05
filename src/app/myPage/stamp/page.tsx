import stamp_page_styles from '@/styles/stamp/stamp.module.css';
import StampMobileUserInfo from '@/app/myPage/stamp/stampMobileUserInfo';
import StampMobileBoard from '@/app/myPage/stamp/stampMobileBoard';
import StampWebView from '@/app/myPage/stamp/stampWebView';

export default function StampPage() {
  return (
    <>
      {/* 모바일 영역 */}

      <div className={stamp_page_styles.mobile_root_section}>
        <div className={stamp_page_styles.mobile_user_info_section}>
          <StampMobileUserInfo />
        </div>

        <StampMobileBoard />
      </div>

      {/* 웹뷰 영역 */}
      <StampWebView />
    </>
  );
}

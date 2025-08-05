'use client';
import Image from 'next/image';
import stamp_page_styles from '@/styles/stamp/stamp.module.css';
import useUserStore from '@/zustand/userStore';
import Link from 'next/link';

export default function StampWebSideContent({ onClick }: { onClick: () => void }) {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const isAdmin = user?.type === 'admin';
  const stampCount = user?.extra?.stamp ?? 0;
  const handleIncreaseStamp = async () => {
    if (!user || !isAdmin || stampCount >= 8) return;

    try {
      const res = await fetch(`https://fesp-api.koyeb.app/market/users/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token?.accessToken}`,
          'Client-Id': 'febc13-final07-emjf',
        },
        body: JSON.stringify({ extra: { stamp: stampCount + 1 } }),
      });

      const data = await res.json();
      if (res.ok) {
        setUser({ ...user, extra: { ...user.extra, stamp: stampCount + 1 } });
      } else {
        console.error('도장 증가 실패:', data?.message);
      }
    } catch (err) {
      console.error('도장 요청 오류', err);
    }
  };
  return (
    <>
      <div className={stamp_page_styles.web_side_section}>
        <div className={stamp_page_styles.web_side_user_info_wrapper}>
          <div className={stamp_page_styles.web_side_user_top_wrapper}>
            <span>안녕하세요</span>
            <div className={stamp_page_styles.web_side_user_name_section}>
              <span className={stamp_page_styles.web_side_user_name}>{user?.name ?? '회원'}</span>
              <span>회원님</span>
            </div>
          </div>
          <div className={stamp_page_styles.web_side_bottom_wrapper}>
            <span>현재 스탬프 개수 :</span>
            <span>{user?.extra?.stamp ?? 0}개</span>
          </div>
          {isAdmin && stampCount < 8 && (
            <button onClick={handleIncreaseStamp} className={stamp_page_styles.admin_button}>
              관리자의 권능
            </button>
          )}
          <div className={stamp_page_styles.web_side_blackbean_Image_wrapper}>
            <Image
              src="/images/stampImages/stamp-web-blackbean-image.svg"
              fill
              alt="숯검댕이 이미지"
            />
          </div>
        </div>

        <div className={stamp_page_styles.web_side_stamp_link_image_wrapper}>
          <Link href="/" className={stamp_page_styles.web_side_stamp_more_image_wrapper}>
            <Image
              src="/images/stampImages/stamp-more-image.svg"
              fill
              alt="스탬프 더 모으기 이미지"
            />
            <div className={stamp_page_styles.web_side_stamp_image_overlay}></div>
            <div className={stamp_page_styles.web_side_stamp_guide_text}>
              <span className={stamp_page_styles.web_side_stamp_guide_text_title}>
                스탬프가 부족하신가요?
              </span>
              <span className={stamp_page_styles.web_side_stamp_guide_text_sub_title}>
                지금 바로 스탬프 모으러 가기 &gt;
              </span>
            </div>
          </Link>

          <div
            role="button"
            tabIndex={0}
            onClick={onClick}
            className={stamp_page_styles.web_side_stamp_gacha_image_wrapper}
          >
            <Image
              src="/images/stampImages/stamp-web-gacha-image.svg"
              fill
              alt="스탬프 가챠 이미지"
            />
            <div className={stamp_page_styles.web_side_stamp_image_overlay}></div>
            <div className={stamp_page_styles.web_side_stamp_guide_text}>
              <span className={stamp_page_styles.web_side_stamp_guide_text_title}>
                스탬프를 다 모으셨나요?
              </span>
              <span className={stamp_page_styles.web_side_stamp_guide_text_sub_title}>
                지금 바로 뽑기 가기 &gt;
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

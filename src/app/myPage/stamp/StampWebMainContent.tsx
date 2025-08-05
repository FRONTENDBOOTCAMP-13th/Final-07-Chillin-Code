'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useUserStore from '@/zustand/userStore';
import stampStyles from '@/styles/stamp/stamp.module.css';
import StampWebToast from '@/app/myPage/stamp/StampWebToast';

const STAMP_IMAGES = [
  'firstStamp.svg',
  'secondStamp.svg',
  'thirdStamp.svg',
  'fourthStamp.svg',
  'fifthStamp.svg',
  'sixthStamp.svg',
  'seventhStamp.svg',
  'eighthStamp.svg',
];

const STAMP_POSITIONS = [
  { top: '31%', left: '50.5%' },
  { top: '47%', left: '79%' },
  { top: '50%', left: '50%' },
  { top: '58%', left: '21.5%' },
  { top: '68%', left: '50.5%' },
  { top: '72%', left: '78%' },
  { top: '86%', left: '50%' },
  { top: '76%', left: '21%' },
];

export default function StampWebMainContent() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const stampCount = user?.extra?.stamp ?? 0;

  const [animateIndex, setAnimateIndex] = useState<number | null>(null);
  const [openToast, setOpenToast] = useState(false);

  // 애니메이션 도장 설정
  useEffect(() => {
    const prev = Number(localStorage?.getItem('prevStampCount') ?? '0');
    if (stampCount > prev) {
      setAnimateIndex(stampCount - 1);
      localStorage?.setItem('prevStampCount', String(stampCount));
    }
  }, [stampCount]);

  const safeCount = Math.min(stampCount, 8);

  const newStampCount = stampCount - 8;
  const handleGacha = async () => {
    if (!user) return;
    if (stampCount < 8) {
      alert('스탬프 8개를 모두 모아야 뽑기가 가능합니다.');
      return;
    }

    try {
      const res = await fetch(`https://fesp-api.koyeb.app/market/users/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token?.accessToken}`,
          'Client-Id': 'febc13-final07-emjf',
        },
        body: JSON.stringify({ extra: { stamp: newStampCount } }),
      });

      const data = await res.json();
      if (res.ok) {
        setUser({ ...user, extra: { ...user.extra, stamp: newStampCount } });

        setOpenToast(true);
      } else {
        console.error('가챠 실패:', data?.message);
      }
    } catch (err) {
      console.error('가챠 요청 오류', err);
    }
  };

  return (
    <div className={stampStyles.web_main_page}>
      <div className={stampStyles.web_main_view_section}>
        {/* 유저 정보 */}
        <div className={stampStyles.web_user_info_wrapper}>
          <div className={stampStyles.web_user_top_wrapper}>
            <span>안녕하세요</span>
            <div className={stampStyles.web_user_name}>
              <span>{user?.name ?? '회원'}</span>
              <span>님</span>
            </div>
          </div>
          <div className={stampStyles.web_bottom_wrapper}>
            <span>현재 스탬프 개수 :</span>
            <span>{stampCount}개</span>
          </div>
          <div className={stampStyles.web_blackbean_Image_wrapper}>
            <Image src="/images/stampImages/stamp-blackbean-image.svg" fill alt="숯검댕이 이미지" />
          </div>
        </div>

        {/* 스탬프 보드 */}
        <div className={stampStyles.web_stamp_image_wrapper}>
          <Image src="/images/stampImages/stamp-image.svg" alt="스탬프 이미지" fill />
          {STAMP_IMAGES.slice(0, safeCount).map((img, i) => (
            <div
              key={i}
              className={`${stampStyles.stamp_base} ${i === animateIndex ? stampStyles.stamp_animate : ''}`}
              style={{
                position: 'absolute',
                top: STAMP_POSITIONS[i].top,
                left: STAMP_POSITIONS[i].left,
                transform: 'translate(-50%, -50%)',
                width: '120px',
                height: '120px',
              }}
            >
              <Image src={`/images/stampImages/stamp/${img}`} alt={`스탬프 ${i + 1}`} fill />
            </div>
          ))}
        </div>

        {/* 버튼 영역 */}
        <div className={stampStyles.web_stamp_link_image_wrapper}>
          {/* 스탬프 더 모으기 */}
          <Link href="/" className={stampStyles.web_stamp_more_image_wrapper}>
            <Image src="/images/stampImages/stamp-more-image.svg" alt="스탬프 더 모으기" fill />
            <div className={stampStyles.web_stamp_image_overlay}></div>
            <div className={stampStyles.web_stamp_guide_text}>
              <span className={stampStyles.web_stamp_guide_text_title}>스탬프가 부족하신가요?</span>
              <span className={stampStyles.web_stamp_guide_text_sub_title}>
                지금 바로 스탬프 모으러 가기 &gt;
              </span>
            </div>
          </Link>

          {/* 가챠 버튼 */}
          <div
            role="button"
            tabIndex={0}
            onClick={handleGacha}
            className={stampStyles.web_stamp_gacha_image_wrapper}
          >
            <Image src="/images/stampImages/stamp-gacha-image.svg" alt="스탬프 가챠" fill />
            <div className={stampStyles.web_stamp_image_overlay}></div>
            <div className={stampStyles.web_stamp_guide_text}>
              <span className={stampStyles.web_stamp_guide_text_title}>
                스탬프를 다 모으셨나요?
              </span>
              <span className={stampStyles.web_stamp_guide_text_sub_title}>
                지금 바로 뽑기 가기 &gt;
              </span>
            </div>
          </div>
        </div>

        {openToast && <StampWebToast onClose={() => setOpenToast(false)} />}
      </div>
    </div>
  );
}

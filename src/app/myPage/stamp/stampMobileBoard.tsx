'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import useUserStore from '@/zustand/userStore';
import stampStyles from '@/styles/stamp/stamp.module.css';
import StampMobileToast from './stampMobileToast';
import Link from 'next/link';

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

export default function StampMobileBoard() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const stampCount = user?.extra?.stamp ?? 0;
  const [animateIndex, setAnimateIndex] = useState<number | null>(null);
  const [openToast, setOpenToast] = useState(false);
  const safeCount = Math.min(stampCount, STAMP_IMAGES.length);

  // 애니메이션 도장 설정
  useEffect(() => {
    const prev = Number(localStorage?.getItem('prevStampCount') ?? '0');
    if (stampCount > prev) {
      setAnimateIndex(stampCount - 1);
      localStorage?.setItem('prevStampCount', String(stampCount));
    }
  }, [stampCount]);
  const newStampCount = stampCount - 8;
  // 가챠 실행 제어
  const handleGacha = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (stampCount < 8) {
      alert('스탬프 8개를 모두 모아야 가챠를 할 수 있습니다!');
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
        setUser({ ...user, extra: { ...user.extra, stamp: 0 } });
        localStorage.setItem('prevStampCount', '0');
        setOpenToast(true);
      } else {
        console.error('가챠 실패', data?.message);
      }
    } catch (err) {
      console.error('가챠 요청 오류', err);
    }
  };

  return (
    <>
      {/* 스탬프 보드 */}
      <div className={stampStyles.mobile_stamp_image_wrapper} style={{ position: 'relative' }}>
        <Image src="/images/stampImages/stamp-image.svg" alt="스탬프 보드 배경" fill />

        {STAMP_IMAGES.slice(0, safeCount).map((img, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: STAMP_POSITIONS[i].top,
              left: STAMP_POSITIONS[i].left,
              transform: 'translate(-50%, -50%)',
              width: '80px',
              height: '80px',
            }}
            className={i === animateIndex ? stampStyles.stamp_animate : ''}
          >
            <Image src={`/images/stampImages/stamp/${img}`} alt={`스탬프 ${i + 1}`} fill />
          </div>
        ))}
      </div>

      {/* 가챠 버튼 영역 */}
      <div className={stampStyles.mobile_stamp_link_image_wrapper}>
        {/* 스탬프 모으기 영역 */}
        <Link href="/" className={stampStyles.mobile_stamp_more_image_wrapper}>
          <Image src="/images/stampImages/stamp-more-image.svg" alt="스탬프 더 모으기" fill />
          <div className={stampStyles.mobile_stamp_image_overlay}></div>
          <div className={stampStyles.mobile_stamp_guide_text}>
            <span className={stampStyles.mobile_stamp_guide_text_title}>
              스탬프가 부족하신가요?
            </span>
            <span className={stampStyles.mobile_stamp_guide_text_sub_title}>
              지금 바로 스탬프 모으러 가기 &gt;
            </span>
          </div>
        </Link>

        {/* 가챠 버튼 */}
        <div
          role="button"
          tabIndex={0}
          onClick={handleGacha}
          className={stampStyles.mobile_stamp_gacha_image_wrapper}
        >
          <Image
            src="/images/stampImages/stamp-gacha-image.svg"
            width={166}
            height={124}
            alt="스탬프 가챠"
          />
          <div className={stampStyles.mobile_stamp_image_overlay}></div>
          <div className={stampStyles.mobile_stamp_guide_text}>
            <span className={stampStyles.mobile_stamp_guide_text_title}>
              스탬프를 다 모으셨나요?
            </span>
            <span className={stampStyles.mobile_stamp_guide_text_sub_title}>
              지금 바로 뽑기 가기 &gt;
            </span>
          </div>
        </div>

        {/* 가챠 결과 토스트 */}
        {openToast && <StampMobileToast onClose={() => setOpenToast(false)} />}
      </div>
    </>
  );
}

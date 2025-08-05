'use client';
import rewards_page_styles from '@/styles/myPage/rewards/rewards.module.css';
import styles from '@/styles/components/button.module.css'; // 버튼 컴포넌트 css
import Image from 'next/image';
import { useState } from 'react';
import wishlist_styles from '@/styles/myPage/wishlist.module.css';
import WebAsideMenu from '../orderDelivery/webAsideMenu';

export default function Rewards() {
  const [startDate, setStartDate] = useState(getToday());
  const [endDate, setEndDate] = useState(getToday());

  // 오늘 날짜 반환
  function getToday() {
    return formatDate(new Date());
  }

  // 날짜 → YYYYMMDD 로 반환하는 함수
  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }

  // 기준일로부터 날짜 계산
  function getNewDate(baseDateStr: string, plus: { day?: number; month?: number; year?: number }) {
    const year = parseInt(baseDateStr.slice(0, 4), 10);
    const month = parseInt(baseDateStr.slice(4, 6), 10) - 1; // JS는 0부터 시작
    const day = parseInt(baseDateStr.slice(6, 8), 10);

    const base = new Date(year, month, day);

    if (plus.day) base.setDate(base.getDate() + plus.day);
    if (plus.month) base.setMonth(base.getMonth() + plus.month);
    if (plus.year) base.setFullYear(base.getFullYear() + plus.year);

    return formatDate(base);
  }

  return (
    <>
      {/* 모바일 뷰 */}
      <div className={rewards_page_styles.mobile_root_header}>
        <div className={rewards_page_styles.mobile_user_info_section}>
          <div className={rewards_page_styles.mobile_user_info_wrapper}>
            <Image src="/images/sprout-image.svg" width={45} height={35} alt="새싹 이미지" />
            <span className={rewards_page_styles.mobile_user_info}>
              <span className={rewards_page_styles.mobile_user_name}>김진섭</span>님의 당첨내역
            </span>
          </div>
          <div className={rewards_page_styles.mobile_user_result_wrapper}>
            <div className={rewards_page_styles.mobile_have_stamp}>
              <span className={rewards_page_styles.mobile_have_stamp_text}>보유중인 스탬프</span>
              <span className={rewards_page_styles.mobile_have_stamp_count}>0개</span>
            </div>
            <div className={rewards_page_styles.mobile_get_gift}>
              <span className={rewards_page_styles.mobile_get_gift_text}>수령한 상품</span>
              <span className={rewards_page_styles.mobile_get_gift_count}>0개</span>
            </div>
          </div>
        </div>
        <div className={rewards_page_styles.mobile_view_lottery_result_section}>
          <h2>당첨 내역 조회</h2>
          <hr className={rewards_page_styles.mobile_lottery_main_bottom_line} />
          <div className={rewards_page_styles.mobile_view_lottery_result}>
            <span>조회기간</span>
            <div className={rewards_page_styles.mobile_view_lottery_day_wrapper}>
              <button
                type="button"
                onClick={() => {
                  const today = getToday();
                  setStartDate(today);
                  setEndDate(today);
                }}
              >
                오늘
              </button>
              <button type="button" onClick={() => setEndDate(getNewDate(startDate, { day: 7 }))}>
                7일
              </button>
              <button type="button" onClick={() => setEndDate(getNewDate(startDate, { day: 15 }))}>
                15일
              </button>
              <button type="button" onClick={() => setEndDate(getNewDate(startDate, { month: 1 }))}>
                1개월
              </button>
              <button type="button" onClick={() => setEndDate(getNewDate(startDate, { month: 3 }))}>
                3개월
              </button>
              <button type="button" onClick={() => setEndDate(getNewDate(startDate, { year: 1 }))}>
                1년
              </button>
            </div>

            <div className={rewards_page_styles.mobile_view_lottery_day_result_wrapper}>
              <div className={rewards_page_styles.mobile_view_lottery_day_first}>
                <input
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className={rewards_page_styles.mobile_view_lottery_day_second}>
                <input type="text" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
              <button type="button" className={styles.inquiry_button}>
                조회
              </button>
            </div>
          </div>
        </div>
        <div className={rewards_page_styles.mobile_lottery_result_section}>
          <h2>당첨 내역</h2>
          <div className={rewards_page_styles.mobile_lottery_result_header}>
            <div>날짜/당첨번호</div>
            <div>상품명/옵션</div>
            <div>상품금액</div>
            <div>진행상태</div>
            <div>주문날짜</div>
          </div>

          {/* 반복 렌더링되는 부분 */}
          <div className={rewards_page_styles.mobile_lottery_result_row}>
            <div>2025/07/10</div>
            <div className={rewards_page_styles.mobile_item_name}>
              [제로] 치히로의 행방불명의 흰여고(...)
            </div>
            <div>16,000원</div>
            <div>주문완료</div>
            <div>2025/07/10</div>
          </div>
        </div>
      </div>
      {/* 웹뷰 */}
      <div className={rewards_page_styles.web_root_header}>
        {/* 상단 경로 */}
        <div className={rewards_page_styles.web_root_path}>
          HOME &gt; 마이페이지 &gt; 혜택관리 &gt;{' '}
          <span className={rewards_page_styles.web_recent_path}>당첨내역</span>
        </div>
        {/* 메인 페이지 */}
        <div className={rewards_page_styles.web_main_page_section}>
          {/* 왼쪽 사이드 메뉴 */}
          <WebAsideMenu />
          <div className={rewards_page_styles.web_main_page_wrapper}>
            <section className={wishlist_styles.web_wishlist_membership_wrapper}>
              <div className={wishlist_styles.web_wishlist_membership}>
                <p className={wishlist_styles.web_wishlist_membership_name}>장유하님의</p>
                <div className={rewards_page_styles.benefit_text}>혜택관리</div>
              </div>
              <hr className={wishlist_styles.web_wishlist_membership_divider} />
              <div className={wishlist_styles.web_wishlist_stamp}>
                <p className={wishlist_styles.web_wishlist_label}>스탬프</p>
                <p className={wishlist_styles.web_wishlist_count}>0 개</p>
              </div>
              <hr className={wishlist_styles.web_wishlist_membership_divider} />
              <div className={wishlist_styles.web_wishlist_membership_point}>
                <p className={wishlist_styles.web_wishlist_membership_label}>통합 멤버십 포인트</p>
                <p className={wishlist_styles.web_wishlist_membership_point_count}>1,000 p</p>
                <p className={wishlist_styles.web_wishlist_membership_point_info}>
                  상품 구매 후 구매 확정 시 직접 반영 됩니다.
                </p>
              </div>
            </section>

            <div className={rewards_page_styles.web_view_lottery_result_section}>
              <h2>당첨 내역 조회</h2>
              <hr className={rewards_page_styles.web_lottery_main_bottom_line} />
              <div className={rewards_page_styles.web_view_lottery_result}>
                <span>조회기간</span>
                <div className={rewards_page_styles.web_view_lottery_day_wrapper}>
                  <button
                    type="button"
                    onClick={() => {
                      const today = getToday();
                      setStartDate(today);
                      setEndDate(today);
                    }}
                  >
                    오늘
                  </button>
                  <button
                    type="button"
                    onClick={() => setEndDate(getNewDate(startDate, { day: 7 }))}
                  >
                    7일
                  </button>
                  <button
                    type="button"
                    onClick={() => setEndDate(getNewDate(startDate, { day: 15 }))}
                  >
                    15일
                  </button>
                  <button
                    type="button"
                    onClick={() => setEndDate(getNewDate(startDate, { month: 1 }))}
                  >
                    1개월
                  </button>
                  <button
                    type="button"
                    onClick={() => setEndDate(getNewDate(startDate, { month: 3 }))}
                  >
                    3개월
                  </button>
                  <button
                    type="button"
                    onClick={() => setEndDate(getNewDate(startDate, { year: 1 }))}
                  >
                    1년
                  </button>
                </div>

                <div className={rewards_page_styles.web_view_lottery_day_result_wrapper}>
                  <div className={rewards_page_styles.web_view_lottery_day_first}>
                    <input
                      type="text"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className={rewards_page_styles.web_view_lottery_day_second}>
                    <input
                      type="text"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className={`${styles.inquiry_button} ${rewards_page_styles.view_rewards_button}`}
                  >
                    조회
                  </button>
                </div>
              </div>
            </div>
            <div className={rewards_page_styles.web_lottery_result_section}>
              <h2>당첨 내역</h2>
              <div className={rewards_page_styles.web_lottery_result_header}>
                <div>날짜/당첨번호</div>
                <div>상품명/옵션</div>
                <div>상품금액</div>
                <div>진행상태</div>
                <div>주문날짜</div>
              </div>

              {/* 반복 렌더링되는 부분 */}
              <div className={rewards_page_styles.web_lottery_result_row}>
                <div>2025/07/10</div>
                <div className={rewards_page_styles.web_item_name}>
                  [제로] 치히로의 행방불명의 흰여고(...)
                </div>
                <div>16,000원</div>
                <div>주문완료</div>
                <div>2025/07/10</div>
              </div>
              {/* 반복 렌더링되는 부분 */}
              <div className={rewards_page_styles.web_lottery_result_row}>
                <div>2025/07/10</div>
                <div className={rewards_page_styles.web_item_name}>
                  [제로] 치히로의 행방불명의 흰여고(...)
                </div>
                <div>16,000원</div>
                <div>주문완료</div>
                <div>2025/07/10</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

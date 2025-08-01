'use client';
import stamp_page_styles from '@/styles/stamp/stamp.module.css';
import Image from 'next/image';
import { useState } from 'react';
import styles from '@/styles/components/button.module.css';
import cancelReturnExchange_styles from '@/styles/myPage/cancelReturnExchange.module.css';
import Link from 'next/link';
export default function StampPage() {
  const [toast, setToast] = useState<boolean>(false);

  function showToast() {
    console.log('토스트 !');
    setToast(true);
  }
  return (
    <>
      {/* 모바일 영역 */}
      <div className={stamp_page_styles.mobile_root_section}>
        <div className={stamp_page_styles.mobile_user_info_section}>
          <div className={stamp_page_styles.mobile_user_info_wrapper}>
            <span className={stamp_page_styles.mobile_hello}>안녕하세요</span>{' '}
            <span className={stamp_page_styles.mobile_user_name}>김진섭 회원님</span>
          </div>
          <span className={stamp_page_styles.mobile_now_stamp_count}>현재 스탬프 개수 : 8개</span>
          <div className={stamp_page_styles.mobile_blackbean_image_wrapper}>
            <Image src="/images/stampImages/stamp-blackbean-image.svg" fill alt="숯검댕이 이미지" />
          </div>
        </div>
        <div className={stamp_page_styles.mobile_stamp_image_wrapper}>
          <Image fill src="/images/stampImages/stamp-image.svg" alt="스탬프 이미지" />
        </div>
        <div className={stamp_page_styles.mobile_stamp_link_image_wrapper}>
          <div className={stamp_page_styles.mobile_stamp_more_image_wrapper}>
            <Image
              src="/images/stampImages/stamp-more-image.svg"
              fill
              alt="스탬프 더 모으기 이미지"
            />
            <div className={stamp_page_styles.mobile_stamp_image_overlay}></div>
            <div className={stamp_page_styles.mobile_stamp_guide_text}>
              <span className={stamp_page_styles.mobile_stamp_guide_text_title}>
                스탬프가 부족하신가요?
              </span>
              <span className={stamp_page_styles.mobile_stamp_guide_text_sub_title}>
                지금 바로 스탬프 모으러 가기 &gt;{' '}
              </span>
            </div>
          </div>
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              showToast();
            }}
            className={stamp_page_styles.mobile_stamp_gacha_image_wrapper}
          >
            <Image
              src="/images/stampImages/stamp-gacha-image.svg"
              width={166}
              height={124}
              alt="스탬프 가챠 이미지"
            />
            <div className={stamp_page_styles.mobile_stamp_image_overlay}></div>
            <div className={stamp_page_styles.mobile_stamp_guide_text}>
              <span className={stamp_page_styles.mobile_stamp_guide_text_title}>
                스탬프를 다 모으셨나요?
              </span>
              <span className={stamp_page_styles.mobile_stamp_guide_text_sub_title}>
                지금 바로 뽑기 가기 &gt;{' '}
              </span>
            </div>
          </div>
        </div>
        {/* 토스트 UI */}
        {toast && (
          <div className={stamp_page_styles.mobile_toast_ui_root_header}>
            <div className={stamp_page_styles.mobile_toast_ui_header_text}>
              <h2>
                <span className={stamp_page_styles.mobile_toast_ui_user_name}>김진섭</span>님
                축하합니다!
              </h2>
              <span>
                당신은 아래 상품에{' '}
                <span className={stamp_page_styles.mobile_toast_ui_lotto_text}>당첨</span>
                되셨습니다!
              </span>
            </div>
            <div className={stamp_page_styles.mobile_toast_ui_item_wrapper}>
              <div className={stamp_page_styles.mobile_toast_ui_confetti_wrapper}>
                <Image src="/images/stampImages/toastUI/confetti.svg" fill alt="빵빠레 이미지" />
              </div>
              <div className={stamp_page_styles.mobile_toast_ui_lotto_item}></div>
            </div>

            <div className={stamp_page_styles.mobile_toast_ui_item_info}>
              <div className={stamp_page_styles.mobile_toast_ui_item_section}>
                <div className={stamp_page_styles.mobile_toast_ui_item_title_wrapper}>
                  <span className={stamp_page_styles.mobile_toast_ui_item_title}>상품명</span>
                  <span className={stamp_page_styles.mobile_toast_ui_item_brand}>브랜드</span>
                </div>
                <div className={stamp_page_styles.mobile_toast_ui_item_info_wrapper}>
                  <span className={stamp_page_styles.mobile_toast_ui_item_name}>헤어고무</span>
                  <span className={stamp_page_styles.mobile_toast_ui_item_brand_name}>
                    센과치히로의 행방불명
                  </span>
                </div>
              </div>
              <div className={stamp_page_styles.mobile_toast_ui_button_wrapper}>
                <button
                  className={`${styles.close_button} `}
                  onClick={() => {
                    setToast(false);
                  }}
                >
                  닫기
                </button>
                <button className={`${styles.quick_link_button} `}>바로가기</button>
              </div>
              <div className={stamp_page_styles.mobile_toast_ui_footer_text}>
                <span>상품은 마이페이지 &gt; 혜택관리 &gt; 당첨내역에서 확인하세요!</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* 웹뷰 */}
      <div className={stamp_page_styles.web_root_section}>
        <div className={stamp_page_styles.web_path_wrapper}>
          HOME &gt; 마이페이지 &gt; 혜택관리 &gt; <span>스탬프</span>
        </div>
        {/* 실제 스탬프 페이지 메인 */}
        <div className={stamp_page_styles.web_main_page_section}>
          {/* 왼쪽 사이드 메뉴 */}
          <aside className={cancelReturnExchange_styles.web_order_delivery_aside}>
            <hr className={cancelReturnExchange_styles.web_order_delivery_aside_divider_top} />
            <h1 className={cancelReturnExchange_styles.web_order_delivery_list}>마이페이지</h1>
            <h2 className={cancelReturnExchange_styles.web_order_delivery_list_tit}>쇼핑 정보</h2>
            <ul className={cancelReturnExchange_styles.web_order_delivery_list_text}>
              <li>
                <Link href="#">주문/배송 조회</Link>
              </li>
              <li>
                <Link href="#">취소/반품/교환 내역</Link>
              </li>
              <li>
                <Link href="#">찜 리스트</Link>
              </li>
            </ul>
            <hr className={cancelReturnExchange_styles.web_order_delivery_aside_divider} />
            <h2 className={cancelReturnExchange_styles.web_order_delivery_list_tit}>혜택 관리</h2>
            <ul className={cancelReturnExchange_styles.web_order_delivery_list_text}>
              <li>
                <Link href="#">스탬프</Link>
              </li>
              <li>
                <Link href="#">당첨 내역</Link>
              </li>
            </ul>
            <hr className={cancelReturnExchange_styles.web_order_delivery_aside_divider} />
            <h2 className={cancelReturnExchange_styles.web_order_delivery_list_tit}>회원 정보</h2>
            <ul className={cancelReturnExchange_styles.web_order_delivery_list_text}>
              <li>
                <Link href="#">회원 정보 수정</Link>
              </li>
              <li>
                <Link href="#">마케팅 수신 동의</Link>
              </li>
              <li>
                <Link href="#">회원 탈퇴</Link>
              </li>
              <li>
                <Link href="#">배송지 관리</Link>
              </li>
            </ul>
          </aside>

          <div className={stamp_page_styles.web_main_page}>
            {/* 오른쪽 메인 */}
            <div className={stamp_page_styles.web_main_view_section}>
              {/* 회원정보  */}
              <div className={stamp_page_styles.web_user_info_wrapper}>
                <div className={stamp_page_styles.web_user_top_wrapper}>
                  <span>안녕하세요</span>
                  <div className={stamp_page_styles.web_user_name}>
                    <span>김진섭</span>
                    <span>님</span>
                  </div>
                </div>
                <div className={stamp_page_styles.web_bottom_wrapper}>
                  <span>현재 스탬프 개수 :</span>
                  <span>8개</span>
                </div>
                <div className={stamp_page_styles.web_blackbean_Image_wrapper}>
                  <Image
                    src="/images/stampImages/stamp-blackbean-image.svg"
                    fill
                    alt="숯검댕이 이미지"
                  />
                </div>
              </div>
              {/* 스탬프 이미지 */}
              <div className={stamp_page_styles.web_stamp_image_wrapper}>
                <Image src="/images/stampImages/stamp-image.svg" alt="스탬프 이미지" fill />
              </div>
              {/* 하단 링크 */}
              <div className={stamp_page_styles.web_stamp_link_image_wrapper}>
                <div className={stamp_page_styles.web_stamp_more_image_wrapper}>
                  <Image
                    src="/images/stampImages/stamp-more-image.svg"
                    fill
                    alt="스탬프 더 모으기 이미지"
                  />
                  <div className={stamp_page_styles.web_stamp_image_overlay}></div>
                  <div className={stamp_page_styles.web_stamp_guide_text}>
                    <span className={stamp_page_styles.web_stamp_guide_text_title}>
                      스탬프가 부족하신가요?
                    </span>
                    <span className={stamp_page_styles.web_stamp_guide_text_sub_title}>
                      지금 바로 스탬프 모으러 가기 &gt;{' '}
                    </span>
                  </div>
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    showToast();
                  }}
                  className={stamp_page_styles.web_stamp_gacha_image_wrapper}
                >
                  <Image
                    src="/images/stampImages/stamp-gacha-image.svg"
                    fill
                    alt="스탬프 가챠 이미지"
                  />
                  <div className={stamp_page_styles.web_stamp_image_overlay}></div>
                  <div className={stamp_page_styles.web_stamp_guide_text}>
                    <span className={stamp_page_styles.web_stamp_guide_text_title}>
                      스탬프를 다 모으셨나요?
                    </span>
                    <span className={stamp_page_styles.web_stamp_guide_text_sub_title}>
                      지금 바로 뽑기 가기 &gt;{' '}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* 뷰포트 1350부터 사이드로 이동 */}
            <div className={stamp_page_styles.web_side_section}>
              {/* 회원정보  */}
              <div className={stamp_page_styles.web_side_user_info_wrapper}>
                <div className={stamp_page_styles.web_side_user_top_wrapper}>
                  <span>안녕하세요</span>
                  <div className={stamp_page_styles.web_side_user_name_section}>
                    <span className={stamp_page_styles.web_side_user_name}>김진섭</span>
                    <span>회원님</span>
                  </div>
                </div>
                <div className={stamp_page_styles.web_side_bottom_wrapper}>
                  <span>현재 스탬프 개수 :</span>
                  <span>8개</span>
                </div>
                <div className={stamp_page_styles.web_side_blackbean_Image_wrapper}>
                  <Image
                    src="/images/stampImages/stamp-web-blackbean-image.svg"
                    fill
                    alt="숯검댕이 이미지"
                  />
                </div>
              </div>
              {/* 하단 링크 */}
              <div className={stamp_page_styles.web_side_stamp_link_image_wrapper}>
                <div className={stamp_page_styles.web_side_stamp_more_image_wrapper}>
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
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    showToast();
                  }}
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
                      지금 바로 뽑기 가기 &gt;{' '}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* 토스트 UI */}
            {toast && (
              <div className={stamp_page_styles.web_toast_ui_root_header}>
                <div className={stamp_page_styles.web_toast_ui_header_text}>
                  <h2>
                    <span className={stamp_page_styles.web_toast_ui_user_name}>김진섭</span>님
                    축하합니다!
                  </h2>
                  <span>
                    당신은 아래 상품에{' '}
                    <span className={stamp_page_styles.web_toast_ui_lotto_text}>당첨</span>
                    되셨습니다!
                  </span>
                </div>
                <div className={stamp_page_styles.web_toast_ui_item_wrapper}>
                  <div className={stamp_page_styles.web_toast_ui_confetti_wrapper}>
                    <Image
                      src="/images/stampImages/toastUI/confetti.svg"
                      fill
                      alt="빵빠레 이미지"
                    />
                  </div>
                  <div className={stamp_page_styles.web_toast_ui_lotto_item}></div>
                </div>

                <div className={stamp_page_styles.web_toast_ui_item_info}>
                  <div className={stamp_page_styles.web_toast_ui_item_section}>
                    <div className={stamp_page_styles.web_toast_ui_item_title_wrapper}>
                      <span className={stamp_page_styles.web_toast_ui_item_title}>상품명</span>
                      <span className={stamp_page_styles.web_toast_ui_item_brand}>브랜드</span>
                    </div>
                    <div className={stamp_page_styles.web_toast_ui_item_info_wrapper}>
                      <span className={stamp_page_styles.web_toast_ui_item_name}>헤어고무</span>
                      <span className={stamp_page_styles.web_toast_ui_item_brand_name}>
                        센과치히로의 행방불명
                      </span>
                    </div>
                  </div>
                  <div className={stamp_page_styles.web_toast_ui_button_wrapper}>
                    <button
                      className={`${styles.close_button} `}
                      onClick={() => {
                        setToast(false);
                      }}
                    >
                      닫기
                    </button>
                    <button className={`${styles.quick_link_button} `}>바로가기</button>
                  </div>
                  <div className={stamp_page_styles.web_toast_ui_footer_text}>
                    <span>상품은 마이페이지 &gt; 혜택관리 &gt; 당첨내역에서 확인하세요!</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* 토스트 UI */}
          {toast && (
            <div className={stamp_page_styles.web_side_toast_ui_root_header}>
              <div className={stamp_page_styles.web_side_toast_ui_header_text}>
                <h2>
                  <span className={stamp_page_styles.web_side_toast_ui_user_name}>김진섭</span>님
                  축하합니다!
                </h2>
                <span>
                  당신은 아래 상품에{' '}
                  <span className={stamp_page_styles.web_side_toast_ui_lotto_text}>당첨</span>
                  되셨습니다!
                </span>
              </div>
              <div className={stamp_page_styles.web_side_toast_ui_item_wrapper}>
                <div className={stamp_page_styles.web_side_toast_ui_confetti_wrapper}>
                  <Image src="/images/stampImages/toastUI/confetti.svg" fill alt="빵빠레 이미지" />
                </div>
                <div className={stamp_page_styles.web_side_toast_ui_lotto_item}></div>
              </div>

              <div className={stamp_page_styles.web_side_toast_ui_item_info}>
                <div className={stamp_page_styles.web_side_toast_ui_item_section}>
                  <div className={stamp_page_styles.web_side_toast_ui_item_title_wrapper}>
                    <span className={stamp_page_styles.web_side_toast_ui_item_title}>상품명</span>
                    <span className={stamp_page_styles.web_side_toast_ui_item_brand}>브랜드</span>
                  </div>
                  <div className={stamp_page_styles.web_side_toast_ui_item_info_wrapper}>
                    <span className={stamp_page_styles.web_side_toast_ui_item_name}>헤어고무</span>
                    <span className={stamp_page_styles.web_side_toast_ui_item_brand_name}>
                      센과치히로의 행방불명
                    </span>
                  </div>
                </div>
                <div className={stamp_page_styles.web_side_toast_ui_button_wrapper}>
                  <button
                    className={`${styles.close_button} `}
                    onClick={() => {
                      setToast(false);
                    }}
                  >
                    닫기
                  </button>
                  <button className={`${styles.quick_link_button} `}>바로가기</button>
                </div>
                <div className={stamp_page_styles.web_side_toast_ui_footer_text}>
                  <span>상품은 마이페이지 &gt; 혜택관리 &gt; 당첨내역에서 확인하세요!</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

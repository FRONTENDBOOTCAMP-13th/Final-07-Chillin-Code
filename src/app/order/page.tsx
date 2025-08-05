import styles from '../../styles/components/button.module.css';
import check_box_styles from '@/styles/components/check-box.module.css';
import order_styles from '@/styles/order/order.module.css';
import Image from 'next/image';
import MobileItemBasket from './mobileItemBasket';
import MobileTotalPrice from './mobileTotalPrice';
import MobilePayInfo from './mobilePayInfo';
import WebItemBasket from './webItemBasket';
import WebFinalRecipe from './webFinalRecipe';
import WebPayInfo from './webPayInfo';

export default function Order() {
  return (
    <>
      {/* 모바일뷰 */}
      <div className={order_styles.mobile_order_root_header}>
        {/* 뒤로가기 아이콘 및 주문/결제 */}
        <div className={order_styles.mobile_order_header}>
          <button type="button" className={order_styles.mobile_order_header_back_icon_wrapper}>
            <Image src="/icons/back-icon.svg" fill alt="뒤로가기 아이콘" />
          </button>
          <div className={order_styles.mobile_order_header_text}>
            <span>주문/결제</span>
          </div>
        </div>
        {/* 주문상품 영역 */}
        <MobileItemBasket />
        {/* 주문자 정보 영역 */}
        <form className={order_styles.mobile_order_orderer_info_section}>
          <fieldset>
            <div className={order_styles.mobile_order_orderer_info}>주문자 정보</div>
            <div className={order_styles.mobile_order_info_wrapper}>
              <div className={order_styles.mobile_order_orderer_info_row_layout}>
                <label htmlFor="orderName" className={order_styles.mobile_order_text_wrapper}>
                  <span className={order_styles.required_star}>*</span> <span>주문하시는 분</span>
                </label>
                <input type="text" id="orderName" required />
              </div>
              <div className={order_styles.mobile_order_orderer_info_row_layout}>
                <label htmlFor="orderPhone" className={order_styles.mobile_order_text_wrapper}>
                  <span className={order_styles.required_star}>*</span> <span>핸드폰 번호</span>
                </label>
                <input type="text" id="orderPhone" required />
              </div>
              <div className={order_styles.mobile_order_orderer_info_row_email_layout}>
                <label
                  htmlFor="orderEmail"
                  className={order_styles.mobile_order_email_text_wrapper}
                >
                  <span className={order_styles.required_star}>*</span> <span>이메일</span>
                </label>
                <div className={order_styles.mobile_order_email_input_select_wrapper}>
                  <input type="text" id="orderEmail" required />
                  <select name="emailDomain" id="emailDomain">
                    <option value="naver.com">naver.com</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="hanmail.con">hanmail.com</option>
                  </select>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
        {/* 구매내역에 해당하는 설명 영역 */}
        <div className={order_styles.mobile_order_explain_section}>
          <span>• 구매내역을 이메일과 SMS로 안내해 드립니다.</span>
          <span>• 정확한 이메일과 핸드폰 번호를 입력해 주십시오.</span>
        </div>
        {/* 배송정보에 해당하는 영역 */}
        <div className={order_styles.mobile_order_post_info_section}>
          <div className={order_styles.mobile_order_post_info_header}>
            <span>배송정보</span>
          </div>
          {/* 라디오 버튼 영역 */}
          <div className={order_styles.mobile_order_post_info_radio_button_wrapper}>
            {/* 1번째 버튼 */}
            <div className={order_styles.mobile_order_post_info_default_address_wrapper}>
              <div className={check_box_styles.radio_check_box_wrapper}>
                <input type="radio" name="radio-button" className={check_box_styles.check_input} />
                <label className={check_box_styles.radio_check_box_label}>
                  <span className={check_box_styles.radio_check_box} />
                </label>
              </div>
              <span>기본 배송지</span>
            </div>
            {/* 2번째 버튼 */}
            <div className={order_styles.mobile_order_post_info_user_input_rapper}>
              <div className={check_box_styles.radio_check_box_wrapper}>
                <input type="radio" name="radio-button" className={check_box_styles.check_input} />
                <label className={check_box_styles.radio_check_box_label}>
                  <span className={check_box_styles.radio_check_box} />
                </label>
              </div>
              <span>직접입력</span>
            </div>
            {/* 3번째 버튼 */}
            <div className={order_styles.mobile_order_post_info_post_adresss_list_wrapper}>
              <div className={check_box_styles.radio_check_box_wrapper}>
                <input type="radio" name="radio-button" className={check_box_styles.check_input} />
                <label className={check_box_styles.radio_check_box_label}>
                  <span className={check_box_styles.radio_check_box} />
                </label>
              </div>
              <span>배송지 목록</span>
            </div>
          </div>
          {/* 배송정보 사용자 입력 영역 */}
          <form action="submit" method="POST">
            <fieldset className={order_styles.mobile_order_post_info_write_section}>
              {/* 받으실분 */}
              <div className={order_styles.mobile_order_post_info_row_layout}>
                <div className={order_styles.mobile_order_post_info_row_layout_required_text}>
                  <span className={order_styles.required_star}>*</span>
                  <span>받으실분</span>
                </div>

                <label htmlFor="orderer-name">
                  <input type="text" id="orderer-name" required />
                </label>
              </div>
              {/* 주소 */}
              <div className={order_styles.mobile_order_post_info_row_layout}>
                <div
                  className={`${order_styles.mobile_order_post_info_row_layout_required_text} ${order_styles.post_address}`}
                >
                  <span className={order_styles.required_star}>*</span>
                  <span>주소</span>
                </div>
                <div className={order_styles.mobile_order_post_info_post_address_input_section}>
                  <label htmlFor="post-address">
                    <input type="text" id="post-address" required disabled />
                  </label>
                  <button type="button" className={order_styles.post_info_post_address_button}>
                    우편번호 검색
                  </button>
                  <label htmlFor="post-normal-address">
                    <input
                      type="text"
                      id="post-normal-address"
                      placeholder="기본주소(직접입력 불가)"
                      disabled
                      required
                    />
                  </label>
                  <label htmlFor="post-last-address">
                    <input type="text" id="post-last-address" required />
                  </label>
                </div>
              </div>
              {/* 전화번호 */}
              <div className={order_styles.mobile_order_post_info_row_layout}>
                <div className={order_styles.mobile_order_post_info_row_layout_text}>
                  <span>전화번호</span>
                </div>

                <label htmlFor="post-call-number">
                  <input type="text" id="post-call-number" placeholder="-없이 입력하세요." />
                </label>
              </div>
              {/* 핸드폰번호 */}
              <div className={order_styles.mobile_order_post_info_row_layout}>
                <div className={order_styles.mobile_order_post_info_row_layout_required_text}>
                  <span className={order_styles.required_star}>*</span>
                  <span>핸드폰번호</span>
                </div>

                <label htmlFor="post-phone-number">
                  <input type="text" id="post-phone-number" required />
                </label>
              </div>
              {/* 남기실말씀 */}
              <div className={order_styles.mobile_order_post_info_row_layout}>
                <div
                  className={`${order_styles.mobile_order_post_info_row_layout_text} ${order_styles.mobile_order_post_info_orderer_tell}`}
                >
                  <span>남기실말씀</span>
                </div>

                <div className={order_styles.mobile_order_post_info_ordder_sound_wrapper}>
                  <label htmlFor="post-orderer-sound">
                    <input type="text" id="post-orderer-sound" />
                  </label>
                  <span>
                    본 문구는 배송사에 전달되오니, 주문 요청 사항은 고객센터로 문의 바랍니다.
                  </span>
                </div>
              </div>
            </fieldset>
          </form>
          {/* 배송지 추가 버튼 영역 */}
          <div className={order_styles.mobile_order_post_info_footer_section}>
            <div className={order_styles.mobile_order_post_info_check_box_wrapper}>
              {/* 기본 배송지 추가 체크박스 */}
              <div className={order_styles.mobile_order_post_info_button_wrapper}>
                {/* 체크 박스 */}
                <div className={check_box_styles.check_box_wrapper}>
                  <input type="checkbox" className={check_box_styles.check_input} />
                  <label className={check_box_styles.check_box_label}>
                    <svg
                      width="10"
                      height="6.8"
                      viewBox="0 0 13 10"
                      fill="black"
                      xmlns="http://www.w3.org/2000/svg"
                      className={check_box_styles.check_box_icon}
                    >
                      <path
                        d="M4.15364 7.8347L0.859644 4.5427C0.813521 4.49494 0.758348 4.45685 0.697346 4.43065C0.636344 4.40444 0.570734 4.39065 0.504345 4.39007C0.437955 4.3895 0.372115 4.40215 0.310667 4.42729C0.249219 4.45243 0.193393 4.48956 0.146447 4.5365C0.0995002 4.58345 0.0623736 4.63927 0.0372332 4.70072C0.0120927 4.76217 -0.00055803 4.82801 1.88785e-05 4.8944C0.000595787 4.96079 0.0143889 5.0264 0.0405934 5.0874C0.0667979 5.1484 0.104889 5.20358 0.152644 5.2497L4.15264 9.2497L12.1526 1.2497C12.2437 1.1554 12.2941 1.0291 12.293 0.897999C12.2918 0.7669 12.2393 0.641495 12.1466 0.548791C12.0539 0.456086 11.9284 0.403502 11.7973 0.402363C11.6662 0.401223 11.5399 0.451621 11.4456 0.5427L4.15264 7.8347H4.15364Z"
                        fill="currentColor"
                      />
                    </svg>
                  </label>
                </div>
                <span>기본 배송지로 설정합니다.</span>
              </div>
              {/* 배송지 목록에 추가 체크박스 */}
              <div className={order_styles.mobile_order_post_info_button_wrapper}>
                {/* 체크 박스 */}
                <div className={check_box_styles.check_box_wrapper}>
                  <input type="checkbox" className={check_box_styles.check_input} />
                  <label className={check_box_styles.check_box_label}>
                    <svg
                      width="10"
                      height="6.8"
                      viewBox="0 0 13 10"
                      fill="black"
                      xmlns="http://www.w3.org/2000/svg"
                      className={check_box_styles.check_box_icon}
                    >
                      <path
                        d="M4.15364 7.8347L0.859644 4.5427C0.813521 4.49494 0.758348 4.45685 0.697346 4.43065C0.636344 4.40444 0.570734 4.39065 0.504345 4.39007C0.437955 4.3895 0.372115 4.40215 0.310667 4.42729C0.249219 4.45243 0.193393 4.48956 0.146447 4.5365C0.0995002 4.58345 0.0623736 4.63927 0.0372332 4.70072C0.0120927 4.76217 -0.00055803 4.82801 1.88785e-05 4.8944C0.000595787 4.96079 0.0143889 5.0264 0.0405934 5.0874C0.0667979 5.1484 0.104889 5.20358 0.152644 5.2497L4.15264 9.2497L12.1526 1.2497C12.2437 1.1554 12.2941 1.0291 12.293 0.897999C12.2918 0.7669 12.2393 0.641495 12.1466 0.548791C12.0539 0.456086 11.9284 0.403502 11.7973 0.402363C11.6662 0.401223 11.5399 0.451621 11.4456 0.5427L4.15264 7.8347H4.15364Z"
                        fill="currentColor"
                      />
                    </svg>
                  </label>
                </div>
                <span>배송지 목록에 추가합니다.</span>
              </div>
            </div>
            <div className={order_styles.mobile_order_post_info_add_address_button_wrapper}>
              <button className={`${styles.add_address_button} `}>배송지 추가</button>
            </div>
          </div>
          {/* 결제정보 영역 */}
          <MobilePayInfo />
          {/* 결제수단 영역 */}
          <div className={order_styles.mobile_order_pay_item_section}>
            <span>결제수단 선택/결제</span>
            <div className={order_styles.mobile_order_pay_item_wrapper}>
              <div className={order_styles.mobile_order_pay_item_title}>
                <span>일반결제</span>
              </div>
              <div className={order_styles.mobile_order_pay_item_radio_wrapper}>
                <div className={order_styles.mobile_order_pay_credit_card}>
                  {/* 라디오 체크 박스 */}
                  <div className={check_box_styles.radio_check_box_wrapper}>
                    <input
                      type="radio"
                      name="choose_pay_item"
                      className={check_box_styles.check_input}
                    />
                    <label className={check_box_styles.radio_check_box_label}>
                      <span className={check_box_styles.radio_check_box} />
                    </label>
                  </div>
                  <span>신용카드</span>
                </div>
                <div className={order_styles.mobile_order_pay_account_transfer}>
                  {/* 라디오 체크 박스 */}
                  <div className={check_box_styles.radio_check_box_wrapper}>
                    <input
                      type="radio"
                      name="choose_pay_item"
                      className={check_box_styles.check_input}
                    />
                    <label className={check_box_styles.radio_check_box_label}>
                      <span className={check_box_styles.radio_check_box} />
                    </label>
                  </div>
                  <span>실시간계좌이체</span>
                </div>
                <div className={order_styles.mobile_order_pay_account_transfer_escorw}>
                  {/* 라디오 체크 박스 */}
                  <div className={check_box_styles.radio_check_box_wrapper}>
                    <input
                      type="radio"
                      name="choose_pay_item"
                      className={check_box_styles.check_input}
                    />
                    <label className={check_box_styles.radio_check_box_label}>
                      <span className={check_box_styles.radio_check_box} />
                    </label>
                  </div>
                  <span>실시간계좌이체-에스크로</span>
                </div>
                <div className={order_styles.mobile_order_pay_virtual_account_escrow}>
                  {/* 라디오 체크 박스 */}
                  <div className={check_box_styles.radio_check_box_wrapper}>
                    <input
                      type="radio"
                      name="choose_pay_item"
                      className={check_box_styles.check_input}
                    />
                    <label className={check_box_styles.radio_check_box_label}>
                      <span className={check_box_styles.radio_check_box} />
                    </label>
                  </div>
                  <span>가상계좌-에스크로</span>
                </div>
              </div>
            </div>
          </div>
          {/* 최종 결제 금액 영역 */}
          <div className={order_styles.mobile_order_total_price_section}>
            <MobileTotalPrice />
          </div>
        </div>
      </div>

      {/* 웹뷰 */}
      <div className={order_styles.web_order_root_header}>
        <div className={order_styles.web_order_main_section}>
          {/* 뒤로가기 아이콘 및 주문/결제 */}
          <div className={order_styles.web_order_header}>
            <div className={order_styles.web_order_header_text}>
              <span className={order_styles.web_order_header_path}>HOME &gt; </span>
              <span>주문/결제</span>
            </div>
          </div>
          {/* 주문상품 영역 */}
          <WebItemBasket />
          {/* 주문자 정보 영역 */}
          <form className={order_styles.web_order_orderer_info_section}>
            <fieldset>
              <div className={order_styles.web_order_orderer_info}>주문자 정보</div>
              <div className={order_styles.web_order_info_wrapper}>
                <div className={order_styles.web_order_orderer_info_row_layout}>
                  <label htmlFor="orderName" className={order_styles.web_order_text_wrapper}>
                    <span className={order_styles.required_star}>*</span> <span>주문하시는 분</span>
                  </label>
                  <input type="text" id="orderName" required />
                </div>
                <div className={order_styles.web_order_orderer_info_row_layout}>
                  <label htmlFor="orderPhone" className={order_styles.web_order_text_wrapper}>
                    <span className={order_styles.required_star}>*</span> <span>핸드폰 번호</span>
                  </label>
                  <input type="text" id="orderPhone" required />
                </div>
                <div className={order_styles.web_order_orderer_info_row_email_layout}>
                  <label htmlFor="orderEmail" className={order_styles.web_order_email_text_wrapper}>
                    <span className={order_styles.required_star}>*</span> <span>이메일</span>
                  </label>
                  <div className={order_styles.web_order_email_input_select_wrapper}>
                    <input type="text" id="orderEmail" required />
                    <select name="emailDomain" id="emailDomain">
                      <option value="naver.com">naver.com</option>
                      <option value="gmail.com">gmail.com</option>
                      <option value="hanmail.con">hanmail.com</option>
                    </select>
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
          {/* 구매내역에 해당하는 설명 영역 */}
          <div className={order_styles.web_order_explain_section}>
            <span>• 구매내역을 이메일과 SMS로 안내해 드립니다.</span>
            <span>• 정확한 이메일과 핸드폰 번호를 입력해 주십시오.</span>
          </div>
          {/* 배송정보에 해당하는 영역 */}

          <div className={order_styles.web_order_post_info_section}>
            <div className={order_styles.web_order_post_info_header}>
              <span>배송정보</span>
            </div>
            {/* 배송정보 사용자 입력 영역 */}
            <form action="submit" method="POST">
              <fieldset className={order_styles.web_order_post_info_write_section}>
                {/* 배송지 확인 */}
                <div className={order_styles.web_order_post_info_row_layout}>
                  <div className={order_styles.web_order_post_info_row_layout_required_text}>
                    <span className={order_styles.web_order_post_address_check_text}>
                      배송지확인
                    </span>
                  </div>
                  {/* 라디오 버튼 영역 */}
                  <div className={order_styles.web_order_post_info_radio_button_wrapper}>
                    {/* 1번째 버튼 */}
                    <div className={order_styles.web_order_post_info_default_address_wrapper}>
                      <div className={check_box_styles.radio_check_box_wrapper}>
                        <input
                          type="radio"
                          name="radio-button"
                          className={check_box_styles.check_input}
                        />
                        <label className={check_box_styles.radio_check_box_label}>
                          <span className={check_box_styles.radio_check_box} />
                        </label>
                      </div>
                      <span>기본 배송지</span>
                    </div>
                    {/* 2번째 버튼 */}
                    <div className={order_styles.web_order_post_info_user_input_rapper}>
                      <div className={check_box_styles.radio_check_box_wrapper}>
                        <input
                          type="radio"
                          name="radio-button"
                          className={check_box_styles.check_input}
                        />
                        <label className={check_box_styles.radio_check_box_label}>
                          <span className={check_box_styles.radio_check_box} />
                        </label>
                      </div>
                      <span>직접입력</span>
                    </div>
                    {/* 3번째 버튼 */}
                    <div className={order_styles.web_order_post_info_post_adresss_list_wrapper}>
                      <div className={check_box_styles.radio_check_box_wrapper}>
                        <input
                          type="radio"
                          name="radio-button"
                          className={check_box_styles.check_input}
                        />
                        <label className={check_box_styles.radio_check_box_label}>
                          <span className={check_box_styles.radio_check_box} />
                        </label>
                      </div>
                      <span>주문자정보와 동일</span>
                    </div>
                    <button type="button" className={order_styles.web_post_address_button}>
                      배송지 관리
                    </button>
                  </div>
                </div>
                {/* 받으실분 */}
                <div className={order_styles.web_order_post_info_row_layout}>
                  <div className={order_styles.web_order_post_info_row_layout_required_text}>
                    <span className={order_styles.required_star}>*</span>
                    <span>받으실분</span>
                  </div>
                  <label
                    htmlFor="orderer-name"
                    className={order_styles.web_order_input_margin_layout}
                  >
                    <input type="text" id="orderer-name" required />
                  </label>
                </div>
                {/* 받으실 곳 */}
                <div className={order_styles.web_order_post_info_row_layout}>
                  <div
                    className={`${order_styles.web_order_post_info_row_layout_required_text} ${order_styles.post_address}`}
                  >
                    <span className={order_styles.required_star}>*</span>
                    <span>받으실 곳</span>
                  </div>
                  <div className={order_styles.web_order_post_info_post_address_input_section}>
                    <div className={order_styles.web_order_post_info_post_address_top_wrapper}>
                      <label htmlFor="post-address">
                        <input type="text" id="post-address" required disabled />
                      </label>
                      <button type="button" className={order_styles.post_info_post_address_button}>
                        우편번호 검색
                      </button>
                    </div>
                    <div className={order_styles.web_order_post_info_post_address_top_wrapper}>
                      <label htmlFor="post-normal-address">
                        <input
                          type="text"
                          id="post-normal-address"
                          placeholder="기본주소(직접입력 불가)"
                          disabled
                          required
                        />
                      </label>
                      <label htmlFor="post-last-address">
                        <input
                          type="text"
                          id="post-last-address"
                          placeholder="나머지 주소 입력"
                          required
                        />
                      </label>
                    </div>
                  </div>
                </div>
                {/* 전화번호 */}
                <div className={order_styles.web_order_post_info_row_layout}>
                  <div className={order_styles.web_order_post_info_row_layout_text}>
                    <span>전화번호</span>
                  </div>
                  <label
                    htmlFor="post-call-number"
                    className={order_styles.web_order_input_margin_layout}
                  >
                    <input type="text" id="post-call-number" placeholder="-없이 입력하세요." />
                  </label>
                </div>
                {/* 핸드폰번호 */}
                <div className={order_styles.web_order_post_info_row_layout}>
                  <div className={order_styles.web_order_post_info_row_layout_required_text}>
                    <span className={order_styles.required_star}>*</span>
                    <span>핸드폰번호</span>
                  </div>
                  <label
                    htmlFor="post-phone-number"
                    className={order_styles.web_order_input_margin_layout}
                  >
                    <input type="text" id="post-phone-number" required />
                  </label>
                </div>
                {/* 남기실말씀 */}
                <div className={order_styles.web_order_post_info_row_layout}>
                  <div
                    className={`${order_styles.web_order_post_info_row_layout_text} ${order_styles.web_order_post_info_orderer_tell}`}
                  >
                    <span>남기실말씀</span>
                  </div>
                  <div className={order_styles.web_order_post_info_ordder_sound_wrapper}>
                    <label htmlFor="post-orderer-sound">
                      <input
                        type="text"
                        id="post-orderer-sound"
                        placeholder="본 문구는 배송사에 전달되오니, 주문 요청 사항은 고객센터로 문의 바랍니다."
                      />
                    </label>
                  </div>
                </div>
                {/* 회원정보 반영 */}
                <div className={order_styles.web_order_post_info_row_layout}>
                  <div className={order_styles.web_order_post_info_row_layout_text}>
                    <span>회원정보 반영</span>
                  </div>
                  <div className={order_styles.web_order_post_info_button_section}>
                    {/* 기본 배송지 추가 체크박스 */}
                    <div className={order_styles.web_order_post_info_button_wrapper}>
                      {/* 체크 박스 */}
                      <div className={check_box_styles.check_box_wrapper}>
                        <input type="checkbox" className={check_box_styles.check_input} />
                        <label className={check_box_styles.check_box_label}>
                          <svg
                            width="10"
                            height="6.8"
                            viewBox="0 0 13 10"
                            fill="black"
                            xmlns="http://www.w3.org/2000/svg"
                            className={check_box_styles.check_box_icon}
                          >
                            <path
                              d="M4.15364 7.8347L0.859644 4.5427C0.813521 4.49494 0.758348 4.45685 0.697346 4.43065C0.636344 4.40444 0.570734 4.39065 0.504345 4.39007C0.437955 4.3895 0.372115 4.40215 0.310667 4.42729C0.249219 4.45243 0.193393 4.48956 0.146447 4.5365C0.0995002 4.58345 0.0623736 4.63927 0.0372332 4.70072C0.0120927 4.76217 -0.00055803 4.82801 1.88785e-05 4.8944C0.000595787 4.96079 0.0143889 5.0264 0.0405934 5.0874C0.0667979 5.1484 0.104889 5.20358 0.152644 5.2497L4.15264 9.2497L12.1526 1.2497C12.2437 1.1554 12.2941 1.0291 12.293 0.897999C12.2918 0.7669 12.2393 0.641495 12.1466 0.548791C12.0539 0.456086 11.9284 0.403502 11.7973 0.402363C11.6662 0.401223 11.5399 0.451621 11.4456 0.5427L4.15264 7.8347H4.15364Z"
                              fill="currentColor"
                            />
                          </svg>
                        </label>
                      </div>
                      <span className={order_styles.web_post_info_check_box_red_text}>
                        나의 배송지에 추가합니다.
                      </span>
                    </div>
                    {/* 배송지 목록에 추가 체크박스 */}
                    <div className={order_styles.web_order_post_info_button_wrapper}>
                      {/* 체크 박스 */}
                      <div className={check_box_styles.check_box_wrapper}>
                        <input type="checkbox" className={check_box_styles.check_input} />
                        <label className={check_box_styles.check_box_label}>
                          <svg
                            width="10"
                            height="6.8"
                            viewBox="0 0 13 10"
                            fill="black"
                            xmlns="http://www.w3.org/2000/svg"
                            className={check_box_styles.check_box_icon}
                          >
                            <path
                              d="M4.15364 7.8347L0.859644 4.5427C0.813521 4.49494 0.758348 4.45685 0.697346 4.43065C0.636344 4.40444 0.570734 4.39065 0.504345 4.39007C0.437955 4.3895 0.372115 4.40215 0.310667 4.42729C0.249219 4.45243 0.193393 4.48956 0.146447 4.5365C0.0995002 4.58345 0.0623736 4.63927 0.0372332 4.70072C0.0120927 4.76217 -0.00055803 4.82801 1.88785e-05 4.8944C0.000595787 4.96079 0.0143889 5.0264 0.0405934 5.0874C0.0667979 5.1484 0.104889 5.20358 0.152644 5.2497L4.15264 9.2497L12.1526 1.2497C12.2437 1.1554 12.2941 1.0291 12.293 0.897999C12.2918 0.7669 12.2393 0.641495 12.1466 0.548791C12.0539 0.456086 11.9284 0.403502 11.7973 0.402363C11.6662 0.401223 11.5399 0.451621 11.4456 0.5427L4.15264 7.8347H4.15364Z"
                              fill="currentColor"
                            />
                          </svg>
                        </label>
                      </div>
                      <span>위 내용을 회원정보에 반영합니다. (주소/전화번호/핸드폰번호)</span>
                    </div>
                  </div>
                </div>
              </fieldset>
            </form>
            {/* 결제정보 영역 */}
            <div className={order_styles.web_order_pay_info_section}>
              <WebPayInfo />
              {/* 최하단 결제내역 설명 영역 */}
              <div className={order_styles.web_order_footer_section}>
                <span>• 회원할인이 적용되는 경우 실제 상품가와 판매가가 노출됩니다.</span>
                <span>
                  • 특가상품 및 일부상품은 스탬프 적용이 제한됩니다. 스탬프 적용은{' '}
                  <strong>마이페이지 &gt; 당첨내역</strong>에서 확인가능합니다.
                </span>
                <span>• 스탬프는 상품 1개 구매시 1개씩 적립됩니다.</span>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽 사이드바 */}
        <WebFinalRecipe />
      </div>
    </>
  );
}

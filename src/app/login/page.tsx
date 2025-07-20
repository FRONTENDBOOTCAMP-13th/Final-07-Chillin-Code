import '@/styles/globals.css';
import login_styles from '@/styles/login/login.module.css';
import styles from '@/styles/components/button.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <>
      {/* 로그인 페이지 */}
      <div className={login_styles.login_page}>
        {/* 로그인 페이지 헤더 */}
        <div className={login_styles.logo_wrapper}>
          <Image
            className={login_styles.logo}
            src="/logo/소피의창고 로고.svg"
            alt="소피의 창고 로고"
            fill
            sizes="100%"
          />
        </div>
        <p className={login_styles.description}>
          &quot;오래된 저택의 문이 열립니다...
          <br className={login_styles.mobile_only_br} />
          <strong className={login_styles.description_point}>&apos;로그인&apos;</strong> 하면 소피의
          물건을 구매 할 수 있어요.&quot;
        </p>

        {/* 로그인 페이지 박스 */}
        <div className={login_styles.form_wrapper}>
          {/* 로그인 페이지 뒤로가기와 로그인 제목 */}
          <div className={login_styles.login_title_container}>
            <svg
              className={login_styles.back_button}
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xlinkHref="http://www.w3.org/1999/xlink"
            >
              <rect
                x="15"
                y="15"
                width="15"
                height="15"
                transform="rotate(180 15 15)"
                fill="url(#pattern0_311_1505)"
              />
              <defs>
                <pattern
                  id="pattern0_311_1505"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use xlinkHref="#image0_311_1505" transform="scale(0.00195312)" />
                </pattern>
                <image
                  id="image0_311_1505"
                  width="512"
                  height="512"
                  preserveAspectRatio="none"
                  xlinkHref="data:image/png;base64,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rr/++sf2f05//fWP7f+8/vrrr7/+kf136K+//rH9d+qvv/6x/V/QX3/9UzXon91/l/766x/bf7f++usf2/9F/fXXX3/9I/u/pL/++sf2f1l//fWP7b9Hf/3111//RI2v6K+//rH9X9Vff/311z+yf6/++usf2/81/fXXX3/9I/v36a+//qkWvK6//vrH9n9Df/3111//yP79+uuvf2z/N/XXX3/99Y/s/5b+yS7SX3/9c/vv1V9//WP779Nff/311z+y/3799dc/tv/b+idr0l9//XP7v6O//vrrr39k/3f111//2P7v6a+//qkW6p/d/4D++usf2/99/fXXX3/9I/sP6K+//qma9M+2Xf9oN+sfreN3/aN9oH+0VfpnG9Q/2lX6Z7td/2wH9M82qX+0xfpnu1r/bF36Z+vQP9sV+mdrnNY/2zH9s23TP9tq/bM1TeifbaP+2Zac0D/bBv2zNQzon63lqP7Z2o/P1X9E/whtY7P37292mwyL+mbr31NzmRhrD5+ff6jLVaKeDHQPn/PK4NTgGieJs2z9nkPjJyePDO1e1+IaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBP/gLKc+MdiCJDlgAAAABJRU5ErkJggg=="
                />
              </defs>
            </svg>
            <h1 className={login_styles.login_title}>로그인</h1>
          </div>
          {/* 로그인 페이지 인풋 */}
          <form className={login_styles.form}>
            <label className={login_styles.label} htmlFor="email">
              이메일 주소
            </label>
            <input
              className={login_styles.input}
              type="email"
              id="email"
              placeholder="example@example.com"
            />

            <label className={login_styles.label} htmlFor="password">
              비밀번호
            </label>
            <input className={login_styles.input} type="password" id="password" />

            <div className={login_styles.option}>
              <div className={login_styles.checkbox_container}>
                <input
                  type="checkbox"
                  id="option"
                  name="option"
                  className={login_styles.checkbox}
                />
                <label htmlFor="option" className={login_styles.checkbox_label}>
                  로그인 상태 유지
                </label>
              </div>
              <Link href="#" className={login_styles.forgot_password_link}>
                <p>비밀번호를 잊으셨나요?</p>
              </Link>
            </div>
            {/* 로그인 페이지 버튼 */}
            <div className={login_styles.buttons_wrapper}>
              <button className={`${styles.login_button} `}>로그인</button>
              <button className={`${styles.signup_button} `}>회원가입</button>
            </div>
          </form>
        </div>
        {/* 로그인 페이지 조항 */}
        <p className={login_styles.terms}>
          로그인하면 <strong className={login_styles.description_point}>이용약관</strong> 및
          <strong className={login_styles.description_point}>개인정보처리방침</strong>에 동의하는
          것으로 간주됩니다.
        </p>
      </div>
    </>
  );
}

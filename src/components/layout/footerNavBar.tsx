import footer_nav_bar_styles from '@/styles/components/footerNavBar.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function FooterNav() {
  return (
    <footer className={footer_nav_bar_styles.footer}>
      <nav className={footer_nav_bar_styles.nav}>
        <Link href="/shoppingcart" className={footer_nav_bar_styles.navItem}>
          <div className={footer_nav_bar_styles.icon}>
            <Image src="/icons/cart-white-icon.svg" width={33} height={33} alt="장바구니" />
          </div>
          <span className={footer_nav_bar_styles.label}>장바구니</span>
        </Link>
        <Link href="/myPage/stamp" className={footer_nav_bar_styles.navItem}>
          <div className={footer_nav_bar_styles.icon}>
            <Image src="/icons/stamp-white-icon.svg" width={33} height={33} alt="스템프" />
          </div>
          <span className={footer_nav_bar_styles.label}>스템프</span>
        </Link>
        <Link href="/" className={footer_nav_bar_styles.navItem}>
          <div className={footer_nav_bar_styles.icon}>
            <Image src="/icons/home-white-icon.svg" width={33} height={33} alt="홈" />
          </div>
          <span className={footer_nav_bar_styles.label}>홈</span>
        </Link>
        <Link href="/myPage" className={footer_nav_bar_styles.navItem}>
          <div className={footer_nav_bar_styles.icon}>
            <Image src="/icons/mypage-white-icon.svg" width={33} height={33} alt="마이페이지" />
          </div>
          <span className={footer_nav_bar_styles.label}>마이페이지</span>
        </Link>
        <Link href="/recentPage/mobile" className={footer_nav_bar_styles.navItem}>
          <div className={footer_nav_bar_styles.icon}>
            <Image src="/icons/recent-white-icon.svg" width={33} height={33} alt="최근본상품" />
          </div>
          <span className={footer_nav_bar_styles.label}>최근본상품</span>
        </Link>
      </nav>
    </footer>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ResponsiveLink({ children }: { children: React.ReactNode }) {
  const [href, setHref] = useState('/categoryPage/web');

  useEffect(() => {
    const checkScreen = () => {
      setHref(window.innerWidth <= 480 ? '/categoryPage/mobile' : '/categoryPage/web');
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  return <Link href={href}>{children}</Link>;
}

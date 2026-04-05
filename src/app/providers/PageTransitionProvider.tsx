'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FullPageLoader } from '@/shared/ui/FullPageLoader';

export const PageTransitionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (loading) {
    return <FullPageLoader />;
  }

  return <>{children}</>;
};
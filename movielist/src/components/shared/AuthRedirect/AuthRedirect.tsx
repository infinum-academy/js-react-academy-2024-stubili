'use client';
import useSWR from 'swr';
import { fetcher } from '../../../fetchers/fetcher';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface IAuthRedirectProps {
  to: string;
  condition: 'loggedIn' | 'loggedOut';
}

export const AuthRedirect = ({ to, condition }: IAuthRedirectProps) => {
  const router = useRouter();
  const { data, isLoading } = useSWR("https://tv-shows.infinum.academy/users/me", fetcher<{ uid: string }>);

  useEffect(() => {
    console.log('Effect');
    if (isLoading) {
      return;
    }
    if (!data && condition === 'loggedOut') {
      router.push(to);
    }

    if (data && condition === 'loggedIn') {
      console.log('Logged in, redirecting');
      router.push(to);
    }
  }, [data, isLoading, router, condition, to]);

  return null;
};
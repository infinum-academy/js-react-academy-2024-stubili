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
  const authHeaders = sessionStorage.getItem('auth-headers');
  const router = useRouter();
  const { data, isLoading } = useSWR("https://tv-shows.infinum.academy/users/me", fetcher<{ uid: string }>);
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!data && condition === 'loggedOut' && !authHeaders) {
      router.push(to);
    }

    if (data && condition === 'loggedIn' && authHeaders) {
      console.log('Logged in, redirecting');
      router.push(to);
    }
  }, [data, isLoading, router, condition, to, authHeaders]);

  return null;
};
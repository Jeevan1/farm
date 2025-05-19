'use client';
import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const page = () => {
  const token = Cookies.get('token');
  const router = useRouter();

  if (!token) {
    router.push('/');
  }
  return <div>page</div>;
};

export default page;

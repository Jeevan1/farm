import React from 'react';

export const metadata = {
  title: 'Login - FarmMart',
  description: 'Your Farming Companion',
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default AuthLayout;

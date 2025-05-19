import React from 'react';

export const metadata = {
  title: 'Dashboard - FarmMart',
  description: 'Your Farming Companion',
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default DashboardLayout;

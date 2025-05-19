import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/providers/CartProvider';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: 'FarmMart',
  description: 'Your Farming Companion',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}

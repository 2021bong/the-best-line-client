import type { Metadata } from 'next';
import './globals.css';
import './reset.css';

export const metadata: Metadata = {
  title: '최고의 한 줄',
  description: '명대사를 써보자! 릴레이 소설 쓰기',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='kr'>
      <body>{children}</body>
    </html>
  );
}

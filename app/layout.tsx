import './globals.css';

import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Coval',
  description: 'Coval'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body> {children}</body>
      <Analytics />
    </html>
  );
}

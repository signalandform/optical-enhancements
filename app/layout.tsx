import type { Metadata } from 'next';
import { Space_Mono, Inter } from 'next/font/google';
import './globals.css';

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Optical Auto Enhancements | Window Tint & PPF in DeSoto, TX',
  description:
    'Window tinting, paint protection film, glass replacement, and custom detailing for DeSoto and the greater Dallas area.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

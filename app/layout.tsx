import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
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
    <html lang="en" className={`${display.variable} ${inter.variable}`}>
      <body className="antialiased pt-20 sm:pt-24">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

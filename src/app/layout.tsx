import './globals.css'
import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import { Providers } from '../components/providers';
import { Footer } from 'tp-kit/components/footer';
import { Menu } from '../components/menu';

const font = Lexend({
  subsets: ['latin'],
  weight: ['400', '600']
});

export const metadata: Metadata = {
  title: {
    default: 'Starbucks',
    template: '%s - Starbucks',
  },
  robots: {
    index: false,
    follow: false
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={font.className}>
        <Providers font={font}>
          <Menu />
          
          {children}
        </Providers>

        <Footer />
      </body>
    </html>
  )
}

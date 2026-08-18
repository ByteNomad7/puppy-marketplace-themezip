import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Lora, Inter } from 'next/font/google'
import './globals.css'
import { JsonLd } from '@/components/json-ld'
import { organizationSchema, webSiteSchema } from '@/lib/seo'

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Potty Registered Puppies | Teacup & Toy Puppies for Sale in the UK',
  description:
    'Browse teacup and toy puppies for sale in the UK. Potty Registered Puppies connects UK families with healthy, well-raised puppies across a wide range of breeds.',
  metadataBase: new URL('https://www.pottyregisteredpuppies.com'),
  alternates: {
    canonical: 'https://www.pottyregisteredpuppies.com',
  },
  openGraph: {
    siteName: 'Potty Registered Puppies',
    locale: 'en_GB',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#2f4a3a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB" className={`${lora.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        <JsonLd data={[organizationSchema(), webSiteSchema()]} />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

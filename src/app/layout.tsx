// src/app/layout.tsx
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Your App Title',
  description: 'Your app description',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Use next/script to properly load external scripts */}
        <Script src="/preline.js" strategy="afterInteractive" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
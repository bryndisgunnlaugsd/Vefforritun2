import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Parental Leave Application',
  description: 'Apply for parental leave in Iceland',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} bg-white text-gray-900 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}

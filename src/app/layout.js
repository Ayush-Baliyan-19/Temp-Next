"use client"
import StateProvider from './StateProvider'
import Navbar from './components/Navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  const pathName = usePathname()
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
        <script src="https://cdn.jsdelivr.net/npm/vega-lite@5"></script>
        <script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>
      </head>
      <body className={inter.className}>
        <StateProvider>
          {
            pathName !== '/Screen3' &&
            <Navbar />
          }
          {children}
        </StateProvider>
      </body>
    </html>
  )
}

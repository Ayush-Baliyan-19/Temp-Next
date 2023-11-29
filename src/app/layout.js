"use client"
import StateProvider from './StateProvider'
import Navbar from './components/Navbar/Navbar'
import './globals.css'
import { usePathname } from 'next/navigation'


export default function RootLayout({ children }) {
  const pathName = usePathname()
  return (
    <html lang="en">
      <body>
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

import "./globals.css"
import { Inter } from "next/font/google"
import { TopNav } from "./components/top-nav"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#FAF9F6]`}>
        <TopNav />
        <main className="container mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  )
}


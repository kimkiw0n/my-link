import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/components/query-provider";
import { AuthProvider } from "@/components/auth-provider";

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://my-link-kiwon.vercel.app"
  ),
  title: {
    default: "MyLink - Portfolio in One Link",
    template: "%s | MyLink",
  },
  description: "모든 활동을 한 페이지에 담아 나만의 포트폴리오를 완성하세요. GitHub, 블로그, 수상 이력까지 나만의 커스텀 링크 페이지를 30초 만에 만들어보세요.",
  keywords: ["MyLink", "마이링크", "포트폴리오", "링크트리", "개발자 포트폴리오", "멀티링크", "Linktree alternative"],
  authors: [{ name: "MyLink Team" }],
  creator: "MyLink Team",
  publisher: "MyLink Team",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "MyLink - Portfolio in One Link",
    description: "모든 활동을 한 페이지에 담아 나만의 포트폴리오를 완성하세요.",
    url: "https://my-link-kiwon.vercel.app",
    siteName: "MyLink",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyLink - Portfolio in One Link",
    description: "모든 활동을 한 페이지에 담아 나만의 포트폴리오를 완성하세요.",
    creator: "@mylink",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <ThemeProvider>
          <QueryProvider>
            <AuthProvider>
              <Header />
              {children}
              <Toaster position="top-center" />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";

export const metadata = {
  title: {
    template: "%s | Acme Dashboard",
    default: "Acme Dashboard",
  },
  description: "The official Next.js Learn Dashboard built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
  openGraph: {
    title: "Next.js",
    description: "The React Framework for the Web",
    url: "https://nextjs.org", //網站主要連結
    siteName: "Next.js",
    images: [
      {
        url: "https://nextjs.org/og.png", // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: "https://nextjs.org/og-alt.png", // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "zh_TW",
    type: "website",
  },
  robots: {
    index: false, // 告訴搜尋引擎不要索引此頁面，頁面不會出現在搜尋結果中
    follow: false, // 告訴搜尋引擎不要追蹤此頁面上的連結，即不進一步查看這些連結
    nocache: true, // 告訴搜尋引擎不要將此頁面存儲在其暫存中
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico", //32*32
    shortcut: "/favicon.ico", //32*32
    apple: "/favicon.ico", //180*180
  },
  keywords: "eventos, vestuário, ...", //網站 5 個關鍵字
  alternates: {
    canonical: "https://next-learn-dashboard.vercel.sh", //全站最主要的連結是甚麼
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#4285f4" />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}

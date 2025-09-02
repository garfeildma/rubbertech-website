import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RubberTech - The Wheels You Can Rely On",
  description: "Leading manufacturer of high-quality wheels, wheelbarrows, and rubber products. Qingdao RubberTech Industry Co., Ltd - Your trusted partner since 2012.",
  keywords: "wheels, wheelbarrows, rubber products, pneumatic wheels, PU wheels, solid wheels, industrial wheels, China manufacturer",
  authors: [{ name: "RubberTech" }],
  creator: "RubberTech",
  publisher: "RubberTech",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rubbertechchina.com",
    siteName: "RubberTech",
    title: "RubberTech - The Wheels You Can Rely On",
    description: "Leading manufacturer of high-quality wheels, wheelbarrows, and rubber products.",
  },
  twitter: {
    card: "summary_large_image",
    title: "RubberTech - The Wheels You Can Rely On",
    description: "Leading manufacturer of high-quality wheels, wheelbarrows, and rubber products.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData type="organization" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

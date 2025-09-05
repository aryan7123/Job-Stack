import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import BackToTop from "@/components/ui/BackToTop";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Job Stack",
  description: "Job Board & Job Portal Application",
  icons: {
    icon: "/favicon-DonRq76O.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakartaSans.variable}`}>
      <body className={`antialiased ${jakartaSans.className}`}>
        <Providers>
          <BackToTop />
          {children}
        </Providers>
      </body>
    </html>
  );
}

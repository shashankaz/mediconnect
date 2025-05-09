import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MediConnect",
    template: "%s | MediConnect",
  },
  description: "Connect with doctors online and get the best treatment",
  keywords: [
    "MediConnect",
    "online doctor consultation",
    "best treatment",
    "healthcare",
  ],
  openGraph: {
    title: "MediConnect",
    description: "Connect with doctors online and get the best treatment",
    siteName: "MediConnect",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

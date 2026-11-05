import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Josefin_Sans, Geist } from "next/font/google";

import "./globals.css";

import { cn } from "@/lib/utils";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

import { Toaster } from "@/components/ui/sonner";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "@/components/home/ThemeProvider";

// Body Font
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

// Heading Font
const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Helping Hands | Make Good Happen",
    template: "%s | Helping Hands",
  },
  description:
    "Join Helping Hands to support communities through tree plantation, food distribution, winter clothes donation, and social development events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        geist.variable,
        josefinSans.variable,
        "antialiased"
      )}
    >
      <body className="flex min-h-screen flex-col font-sans">
        <ThemeProvider>
          <Navbar />

          <main className="flex-1 pt-24">
            {children}
          </main>

          <Footer />

          <Toaster position="top-right" richColors />

          <ToastContainer
            position="top-right"
            autoClose={3000}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Josefin_Sans, Geist } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

import { Toaster } from "@/components/ui/sonner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@/components/home/ThemeProvider";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
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
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        josefinSans.className,
        geist.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Navbar />

          <main className="flex-1 pt-24">{children}</main>

          <Footer />

          <Toaster position="top-right" richColors />
          <ToastContainer position="top-right" autoClose={3000} />
        </ThemeProvider>
      </body>
    </html>
  );
}

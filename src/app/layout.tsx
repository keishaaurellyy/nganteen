import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import '../styles/globals.css'
import CustomSessionProvider from "./context/session-provider";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nganteen - Campus Food Self-Pickup App",
  description: "Order and pickup meals from campus canteens - no queues, just fast food pickup.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en">
        <body className={`${plusJakartaSans.variable} font-sans antialiased`}>
        <CustomSessionProvider>
        {children}
        </CustomSessionProvider>
      </body>
    </html>
  );
}


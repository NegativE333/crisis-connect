import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Modals } from "@/components/modals/modals";
import { Toaster } from "sonner";
import { MobileHeader } from "@/components/sidebar/mobile-header";

export const revalidate = 30;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crisis Connect",
  description: "Crisis Connect - Disaster Response Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <MobileHeader />
          <Sidebar className="hidden lg:flex" />
          <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
            <div className="h-full max-w-[1056px]mx-auto pt-6">
              <Toaster />
              <Modals />
              {children}
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}

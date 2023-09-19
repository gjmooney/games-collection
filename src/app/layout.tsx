import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "What Cha Got!?",
  description: "Stop buying the same games",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen flex flex-col antialiased",
            inter.className
          )}
        >
          <Providers>
            <Navbar />
            <div className="flex-auto container">{children}</div>
            <Toaster />
            <Footer />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}

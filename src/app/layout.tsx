import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ClerkProvider from "@/components/providers/ClerkProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <div className="flex-auto container">{children}</div>
              <Toaster />
              <ReactQueryDevtools initialIsOpen={false} />
              <Footer />
            </ThemeProvider>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

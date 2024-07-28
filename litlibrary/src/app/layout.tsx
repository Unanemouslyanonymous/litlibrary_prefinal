import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/AuthContext";
import Sidebar from "@/components/Navbar";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Lit Library",
  description: "The Only Book App You Need",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={cn("min-h-screen bg-background antialiased", poppins)}>
        <AuthProvider>
          <Sidebar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

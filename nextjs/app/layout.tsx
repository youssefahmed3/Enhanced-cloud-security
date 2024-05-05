import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./context/authProvider";
import Sidebar from "@/components/shared/Sidebar/sidebar";
import { Toaster } from "@/components/ui/sonner"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Enhanced Cloud Security",
  description: "Protecting Image from unauthorized access",
};
const RootLayout = ({children, hasSidebar}: {children: React.ReactNode[], hasSidebar: boolean}) => {

  return (
    <html lang="en">
      <body className={`${inter.className} bg-myColors-primary-background text-myColors-primary-text_white`}>
        <AuthProvider>
          <div id="container" className={`flex`}>
            <Sidebar />
            <div className="flex-grow">
              {children}
            </div>
          </div>

        </AuthProvider>
      </body>
      <Toaster />
    </html>
  );
}

export default RootLayout;
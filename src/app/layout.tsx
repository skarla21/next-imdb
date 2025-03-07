import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "../components/Header";
import ThemeProv from "../components/ThemeProv";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "IMDb Clone",
  description: "An IMDb clone using NextJS, Typescript and TailwindCSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="bg-background">
          <ThemeProv>
            <Header />
            <Navbar />
            {children}
          </ThemeProv>
        </body>
      </html>
    </ClerkProvider>
  );
}

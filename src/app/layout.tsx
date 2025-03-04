import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import ThemeProv from "./components/ThemeProv";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
            {children}
          </ThemeProv>
        </body>
      </html>
    </ClerkProvider>
  );
}

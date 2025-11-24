import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SocketProvider } from "@/context/SocketContext";
import { Providers } from "@/providers/providers";

export const metadata: Metadata = {
  title: "BudgeBeam",
  description: "Build your own budges"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SocketProvider>
          <Providers>
            {children}
          </Providers>
        </SocketProvider>
      </body>
    </html>
  );
}

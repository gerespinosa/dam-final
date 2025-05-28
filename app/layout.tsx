'use client';
import { SessionProvider } from "next-auth/react";
import "./globals.css";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-[100%]">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

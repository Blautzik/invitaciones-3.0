import type { Metadata } from "next";
import "./globals.css";
import { ClientBody } from "./ClientBody";
import { AppProvider } from "@/lib/context";

export const metadata: Metadata = {
  title: "Agus, Mis xv",
  description: "Te invito a festejar juntos este día tan especial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className="antialiased bg-black text-white overflow-x-hidden">
        <AppProvider>
          <ClientBody>
            {children}
          </ClientBody>
        </AppProvider>
      </body>
    </html>
  );
}

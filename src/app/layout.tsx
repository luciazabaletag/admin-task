import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AuthProvider from "./Providers/AuthProvider";
import ToastProvider from "./Providers/ToastProvider";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '600'],
});

export const metadata: Metadata = {
  title: "Admin - Task",
  description: "App hecha con Next js, TypeScript, Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

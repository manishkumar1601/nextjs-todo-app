'use client';

import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Provider } from "react-redux";
import { store } from "@/store";
import { Toaster } from 'sonner'

const roboto = Roboto({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={`${roboto.className} min-h-screen flex flex-col w-full`}>
          <Header />
          <div className="flex-1 h-full place-content-center">
            {children}
          </div>
          <Footer />
          <Toaster position="top-center" expand={false} richColors={true} />
        </body>
      </html>
    </Provider>
  );
}

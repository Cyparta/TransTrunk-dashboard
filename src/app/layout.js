
import { Nunito_Sans } from 'next/font/google';

import Header from "@/components/header/Header";

import { Toaster } from "@/components/ui/sonner"

import "./globals.css";
import LoadingPage from '@/components/loading/loadingPage';


const nunitoSansFont = Nunito_Sans({
  subsets: ['latin'], // Only load Latin characters for optimization
  weight: ['400', '500', '600', '700'], // Specify the desired weight(s) for Poppins (e.g., 400, 700 , 500 , 500)
}); // Load Poppins font with the specified weights and subsets




export const metadata = {
  title: {
    template: '%s | Trans Truck',
    default: "Trans Truck",
  },
  description: "Trans Truck is a logistics company that provides a wide range of services to meet your transportation needs.",
  // ----------- To add Meta Tags For Google Console Analytics TAG--------------------
  // verification: {
  //     google: "ujkX9ztLUb1v4Dcym8avpcc-WUGuMZ8qmB1WgUgxUMc"
  // }
};

export default function RootLayout({ children,...props }) {
  return (
    <html lang="en">
      <body className={`${nunitoSansFont.className} flex  min-h-screen bg-[#FFFFFF]`}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}

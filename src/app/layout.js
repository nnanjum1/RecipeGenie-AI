import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";
import QueryProvider from "@/providers/QueryProvider";
import { Poppins, Manrope } from "next/font/google";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata = {
  title: "RecipeGenie AI",
  description: "AI Powered Recipe Generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${manrope.variable}`}>
        <QueryProvider>
          <Navbar />
          {children}

          <Footer />
          <Toaster position="top-center" />
        </QueryProvider>


      </body>
    </html >
  );
}
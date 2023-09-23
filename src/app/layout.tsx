import PreventDroppingFrame from "@/components/preventDroppingFrame";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HNGx stage 3",
  description: "Develop a Drag-and-Drop Image gallery using Next Js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={inter.className + " h-full bg-white"}>
          <PreventDroppingFrame>{children}</PreventDroppingFrame>
      </body>
    </html>
  );
}

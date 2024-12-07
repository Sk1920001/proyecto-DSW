import {montserrat} from "./ui/fonts";
import "./globals.css";
import { AppWrapper } from "./index";
import Link from "next/link";
import UserBar from "./components/UserBar";
import Footer from "./components/Footer";



export const metadata = {
  title: "Altagracia",
  description: "Las mejores joyas precio-calidad",
};



export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased min-h-screen flex flex-col`}
      >
        <AppWrapper>
          <main className="flex-grow">
            <UserBar/>
            {children}
          </main>
          <Footer/>
        </AppWrapper>

      </body>
    </html>
  );
}



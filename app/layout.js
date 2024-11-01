import {montserrat} from "./ui/fonts";
import "./globals.css";
import { AppWrapper } from "./index";
import Link from "next/link";
import UserBar from "./components/UserBar";



export const metadata = {
  title: "Altagracia",
  description: "Las mejores joyas precio-calidad",
};



export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased`}
      >
        <AppWrapper>
          <UserBar/>
          {children}
        </AppWrapper>

      </body>
    </html>
  );
}



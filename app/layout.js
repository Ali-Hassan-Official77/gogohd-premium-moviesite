import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const manrope=Manrope({subsets:["latin"],variable:"--font-manrope",weight:["400","500","600","700","800"],display:"swap"});
export const metadata={title:"Gogo HD — Discover what's worth watching",description:"Gogo HD is a premium movie discovery and watch list experience.",icons:{icon:"/icon.svg",shortcut:"/icon.svg",apple:"/icon.svg"}};
export default function RootLayout({children}){return <html lang="en" className={manrope.variable}><body><Navbar/><main className="min-h-screen">{children}</main><Footer/>
  
  <script src="https://cdn.zanderio.ai/widget/loader.js" data-id="wdg_PJQ8WYvO9QzUZNxNgDSGAOkk" defer></script>
  </body></html>}

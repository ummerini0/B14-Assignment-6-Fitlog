import "./globals.css";
import { oswald } from "./fonts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={oswald.variable}>
      <body className="bg-[#0a0a0a] text-white">
        <PlanProvider>
          <Navbar />
          {children}
          <Footer />
          <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
        </PlanProvider>
      </body>
    </html>
  );
}   
      
      
      
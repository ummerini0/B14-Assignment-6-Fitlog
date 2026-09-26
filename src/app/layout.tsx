import "./globals.css";
import { oswald } from "./fonts";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"
     className={oswald.variable}>
      
      <body className="bg-[#0a0a0a] text-white">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
      
      
      
      
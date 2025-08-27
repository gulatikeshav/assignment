import "./globals.css";
import Providers from "./providers";
import NavBar from "../components/NavBar";

export const metadata = {
  title: "E-store",
  description: "online store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` bg-gray-50 text-gray-900 antialiased`}>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

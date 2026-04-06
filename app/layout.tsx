import type { Metadata } from "next";
import { Noto_Sans_Gurmukhi, Noto_Serif_Gurmukhi } from "next/font/google";
import "./globals.css";

const bodyFont = Noto_Sans_Gurmukhi({
  subsets: ["gurmukhi", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body"
});

const headingFont = Noto_Serif_Gurmukhi({
  subsets: ["gurmukhi", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading"
});

export const metadata: Metadata = {
  title: "ਆਕਾਲ ਬਾਣੀ | ਪੰਜਾਬੀ ਨਿਊਜ਼",
  description: "ਪੰਜਾਬੀ ਵਿੱਚ ਤਾਜ਼ਾ ਖਬਰਾਂ, ਵਿਸ਼ਲੇਸ਼ਣ ਅਤੇ ਫੀਚਰ ਕਹਾਣੀਆਂ"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pa">
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const editorial = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Fashion site | Modern occasionwear for children",
  description:
    "Distinctive tailored outfits for children, designed for celebrations and made for movement.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${editorial.variable} antialiased`}
    >
      <body>
        {children}
        <a
          className="whatsapp-float"
          href="https://wa.me/256708581479"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
        >
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path
              fill="currentColor"
              d="M16.04 3C8.86 3 3.04 8.8 3.04 15.96c0 2.29.6 4.52 1.74 6.49L3 29l6.72-1.76a13 13 0 0 0 6.32 1.61h.01c7.17 0 13-5.8 13-12.96S23.21 3 16.04 3Zm0 23.66h-.01a10.8 10.8 0 0 1-5.5-1.5l-.4-.23-3.99 1.04 1.07-3.88-.26-.4a10.7 10.7 0 0 1-1.66-5.73c0-5.95 4.85-10.78 10.8-10.78 5.95 0 10.79 4.83 10.79 10.78 0 5.96-4.85 10.7-10.84 10.7Zm5.92-8.04c-.32-.16-1.92-.94-2.22-1.05-.3-.11-.51-.16-.73.16-.22.32-.84 1.05-1.03 1.27-.19.21-.38.24-.7.08-.32-.16-1.37-.5-2.6-1.6-.96-.85-1.61-1.9-1.8-2.22-.19-.32-.02-.5.14-.66.15-.14.32-.37.49-.56.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.86.4-.3.32-1.13 1.1-1.13 2.69 0 1.58 1.16 3.12 1.32 3.33.16.21 2.28 3.47 5.52 4.87.77.33 1.37.53 1.84.68.77.24 1.48.21 2.03.13.62-.09 1.92-.78 2.19-1.54.27-.76.27-1.41.19-1.54-.08-.14-.29-.22-.61-.38Z"
            />
          </svg>
        </a>
      </body>
    </html>
  );
}

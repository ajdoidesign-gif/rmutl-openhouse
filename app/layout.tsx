import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const notoThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-noto-thai",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "เปิดบ้านราชมงคล | คณะศิลปกรรมและสถาปัตยกรรมศาสตร์ มทร.ล้านนา",
  description:
    "งานเปิดบ้านราชมงคล 2026 คณะศิลปกรรมและสถาปัตยกรรมศาสตร์ มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา ลงทะเบียนเข้าร่วมกิจกรรมของแต่ละหลักสูตร",
  openGraph: {
    title: "เปิดบ้านราชมงคล 2026",
    description: "ลงทะเบียนเข้าร่วมกิจกรรมเปิดบ้าน คณะศิลปกรรมฯ มทร.ล้านนา",
    locale: "th_TH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${playfair.variable} ${dmSans.variable} ${notoThai.variable} font-sans bg-cream text-text-main antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

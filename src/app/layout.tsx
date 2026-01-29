import type { Metadata } from "next";
import "./globals.css";
import { TestProvider } from "@/context/TestContext";
import localFont from "next/font/local";

// ✅ RIDI Batang 로컬 폰트 등록
const ridiBatang = localFont({
    src: "../fonts/RIDIBatang.otf",
    variable: "--font-ridi",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Minjoo's Shelf - 나만의 책 추천",
    description: "심리테스트로 찾는 오늘의 책",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" className={ridiBatang.variable}>
        <body className="antialiased bg-gray-50">
        <TestProvider>{children}</TestProvider>
        </body>
        </html>
    );
}

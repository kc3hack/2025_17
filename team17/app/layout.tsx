import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body className={cn(inter.className, "min-h-dvh")}>
                {/* <header className="h-16 border-b px-6 flex items-center">
                    <Button
                        asChild
                        variant={"ghost"}
                        className="font-bold text-xl"
                    >
                        <Link href="/wikipedia">HOME</Link>
                    </Button>
                </header> */}

                {children}

                {/* <footer className="h-16 sticky top-full border-t px-6 flex items-center">
          <Link href="/about">
            ABOUT
          </Link>
        </footer> */}
            </body>
        </html>
    );
}

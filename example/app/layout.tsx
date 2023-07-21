import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

export const dynamic = "error";

export const metadata = {
  title: "Perfect Syntax Highlighting",
  description:
    "A simple, lightweight, and fast syntax highlighter using React Server Components and the technology inside of VS Code",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50`}
      >
        <div className={cn(inter.className, "container m-auto pt-4 pl-4 pr-4")}>
          {children}
        </div>
      </body>
    </html>
  );
}

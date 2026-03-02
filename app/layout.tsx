import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import AnimationProvider from "@/components/AnimationProvider";

export const metadata: Metadata = {
  title: "Gabriel Pacheco — Software Engineer",
  description:
    "Portfolio of Gabriel Pacheco, a software engineer building immersive digital experiences.",
  openGraph: {
    title: "Gabriel Pacheco — Software Engineer",
    description: "Software Engineer. Crafting interfaces that breathe.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-white antialiased overflow-x-hidden">
        {/* Grain / noise overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Custom cursor */}
        <CustomCursor />

        <AnimationProvider>{children}</AnimationProvider>
      </body>
    </html>
  );
}

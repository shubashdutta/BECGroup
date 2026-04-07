import { AuthProvider } from "@/providers/AuthProvider";
import { StoreProvider } from "@/providers/StoreProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Inter } from "@/lib/fonts/localFonts";
import "@/styles/globals.css";

export const metadata = {
  title: "Baby Education",
  description: "Baby Education Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={Inter.className}>
      <AuthProvider>
        <StoreProvider>
          <ThemeProvider>
            <body>{children}</body>
          </ThemeProvider>
        </StoreProvider>
      </AuthProvider>
    </html>
  );
}

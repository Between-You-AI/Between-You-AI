import type {Metadata} from "next";
import "./globals.css";
import ThemeRegistry from "@/components/theme-registry/ThemeRegistry.component";
import {Provider} from "@/utils/Providers";

export const metadata: Metadata = {
  title: "Between You & AI",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeRegistry>
        {/* <Provider> */}
          <body>{children}</body>
        {/* </Provider> */}
      </ThemeRegistry>
    </html>
  );
}

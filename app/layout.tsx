import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { cn, getMenu } from "@/lib/utils";
import Sidebar from "@/components/sidebar/index";
import { getNodeToken, NodesData, NodesItem } from "../services/larkServices";
import Header from "../components/Header";
import Breadcrumb from "../components/Breadcrumb";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menu = await getMenu();
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <AntdRegistry>
          <main className="flex-1">
            <div className="border-b">
              <Header menu={menu} />
              <div className="pt-[50px] flex flex-row h-[calc(100vh-50px)]">
                <Sidebar menu={menu} />
                <div className="container mx-auto">
                  <Breadcrumb menu={menu}></Breadcrumb>
                  {children}
                </div>
              </div>
            </div>
          </main>
        </AntdRegistry>
      </body>
    </html>
  );
}

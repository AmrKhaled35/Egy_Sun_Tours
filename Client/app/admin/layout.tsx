import { Metadata } from "next";
import { Inter } from "next/font/google";
import AdminLayoutClient from "@/app/admin/AdminLayoutClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Panel - Egy Sun Tours",
  description:
    "Admin panel for managing tours, gallery, reviews and contact information",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} min-h-screen bg-gray-50`}>
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </div>
  );
}

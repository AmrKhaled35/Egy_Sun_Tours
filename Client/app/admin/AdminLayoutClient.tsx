"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

function parseJwt(token: string) {
  try {
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin";

  useEffect(() => {
    if (isLoginPage) return;

    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.replace("/admin");
      return;
    }

    const decoded = parseJwt(token);
    if (!decoded || decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      router.replace("/admin");
    }
  }, [pathname, router, isLoginPage]);

  return (
    <div className="flex">
      {!isLoginPage && <AdminSidebar />}
      <main className={isLoginPage ? "flex-1" : "flex-1 ml-64"}>
        <div className={isLoginPage ? "p-0" : "p-8"}>{children}</div>
      </main>
    </div>
  );
}

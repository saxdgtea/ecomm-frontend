"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, getToken } from "@/lib/api";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = getToken();
      const user = getUser();

      if (!token || !user) {
        router.push("/login");
        return;
      }

      if (adminOnly && user.role !== "admin") {
        router.push("/");
        return;
      }

      setIsAuthorized(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [router, adminOnly]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return isAuthorized ? children : null;
}

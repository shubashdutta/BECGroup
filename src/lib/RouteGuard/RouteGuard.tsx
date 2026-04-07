"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard = ({ children }: RouteGuardProps) => {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    // Check token in localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/employee_login");
    } else {
      setAllowed(true);
    }
  }, [router]);

  if (!allowed) return null;

  return <>{children}</>;
};

export default RouteGuard;

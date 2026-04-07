"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const RedirectIfAuthenticated = ({ children }: Props) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/admin");
    }
  }, [router]);

  return <>{children}</>;
};
export default RedirectIfAuthenticated;

"use client";
import { ToastContainer } from "@/components/shared/ToastContainer";
import { useToastStore } from "@/store/toastStore";
import { ToastConfig } from "@/config/toastConfig";

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toasts, dismiss } = useToastStore();
  return (
    <ToastContainer toasts={toasts} onDismiss={dismiss} config={ToastConfig}>
      {children}
    </ToastContainer>
  );
}

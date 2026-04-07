"use client";
import { PaymentForm } from "@/components/student/classes/PaymentForm";
import { processPayment } from "@/lib/api/student/payment";
import { usePaymentStore } from "@/store/paymentStore";
import { PaymentSummary } from "@/components/student/classes/PaymentSummary";

export default function ClassPaymentPage() {
  const { payment, processPayment: process, loading } = usePaymentStore();
  return <PaymentForm payment={payment} onSubmit={process} loading={loading} />;
}

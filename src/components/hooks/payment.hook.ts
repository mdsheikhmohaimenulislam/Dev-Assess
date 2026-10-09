"use client";

import { createPayment, executePayment, getMyPayments } from "@/api/payment.api";
import { useMutation, useQuery } from "@tanstack/react-query";



export function useCreatePayment() {
  return useMutation({
    mutationFn: (problemId: string) =>
      createPayment(problemId),
  });
}

export function useExecutePayment() {
  return useMutation({
    mutationFn: (paymentId: string) =>
      executePayment(paymentId),
  });
}



export function useGetMyPayments() {
  return useQuery({
    queryKey: ["my-payments"],
    queryFn: getMyPayments,
    staleTime: 30 * 1000,
  });
}
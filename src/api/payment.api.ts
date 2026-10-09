import apiClient from "@/lib/apiClient";


export interface CreatePaymentResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    paymentId: string;
    bkashPaymentId: string;
    bkashURL?: string;
  };
}

export interface ExecutePaymentResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    status: "PENDING" | "PAID" | "FAILED" | "CANCELLED";
    paymentMethod: "BKASH";
    amount: number;
    currency: string;
    bkashPaymentId: string | null;
    bkashTrxId: string | null;
    paidAt: string | null;
  };
}

export function createPayment(problemId: string) {
  return apiClient<CreatePaymentResponse>(
    `/payment/${problemId}`,
    {
      method: "POST",
    },
  );
}

export function executePayment(paymentId: string) {
  return apiClient<ExecutePaymentResponse>(
    `/payment/execute/${paymentId}`,
    {
      method: "GET",
    },
  );
}




export interface MyPayment {
  id: string;
  problemId: string;
  status: "PENDING" | "PAID" | "FAILED" | "CANCELLED";
  amount: number;
  currency: string;
  paidAt: string | null;
}

export interface GetMyPaymentsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: MyPayment[];
}

export function getMyPayments() {
  return apiClient<GetMyPaymentsResponse>(
    "/payment",
    {
      method: "GET",
    },
  );
}
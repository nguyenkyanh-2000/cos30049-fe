import { components, paths } from "@/lib/types";

export type TransactionDto = components["schemas"]["TransactionDto"];

// GET /api/wallets/{address}/transactions
export type SuccessGetWalletTransactionsResponse =
  paths["/api/wallets/{address}/transactions"]["get"]["responses"]["200"]["content"]["application/json"];

export type ErrorGetWalletTransactionsResponse =
  paths["/api/wallets/{address}/transactions"]["get"]["responses"]["500"]["content"]["application/json"];

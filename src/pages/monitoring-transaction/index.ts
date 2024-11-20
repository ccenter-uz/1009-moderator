import { lazy } from "react";

export const MonitoringTransactionsAsync = lazy(() =>
  import("./ui").then((module) => ({
    default: module.MonitoringTransactionUI,
  })),
);

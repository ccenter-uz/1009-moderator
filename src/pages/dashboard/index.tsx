import { lazy } from "react";

export const DashboardAsync = lazy(() =>
  import("./ui").then((module) => ({ default: module.DashboardPage })),
);

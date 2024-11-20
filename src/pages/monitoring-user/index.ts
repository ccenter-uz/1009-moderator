import { lazy } from "react";

export const MonitoringUserAsync = lazy(() =>
  import("./ui").then((module) => ({ default: module.MonitoringUserUI })),
);

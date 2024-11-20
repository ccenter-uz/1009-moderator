import { lazy } from "react";

export const MonitoringOrgsAsync = lazy(() =>
  import("./ui").then((module) => ({ default: module.MonitoringOrgsUI })),
);

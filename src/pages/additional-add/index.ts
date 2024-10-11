import { lazy } from "react";
export const AdditionalAddAsync = lazy(() =>
  import("./ui").then((module) => ({ default: module.AdditionalAdd })),
);

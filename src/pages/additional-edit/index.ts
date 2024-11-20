import { lazy } from "react";
export const AdditionalEditAsync = lazy(() =>
  import("./ui").then((module) => ({ default: module.AdditionalEdit })),
);

import { lazy } from "react";

export const AdditionalAsync = lazy(() =>
  import("./ui").then((module) => ({ default: module.Additional })),
);
export { useAdditionalSlice } from "./model/Slicer";

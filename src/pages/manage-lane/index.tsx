import { lazy } from "react";

export const ManageLaneAsync = lazy(() =>
  import("./ui").then((module) => ({
    default: module.ManageLanePage,
  })),
);

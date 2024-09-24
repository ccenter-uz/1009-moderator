import { lazy } from "react";

export const ManageCategoryAsync = lazy(() =>
  import("./ui").then((module) => ({
    default: module.ManageCategoryPage,
  })),
);

import { lazy } from "react";

export const ManageAreaAsync = lazy(() =>
  import("./ui").then((module) => ({
    default: module.ManageAreaPage,
  })),
);

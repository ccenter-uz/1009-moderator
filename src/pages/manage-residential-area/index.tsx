import { lazy } from "react";

export const ManageResidentialAreaAsync = lazy(() =>
  import("./ui").then((module) => ({
    default: module.ManageResidentialAreaPage,
  })),
);

import { lazy } from "react";

export const ManageAvenueAsync = lazy(() =>
  import("./ui").then((module) => ({
    default: module.ManageAvenuePage,
  })),
);

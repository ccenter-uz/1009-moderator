import { lazy } from "react";

export const ManagePassageAsync = lazy(() =>
  import("./ui").then((module) => ({
    default: module.ManagePassagePage,
  })),
);

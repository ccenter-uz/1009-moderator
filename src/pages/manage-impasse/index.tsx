import { lazy } from "react";

export const ManageImpasseAsync = lazy(() =>
  import("./ui").then((module) => ({
    default: module.ManageImpassePage,
  })),
);

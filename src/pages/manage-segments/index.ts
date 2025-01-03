import { lazy } from "react";

export const ManageSegmentsAsync = lazy(() =>
  import("./ui").then((module) => ({
    default: module.ManageSegmentsPage,
  })),
);

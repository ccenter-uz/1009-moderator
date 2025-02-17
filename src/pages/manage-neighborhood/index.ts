import { lazy } from "react";

export const ManageNeighborhoodAsync = lazy(() =>
  import("./ui").then((module) => ({
    default: module.ManageNeighborhoodPage,
  })),
);

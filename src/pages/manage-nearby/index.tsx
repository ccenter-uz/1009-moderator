import { lazy } from "react";

export const ManageNearbyAsync = lazy(() =>
  import("./ui").then((module) => ({
    default: module.ManageNearbyPage,
  })),
);

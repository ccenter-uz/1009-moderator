import { lazy } from "react";

export const ManageVillageAsync = lazy(() =>
  import("./ui").then((module) => ({
    default: module.ManageVillagePage,
  })),
);

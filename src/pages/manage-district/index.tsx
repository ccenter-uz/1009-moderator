import { lazy } from "react";

export const ManageDistrictAsync = lazy(() =>
  import("./ui").then((module) => ({
    default: module.ManageDistrictPage,
  })),
);

import { lazy } from "react";

export const ManageProductServicesAsync = lazy(() =>
  import("./ui").then((module) => ({
    default: module.ManageProductServicesPage,
  })),
);

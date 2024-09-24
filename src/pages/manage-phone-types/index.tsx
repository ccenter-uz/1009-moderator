import { lazy } from "react";

export const ManagePhoneTypesAsync = lazy(() =>
  import("./ui").then((module) => ({
    default: module.ManagePhoneTypesPage,
  })),
);

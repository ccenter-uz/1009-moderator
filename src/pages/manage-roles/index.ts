import { lazy } from "react";

export const ManageRolesAsync = lazy(() =>
  import("./ui").then((module) => ({ default: module.ManageRolesUI })),
);

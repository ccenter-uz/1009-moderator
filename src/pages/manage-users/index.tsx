import { lazy } from "react";

export const ManageUsersAsync = lazy(() =>
  import("./ui").then((module) => ({
    default: module.ManageUsersPage,
  })),
);

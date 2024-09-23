import { lazy } from "react";

export const ManageMainOrgAsync = lazy(() =>
  import("./ui").then((module) => ({
    default: module.ManageMainOrgPage,
  })),
);

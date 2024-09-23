import { lazy } from "react";

export const OrgAllAsync = lazy(() =>
  import("./ui").then((module) => ({
    default: module.OrgAllPage,
  })),
);

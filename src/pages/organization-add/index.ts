import { lazy } from "react";

export const OrgAddAsync = lazy(() =>
  import("./ui").then((module) => ({
    default: module.OrgAddPage,
  })),
);

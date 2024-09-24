import { lazy } from "react";

export const OrgMineAsync = lazy(() =>
  import("./ui").then((module) => ({
    default: module.OrgMinePage,
  })),
);

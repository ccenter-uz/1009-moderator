import { lazy } from "react";

export const OrgEditAsync = lazy(() =>
  import("./ui").then((module) => ({
    default: module.OrgEditPage,
  })),
);

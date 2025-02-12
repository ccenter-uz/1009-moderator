import { lazy } from "react";

export const OrgWaitingsAsync = lazy(() =>
  import("./ui").then((module) => ({
    default: module.OrganizationWaitingsPage,
  })),
);

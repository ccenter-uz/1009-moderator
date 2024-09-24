import { lazy } from "react";

export const OrgUnconfirmedAsync = lazy(() =>
  import("./ui").then((module) => ({
    default: module.OrgUnconfirmedPage,
  })),
);

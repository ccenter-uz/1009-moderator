import { lazy } from "react";

export const ManageStreetAsync = lazy(() =>
  import("./ui").then((module) => ({
    default: module.ManageStreetPage,
  })),
);

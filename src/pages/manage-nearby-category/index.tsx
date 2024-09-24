import { lazy } from "react";

export const ManageNearbyCategoryAsync = lazy(() =>
  import("./ui").then((module) => ({
    default: module.ManageNearbyCategoryPage,
  })),
);

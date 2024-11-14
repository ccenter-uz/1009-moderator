import { lazy } from "react";

export const LoginAsync = lazy(() =>
  import("./ui").then((module) => ({ default: module.LoginPage })),
);

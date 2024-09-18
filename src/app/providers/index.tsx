import { withErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { compose } from "@shared/lib/react";
import { ErrorHandler, logError } from "@shared/ui/error-handler";

import { store } from "../store";

import { router } from "./routerProvider";

const enhance = compose((component) =>
  withErrorBoundary(component, {
    FallbackComponent: ErrorHandler,
    onError: logError,
  }),
);

export const ProviderWrapper = enhance(() => (
  <>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </>
));

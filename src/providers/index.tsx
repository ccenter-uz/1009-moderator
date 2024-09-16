import { withErrorBoundary } from "react-error-boundary";

// import { QueryClientProvider } from "./QueryClientProvider";

import { compose } from "@shared/lib/react";
import { ErrorHandler, logError } from "@shared/ui/error-handler";
// import { Spinner, spinnerModel } from "@shared/ui/spinner";

import { BrowserRouter } from "./routerProvider";

const enhance = compose((component: any) =>
  withErrorBoundary(component, {
    FallbackComponent: ErrorHandler,
    onError: logError,
  }),
);

export const Provider = enhance(() => (
  <>
    {/* <GlobalSpinner /> */}
    {/* <QueryClientProvider> */}
    <BrowserRouter />
    {/* </QueryClientProvider> */}
  </>
));

// function GlobalSpinner() {
//   const display = spinnerModel.globalSpinner.use.display();

//   return <Spinner display={display} position="bottom-right" />;
// }

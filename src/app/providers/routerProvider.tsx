// import { createElement, lazy } from "react";
// import {
//   RouterProvider,
//   createBrowserRouter,
//   redirect,
//   useRouteError,
// } from "react-router-dom";

// import { compose, withSuspense } from "@shared/lib/react";
// import { pathKeys } from "@shared/lib/react-router";
// // import { homePageRoute } from '@pages/home';

// export function BrowserRouter() {
//   return <RouterProvider router={browserRouter} />;
// }

// const enhance = compose((component) =>
//   withSuspense(component, { FallbackComponent: LayoutSkeleton }),
// );

// // const MainLayout = lazy(() =>
// //   import("@pages/mainLayouts").then((module) => ({
// //     default: module.MainLayout,
// //   })),
// // );

// function BubbleError() {
//   const error = useRouteError();

//   if (error) throw error;
//   return null;
// }

// const browserRouter = createBrowserRouter([
//   {
//     errorElement: <BubbleError />,
//     children: [
//       // {
//       //   element: createElement(enhance(MainLayout)),
//       //   children: [homePageRoute],
//       // },
//       {
//         loader: async () => redirect(pathKeys.page404()),
//         path: "*",
//       },
//     ],
//   },
// ]);

// function LayoutSkeleton() {
//   return <div>Loading...</div>;
// }

import { createBrowserRouter } from "react-router-dom";

import { routesPath } from "@shared/utils/routes";

export const router = createBrowserRouter(routesPath);

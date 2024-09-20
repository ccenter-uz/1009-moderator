import { useLocation } from "react-router-dom";

import { routesPath } from "./routes";

// GET-KEY-FROM-ROUTES
export const getActiveKeyFromRoutes = (
  routes: (typeof routesPath)[0]["children"],
  location: ReturnType<typeof useLocation>,
) => {
  return routes?.reduce((activeKey, route) => {
    const isCurrentRoute = route.name === location.pathname;

    if (isCurrentRoute) return route.key;

    const foundKey = route.children?.find(
      (child) => child.name === location.pathname,
    )?.key;

    if (foundKey) return foundKey;

    return activeKey;
  }, "");
};

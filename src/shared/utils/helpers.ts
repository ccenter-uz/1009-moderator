import i18n from "i18next";
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

export const columnsForAddress: {
  title: string;
  dataIndex: string;
  key: string;
  align?: "left" | "center" | "right";
  render?: (t: string, record: { id: number | string }) => JSX.Element;
}[] = [
  {
    title: i18n.t("name"),
    dataIndex: "name",
    key: "name",
  },
  {
    title: i18n.t("old_name"),
    dataIndex: "old_name",
    key: "old_name",
  },
  {
    title: i18n.t("new_name"),
    dataIndex: "new_name",
    key: "new_name",
  },
  {
    title: i18n.t("region"),
    dataIndex: "region",
    key: "region",
  },
  {
    title: i18n.t("city"),
    dataIndex: "city",
    key: "city",
  },
  {
    title: i18n.t("district"),
    dataIndex: "district",
    key: "district",
  },
  {
    title: i18n.t("index"),
    dataIndex: "index",
    key: "index",
  },
  {
    title: i18n.t("update_date"),
    dataIndex: "updated_date",
    key: "updated_date",
  },
  {
    title: i18n.t("employee"),
    dataIndex: "employee",
    key: "employee",
  },
];

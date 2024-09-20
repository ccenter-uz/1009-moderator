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
    title: "Название",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Cтарое название",
    dataIndex: "old_name",
    key: "old_name",
  },
  {
    title: "Новое название",
    dataIndex: "new_name",
    key: "new_name",
  },
  {
    title: "Регион",
    dataIndex: "region",
    key: "region",
  },
  {
    title: "Город",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Район",
    dataIndex: "district",
    key: "district",
  },
  {
    title: "Индекс",
    dataIndex: "index",
    key: "index",
  },
  {
    title: "Дата изменения",
    dataIndex: "updated_date",
    key: "updated_date",
  },
  {
    title: "Сотрудник",
    dataIndex: "employee",
    key: "employee",
  },
];

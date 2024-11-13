import { MenuProps, Menu } from "antd";
import { FC } from "react";
import "./style.css";
import { useLocation } from "react-router-dom";

import { routesPath } from "@shared/lib/react-router";

type MenuItem = {
  key: string;
  icon?: JSX.Element;
  label?: JSX.Element;
  private?: string | undefined;
  element?: JSX.Element;
  name?: string;
  children?: MenuItem[];
};

const filterPrivateRoutes = (routes: MenuItem[]): MenuItem[] => {
  return routes
    ?.filter((route) => route.private !== "true")
    .map((route) => {
      if (route.children) {
        return { ...route, children: filterPrivateRoutes(route.children) };
      }
      return route;
    });
};

export const SiderUI: FC = () => {
  const location = useLocation();
  const menuItems = filterPrivateRoutes(
    (routesPath[0]?.children as MenuItem[]) || [],
  );

  const items: MenuProps["items"] = menuItems?.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: item.label,
    children: item.children?.map((child) => ({
      key: child.key,
      icon: child.icon,
      label: child.label,
    })),
  }));

  return (
    <aside aria-label="Sider">
      <Menu
        defaultSelectedKeys={[location.pathname as string]}
        style={{
          background: "transparent",
          borderRight: 0,
        }}
        items={items}
        mode="inline"
      />
    </aside>
  );
};

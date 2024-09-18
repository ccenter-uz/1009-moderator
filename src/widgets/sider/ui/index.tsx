import { Menu } from "antd";
import { FC } from "react";
import { useLocation } from "react-router-dom";
import "./style.css";

import { getActiveKeyFromRoutes } from "@shared/utils/helpers";
import { routesPath } from "@shared/utils/routes";

export const SiderUI: FC = () => {
  const location = useLocation();
  const activeKey = getActiveKeyFromRoutes(
    routesPath[0].children || [],
    location,
  );

  return (
    <aside aria-label="Sider">
      <Menu
        defaultSelectedKeys={[activeKey as string]}
        style={{
          background: "transparent",
          borderRight: 0,
        }}
        items={
          routesPath[0]?.children && routesPath[0]?.children.map((item) => item)
        }
        mode="inline"
      />
    </aside>
  );
};

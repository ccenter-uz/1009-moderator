import { Menu } from "antd";
import { FC } from "react";
import "./style.css";
import { useLocation } from "react-router-dom";

import { routesPath } from "@shared/lib/react-router";

export const SiderUI: FC = () => {
  const location = useLocation();

  return (
    <aside aria-label="Sider">
      <Menu
        defaultSelectedKeys={[location.pathname as string]}
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

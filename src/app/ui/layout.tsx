import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";

import { HeaderUI } from "@widgets/header";
import { SiderUI } from "@widgets/sider";

import { getLocalStorage, STEPS_EDIT_KEYS } from "@shared/lib/helpers";
import { CustomizeUI, FloatBtn, LoadingSpinner } from "@shared/ui";
const MainLayout = () => {
  const [editId, setEditId] = useState<string | number | null>(
    getLocalStorage(STEPS_EDIT_KEYS.EDIT_ID),
  );

  return (
    <Layout style={{ height: "100dvh" }}>
      {/* HEADER */}
      <Header style={{ height: "fit-content", padding: 0 }}>
        <HeaderUI />
      </Header>
      <Layout>
        {/* SIDER */}
        <Sider
          width={"auto"}
          style={{
            background: "var(--sider-bg-color)",
            padding: "8px 16px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <SiderUI />
        </Sider>
        <Layout style={{ overflowY: "auto" }}>
          {/* CONTENT */}
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: "16px",
                minHeight: "100%",
                background: "#fff",
              }}
            >
              <Suspense fallback={<LoadingSpinner />}>
                <Outlet context={{ editId, setEditId }} />
              </Suspense>
              <CustomizeUI />
              {editId && <FloatBtn setEditId={setEditId} />}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

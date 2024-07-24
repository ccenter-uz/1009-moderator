import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Flex, Layout, Menu, theme } from "antd";
import React from "react";

import mainLogo from "../../../assets/wfm_logopng.png";

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps["items"] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        style={{
          background: colorBgContainer,
          boxShadow: "30px, 10px 60px	10px rgb(0, 0, 0)",
          padding: "28px 0 16px 0",
          overflow: "auto",
          position: "sticky",
          left: 0,
          top: 0,
          height: "100vh",
        }}
        width="281px"
      >
        <Flex vertical={true} align="center" gap="30px">
          <div
            className="demo-logo-vertical"
            style={{ width: "183px", height: "32px" }}
          >
            <img src={mainLogo} width="183" height="32" alt="WFM System" />
          </div>
          <Menu
            mode="inline"
            style={{
              borderInlineEnd: "none",
            }}
            defaultSelectedKeys={["4"]}
            items={items}
          />
        </Flex>
      </Sider>
      <Layout style={{ margin: "0 24px" }}>
        <Header
          style={{
            padding: 16,
            height: "81px",
            position: "sticky",
            top: 0,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            background: colorBgContainer,
            borderBottomLeftRadius: borderRadiusLG,
            borderBottomRightRadius: borderRadiusLG,
          }}
        />

        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>

        <Content style={{ marginTop: "24px" }}>
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <p>long content</p>
            {
              // indicates very long content
              Array.from({ length: 100 }, (_, index) => (
                <React.Fragment key={index}>
                  {index % 20 === 0 && index ? "more" : "..."}
                  <br />
                </React.Fragment>
              ))
            }
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;

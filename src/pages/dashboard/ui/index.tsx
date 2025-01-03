import { Col, Row, Typography } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

import { DashboardBarChart } from "@features/dashboard-bar-chart";
import { DashboardDonutChart } from "@features/dashboard-donut-chart";
import { DashboardLineChart } from "@features/dashboard-line-chart";

import { DashboardHeaderCards } from "@shared/ui";

const headerCards = [
  {
    key: 1,
    count: 100,
    paragpraph: "Total Users",
    icon: <FaArrowAltCircleUp size={34} color="#3ebd66" />,
  },
  {
    key: 2,
    count: 95,
    paragpraph: "Total Income",
    icon: <FaArrowAltCircleDown size={34} color="#fb4e4e" />,
  },
  {
    key: 3,
    count: 55,
    paragpraph: "Total Organizations",
    icon: <FaArrowAltCircleUp size={34} color="#b3a1ff" />,
  },
  {
    key: 4,
    count: 12,
    paragpraph: "Total Left",
    icon: <FaArrowAltCircleDown size={34} color="#0099ff" />,
  },
];

export const DashboardPage: FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Typography.Title level={3}>{t("main-page")}</Typography.Title>
      <Row gutter={[16, 16]}>
        {headerCards?.map((card) => (
          <Col key={card.key} span={6}>
            <DashboardHeaderCards
              paragpraph={card.paragpraph}
              count={card.count}
              icon={card.icon}
            />
          </Col>
        ))}
      </Row>
      <Row
        gutter={[24, 24]}
        justify={"space-between"}
        style={{ marginTop: "2em" }}
      >
        <Col span={7}>
          <DashboardDonutChart />
        </Col>
        <Col span={17}>
          <DashboardBarChart />
        </Col>
      </Row>
      <Row style={{ marginTop: "2em" }}>
        <Col span={24}>
          <DashboardLineChart />
        </Col>
      </Row>
    </div>
  );
};

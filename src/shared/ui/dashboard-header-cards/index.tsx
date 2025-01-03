import { Col, Flex, Row, Typography } from "antd";
import { FC } from "react";

interface Props {
  icon: React.ReactNode;
  count: number | string;
  paragpraph: string;
}

const styles = {
  padding: "16px 20px",
  borderRadius: "8px",
  boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.25)",
  countStyle: {
    fontSize: "28px",
    fontWeight: "600",
  },
  paragraphStyle: {
    fontSize: "14px",
  },
};

export const DashboardHeaderCards: FC<Props> = (props) => {
  const { icon, count = 100, paragpraph } = props;

  return (
    <Flex align="center" justify="space-between" style={styles}>
      <Row>
        <Col span={24}>
          <Typography.Text style={styles.countStyle}>{count}</Typography.Text>
        </Col>
        <Col span={24}>
          <Typography.Text style={styles.paragraphStyle}>
            {paragpraph}
          </Typography.Text>
        </Col>
      </Row>
      <div>{icon}</div>
    </Flex>
  );
};

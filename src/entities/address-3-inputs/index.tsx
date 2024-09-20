import { Row, Col, Input, Select, Form } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const Address3Inputs: FC = () => {
  const { t } = useTranslation();

  return (
    <Row gutter={8}>
      <Col xs={24} sm={12} md={12} lg={12} xl={5}>
        <Form.Item name={"index"} label={t("index")} layout="vertical">
          <Input type="text" placeholder={t("index")} />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={6}>
        <Form.Item name={"region"} label={t("region")} layout="vertical">
          <Select placeholder={t("region")} />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={6}>
        <Form.Item name={"city"} label={t("city")} layout="vertical">
          <Select placeholder={t("city")} />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={6}>
        <Form.Item name={"district"} label={t("district")} layout="vertical">
          <Select placeholder={t("district")} />
        </Form.Item>
      </Col>
    </Row>
  );
};

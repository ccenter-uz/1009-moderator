import { Row, Col, Input, Form } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const NameInputsCyrill: FC = () => {
  const { t } = useTranslation();
  return (
    <Row gutter={8}>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item
          name={"name_uzcyrill"}
          label={t("name-cyrill")}
          layout="vertical"
        >
          <Input type="text" placeholder={t("name-cyrill")} />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item
          name={"old_name_uzcyrill"}
          label={t("old_name_cyrill")}
          layout="vertical"
        >
          <Input type="text" placeholder={t("old_name_cyrill")} />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item
          name={"new_name_uzcyrill"}
          label={t("new_name_cyrill")}
          layout="vertical"
        >
          <Input type="text" placeholder={t("new_name_cyrill")} />
        </Form.Item>
      </Col>
    </Row>
  );
};

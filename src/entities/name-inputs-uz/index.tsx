import { Row, Col, Input, Form } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const NameInputsUz: FC = () => {
  const { t } = useTranslation();
  return (
    <Row gutter={8}>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item name={"name_uz"} label={t("name-uz")} layout="vertical">
          <Input type="text" placeholder={t("name-uz")} />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item
          name={"old_name_uz"}
          label={t("old_name_uz")}
          layout="vertical"
        >
          <Input type="text" placeholder={t("old_name_uz")} />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item
          name={"new_name_uz"}
          label={t("new_name_uz")}
          layout="vertical"
        >
          <Input type="text" placeholder={t("new_name_uz")} />
        </Form.Item>
      </Col>
    </Row>
  );
};

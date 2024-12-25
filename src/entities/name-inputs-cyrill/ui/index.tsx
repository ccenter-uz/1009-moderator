import { Row, Col, Input, Form } from "antd";
import { Rule } from "antd/es/form";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  rule: Rule;
}

export const NameInputsCyrill: FC<IProps> = ({ rule }) => {
  const { t } = useTranslation();
  return (
    <Row gutter={8}>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item
          name={"name_uzcyrill"}
          rules={[rule]}
          label={t("name-cyrill")}
          layout="vertical"
        >
          <Input type="text" placeholder={t("name-cyrill")} />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item
          name={"old_name_uzcyrill"}
          rules={[rule]}
          label={t("old_name_cyrill")}
          layout="vertical"
        >
          <Input type="text" placeholder={t("old_name_cyrill")} />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item
          name={"new_name_uzcyrill"}
          rules={[rule]}
          label={t("new_name_cyrill")}
          layout="vertical"
        >
          <Input type="text" placeholder={t("new_name_cyrill")} />
        </Form.Item>
      </Col>
    </Row>
  );
};

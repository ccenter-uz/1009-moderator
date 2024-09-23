import { Row, Col, Input, Form } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const PersonalSearchPartUI: FC = () => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col span={24}>
        <Form.Item
          name="name"
          label={t("abonent")}
          style={{ marginBottom: 10 }}
        >
          <Input type="text" placeholder={t("abonent")} allowClear />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="address"
          label={t("address")}
          style={{ marginBottom: 10 }}
        >
          <Input type="text" placeholder={t("address")} allowClear />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="category-tu"
          label={t("category-tu")}
          style={{ marginBottom: 10 }}
        >
          <Input type="text" placeholder={t("category-tu")} allowClear />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="sub-category-tu"
          label={t("sub-category-tu")}
          style={{ marginBottom: 10 }}
        >
          <Input type="text" placeholder={t("sub-category-tu")} allowClear />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="phone-type"
          label={t("phone-type")}
          style={{ marginBottom: 10 }}
        >
          <Input type="text" placeholder={t("phone-type")} allowClear />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="main-org"
          label={t("main-org")}
          style={{ marginBottom: 10 }}
        >
          <Input type="text" placeholder={t("main-org")} allowClear />
        </Form.Item>
      </Col>
    </Row>
  );
};

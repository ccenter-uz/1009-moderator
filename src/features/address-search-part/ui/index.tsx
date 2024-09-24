import { Row, Col, Input, Form } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const AddressSearchPartUI: FC = () => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col span={24}>
        <Form.Item
          name="region"
          label={t("region")}
          style={{ marginBottom: 10 }}
        >
          <Input type="text" placeholder={t("region")} allowClear />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item name="city" label={t("city")} style={{ marginBottom: 10 }}>
          <Input type="text" placeholder={t("city")} allowClear />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="district"
          label={t("district")}
          style={{ marginBottom: 10 }}
        >
          <Input type="text" placeholder={t("district")} allowClear />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="village"
          label={t("village")}
          style={{ marginBottom: 10 }}
        >
          <Input type="text" placeholder={t("village")} allowClear />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="address-sprav"
          label={t("address-sprav")}
          style={{ marginBottom: 10 }}
        >
          <Input type="text" placeholder={t("address-sprav")} allowClear />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="nearby"
          label={t("nearby")}
          style={{ marginBottom: 10 }}
        >
          <Input type="text" placeholder={t("nearby")} allowClear />
        </Form.Item>
      </Col>
    </Row>
  );
};

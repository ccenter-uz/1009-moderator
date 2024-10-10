import { Row, Col, Input, Form, Checkbox } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const ContactSearchPartUI: FC = () => {
  const { t } = useTranslation();

  return (
    <Row>
      <Col span={24}>
        <Form.Item name="phone" label={t("phone")} style={{ marginBottom: 10 }}>
          <Input type="text" placeholder={t("phone")} allowClear />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="old_phone"
          label={t("old_phone")}
          style={{ marginBottom: 10 }}
        >
          <Input type="text" placeholder={t("old_phone")} allowClear />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="atc" label={t("atc")} style={{ marginBottom: 10 }}>
              <Input type="text" placeholder={t("atc")} allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="kvartal"
              label={t("kvartal")}
              style={{ marginBottom: 10 }}
            >
              <Input type="text" placeholder={t("kvartal")} allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="home"
              label={t("home")}
              style={{ marginBottom: 10 }}
            >
              <Input type="text" placeholder={t("home")} allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="apartment"
              label={t("apartment")}
              style={{ marginBottom: 10 }}
            >
              <Input type="text" placeholder={t("apartment")} allowClear />
            </Form.Item>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="belong-abonent"
              label={t("belong-abonent")}
              style={{ marginBottom: 10 }}
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="bounded"
              label={t("bounded")}
              style={{ marginBottom: 10 }}
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="mine"
              label={t("mine")}
              style={{ marginBottom: 10 }}
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="no-phone-abonent"
              label={t("no-phone-abonent")}
              style={{ marginBottom: 10 }}
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="no-bounded"
              label={t("no-bounded")}
              style={{ marginBottom: 10 }}
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

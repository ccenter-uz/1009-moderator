import { Row, Col, Input, Form, Checkbox, Select } from "antd";
import i18next from "i18next";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { getLocalStorage, ROLES } from "@shared/lib/helpers";

const statusOptions = [
  {
    value: -1,
    label: i18next.t("inactive"),
  },
  {
    value: 1,
    label: i18next.t("active"),
  },
];

export const ContactSearchPartUI: FC = () => {
  const { t } = useTranslation();
  const role = getLocalStorage("user-role");

  return (
    <Row>
      <Col span={24}>
        <Form.Item name="phone" label={t("phone")} style={{ marginBottom: 10 }}>
          <Input type="text" placeholder={t("phone")} allowClear />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Row gutter={24}>
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
              name="belongAbonent"
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
          <Col span={8}>
            <Form.Item
              name="fromOperator"
              label={t("from-operators")}
              style={{ marginBottom: 10 }}
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          {role === ROLES.MODERATOR && (
            <Col span={12}>
              <Form.Item
                name="status"
                label={t("status")}
                style={{ marginBottom: 10 }}
              >
                <Select options={statusOptions} allowClear />
              </Form.Item>
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  );
};

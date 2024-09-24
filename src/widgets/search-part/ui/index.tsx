import { Button, Col, Divider, Flex, Form, Input, Row } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { AddressSearchPartUI } from "@features/address-search-part";
import { ContactSearchPartUI } from "@features/contact-search-part";
import { PersonalSearchPartUI } from "@features/personal-search-part";

export const SearchPartUI: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <Form form={form} id="search-part">
      <Form.Item
        name="category"
        label={t("category")}
        style={{ marginBottom: 10 }}
      >
        <Input type="text" placeholder={t("category")} allowClear />
      </Form.Item>
      <Form.Item
        name="sub-category"
        label={t("sub-category")}
        style={{ marginBottom: 10 }}
      >
        <Input type="text" placeholder={t("sub-category")} allowClear />
      </Form.Item>
      <Divider />
      <Row gutter={24}>
        <Col span={8}>
          <PersonalSearchPartUI />
        </Col>
        <Col span={8}>
          <AddressSearchPartUI />
        </Col>
        <Col span={8}>
          <ContactSearchPartUI />
        </Col>
      </Row>
      <Flex justify="end" align="middle" gap={8}>
        <Button>{t("cancel")}</Button>
        <Button htmlType="submit" type="primary">
          {t("search")}
        </Button>
      </Flex>
      <Divider />
    </Form>
  );
};

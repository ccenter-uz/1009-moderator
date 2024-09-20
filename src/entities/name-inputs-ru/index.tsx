import { Row, Col, Input, Form } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const NameInputsRu: FC = () => {
  const { t } = useTranslation();
  return (
    <Row gutter={8}>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item name={"name_ru"} label={t("name-ru")} layout="vertical">
          <Input type="text" placeholder={t("name-ru")} />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item
          name={"old_name_ru"}
          label={t("old_name_ru")}
          layout="vertical"
        >
          <Input type="text" placeholder={t("old_name_ru")} />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item
          name={"new_name_ru"}
          label={t("new_name_ru")}
          layout="vertical"
        >
          <Input type="text" placeholder={t("new_name_ru")} />
        </Form.Item>
      </Col>
    </Row>
  );
};

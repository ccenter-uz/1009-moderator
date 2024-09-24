import { Row, Col, Input, Form } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const SingleNameRu: FC = () => {
  const { t } = useTranslation();
  return (
    <Row gutter={8}>
      <Col span={24}>
        <Form.Item name={"name_ru"} label={t("name-ru")} layout="vertical">
          <Input type="text" placeholder={t("name-ru")} />
        </Form.Item>
      </Col>
    </Row>
  );
};

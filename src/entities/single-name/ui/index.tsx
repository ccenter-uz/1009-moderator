import { Row, Col, Input, Form } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const SingleName: FC = () => {
  const { t } = useTranslation();
  return (
    <Row gutter={8}>
      <Col span={24}>
        <Form.Item name={"name"} label={t("name")} layout="vertical">
          <Input type="text" placeholder={t("name")} />
        </Form.Item>
      </Col>
    </Row>
  );
};

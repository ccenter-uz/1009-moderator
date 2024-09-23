import { Row, Col, Input, Form } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const SingleNameUz: FC = () => {
  const { t } = useTranslation();
  return (
    <Row gutter={8}>
      <Col span={24}>
        <Form.Item name={"name_uz"} label={t("name-uz")} layout="vertical">
          <Input type="text" placeholder={t("name-uz")} />
        </Form.Item>
      </Col>
    </Row>
  );
};

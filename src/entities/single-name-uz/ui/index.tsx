import { Row, Col, Input, Form } from "antd";
import { Rule } from "antd/es/form";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  rule: Rule;
}

export const SingleNameUz: FC<IProps> = ({ rule }) => {
  const { t } = useTranslation();
  return (
    <Row gutter={8}>
      <Col span={24}>
        <Form.Item
          name={"name_uz"}
          rules={[rule]}
          label={t("name-uz")}
          layout="vertical"
        >
          <Input type="text" placeholder={t("name-uz")} />
        </Form.Item>
      </Col>
    </Row>
  );
};

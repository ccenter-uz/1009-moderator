import { Row, Col, Input, Form } from "antd";
import { Rule } from "antd/es/form";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  rule: Rule;
}

export const SingleNameCyrill: FC<IProps> = ({ rule }) => {
  const { t } = useTranslation();
  return (
    <Row gutter={8}>
      <Col span={24}>
        <Form.Item
          name={"name_cyrill"}
          rules={[rule]}
          label={t("name-cyrill")}
          layout="vertical"
        >
          <Input type="text" placeholder={t("name-cyrill")} />
        </Form.Item>
      </Col>
    </Row>
  );
};

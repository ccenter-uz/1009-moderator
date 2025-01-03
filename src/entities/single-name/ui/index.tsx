import { Row, Col, Input, Form } from "antd";
import { Rule } from "antd/es/form";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  rule: Rule;
  requiredFields?: string[];
}

const FORM_ITEMS = {
  name: "name",
};

export const SingleName: FC<IProps> = ({ rule, requiredFields = [] }) => {
  const { t } = useTranslation();

  return (
    <Row gutter={8}>
      <Col span={24}>
        <Form.Item
          name={FORM_ITEMS.name}
          rules={[rule]}
          required={requiredFields.includes(FORM_ITEMS.name)}
          label={t(FORM_ITEMS.name)}
          layout="vertical"
        >
          <Input type="text" placeholder={t(FORM_ITEMS.name)} />
        </Form.Item>
      </Col>
    </Row>
  );
};

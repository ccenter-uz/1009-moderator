import { Row, Col, Input, Form } from "antd";
import { Rule } from "antd/es/form";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  rule: Rule;
  requiredFields?: string[];
}

const FORM_ITEM = "name_uzcyrill";

export const SingleNameCyrill: FC<IProps> = ({ rule, requiredFields = [] }) => {
  const { t } = useTranslation();

  return (
    <Row gutter={8}>
      <Col span={24}>
        <Form.Item
          name={FORM_ITEM}
          rules={[rule]}
          required={requiredFields.includes(FORM_ITEM)}
          label={t(FORM_ITEM)}
          layout="vertical"
        >
          <Input type="text" placeholder={t(FORM_ITEM)} />
        </Form.Item>
      </Col>
    </Row>
  );
};

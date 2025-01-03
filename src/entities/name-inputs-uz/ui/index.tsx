import { Row, Col, Input, Form } from "antd";
import { Rule } from "antd/es/form";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  rule: Rule;
  requiredFields?: string[];
}

const FORM_ITEMS = {
  name: "name_uz",
  old_name: "old_name_uz",
  new_name: "new_name_uz",
};

export const NameInputsUz: FC<IProps> = ({ rule, requiredFields = [] }) => {
  const { t } = useTranslation();
  return (
    <Row gutter={8}>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
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
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item
          name={FORM_ITEMS.old_name}
          rules={[rule]}
          required={requiredFields.includes(FORM_ITEMS.old_name)}
          label={t(FORM_ITEMS.old_name)}
          layout="vertical"
        >
          <Input type="text" placeholder={t(FORM_ITEMS.old_name)} />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item
          name={FORM_ITEMS.new_name}
          rules={[rule]}
          required={requiredFields.includes(FORM_ITEMS.new_name)}
          label={t(FORM_ITEMS.new_name)}
          layout="vertical"
        >
          <Input type="text" placeholder={t(FORM_ITEMS.new_name)} />
        </Form.Item>
      </Col>
    </Row>
  );
};

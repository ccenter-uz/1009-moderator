import { Row, Col, Input, Form, Typography, Tag } from "antd";
import { Rule } from "antd/es/form";
import { cyrillicToLatin } from "lotin-kirill";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  rule: Rule;
  requiredFields?: string[];
}

const FORM_ITEMS = {
  name: "name_uzcyrill",
  old_name: "old_name_cyrill",
  new_name: "new_name_cyrill",
};

const { Paragraph } = Typography;

export const NameInputsCyrill: FC<IProps> = ({ rule, requiredFields = [] }) => {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [oldName, setOldName] = useState("");
  const [newName, setNewName] = useState("");

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
          <Input
            type="text"
            placeholder={t(FORM_ITEMS.name)}
            onChange={(el) => setName(el.target.value)}
          />
        </Form.Item>
        {name && (
          <Paragraph
            style={{ marginTop: "8px" }}
            copyable={{ text: cyrillicToLatin(name) }}
          >
            Ўзб → {`O'zb`}:
            <Tag
              color="green"
              style={{ marginLeft: "4px", padding: "2px 6px" }}
            >
              {cyrillicToLatin(name)}
            </Tag>
          </Paragraph>
        )}
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item
          name={FORM_ITEMS.old_name}
          rules={[rule]}
          required={requiredFields.includes(FORM_ITEMS.old_name)}
          label={t(FORM_ITEMS.old_name)}
          layout="vertical"
        >
          <Input
            type="text"
            placeholder={t(FORM_ITEMS.old_name)}
            onChange={(el) => setOldName(el.target.value)}
          />
        </Form.Item>
        {oldName && (
          <Paragraph
            style={{ marginTop: "8px" }}
            copyable={{ text: cyrillicToLatin(oldName) }}
          >
            Ўзб → {`O'zb`}:
            <Tag
              color="green"
              style={{ marginLeft: "4px", padding: "2px 6px" }}
            >
              {cyrillicToLatin(oldName)}
            </Tag>
          </Paragraph>
        )}
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item
          name={FORM_ITEMS.new_name}
          rules={[rule]}
          required={requiredFields.includes(FORM_ITEMS.new_name)}
          label={t(FORM_ITEMS.new_name)}
          layout="vertical"
        >
          <Input
            type="text"
            placeholder={t(FORM_ITEMS.new_name)}
            onChange={(el) => setNewName(el.target.value)}
          />
        </Form.Item>
        {newName && (
          <Paragraph
            style={{ marginTop: "8px" }}
            copyable={{ text: cyrillicToLatin(newName) }}
          >
            Ўзб → {`O'zb`}:
            <Tag
              color="green"
              style={{ marginLeft: "4px", padding: "2px 6px" }}
            >
              {cyrillicToLatin(newName)}
            </Tag>
          </Paragraph>
        )}
      </Col>
    </Row>
  );
};

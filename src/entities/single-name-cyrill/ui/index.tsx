import { Row, Col, Input, Form, Tag } from "antd";
import { Rule } from "antd/es/form";
import Typography from "antd/es/typography";
import { cyrillicToLatin } from "lotin-kirill";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  rule: Rule;
  requiredFields?: string[];
}

const { Paragraph } = Typography;

const FORM_ITEM = "name_uzcyrill";

export const SingleNameCyrill: FC<IProps> = ({ rule, requiredFields = [] }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

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
          <Input
            type="text"
            placeholder={t(FORM_ITEM)}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form.Item>
        {value && (
          <Paragraph
            style={{ marginTop: "8px" }}
            copyable={{ text: cyrillicToLatin(value) }}
          >
            Ўзб → {`O'zb`}:
            <Tag
              color="green"
              style={{ marginLeft: "4px", padding: "2px 6px" }}
            >
              {cyrillicToLatin(value)}
            </Tag>
          </Paragraph>
        )}
      </Col>
    </Row>
  );
};

import { Row, Col, Input, Form, Typography, Tag } from "antd";
import { Rule } from "antd/es/form";
import { latinToCyrillic } from "lotin-kirill";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  rule: Rule;
  requiredFields?: string[];
  textarea?: boolean;
}

const { Paragraph } = Typography;
const { TextArea } = Input;
const FORM_ITEM = "name_uz";

export const SingleNameUz: FC<IProps> = ({
  rule,
  requiredFields = [],
  textarea = false,
}) => {
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
          {textarea ? (
            <TextArea
              placeholder={t(FORM_ITEM)}
              onChange={(e) => setValue(e.target.value)}
            />
          ) : (
            <Input
              type="text"
              placeholder={t(FORM_ITEM)}
              onChange={(e) => setValue(e.target.value)}
            />
          )}
        </Form.Item>
        {value && (
          <Paragraph
            style={{ marginTop: "8px" }}
            copyable={{ text: latinToCyrillic(value) }}
          >
            {`O'zb`} → Ўзб:{" "}
            <Tag
              color="green"
              style={{ marginLeft: "4px", padding: "2px 6px" }}
            >
              {latinToCyrillic(value)}
            </Tag>
          </Paragraph>
        )}
      </Col>
    </Row>
  );
};

import { Row, Col, Select, Form, Input } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  withIndex?: boolean;
};

export const Address2Inputs: FC<Props> = (props) => {
  const { withIndex } = props;
  const { t } = useTranslation();

  return (
    <Row gutter={8}>
      {withIndex && (
        <Col span={8}>
          <Form.Item name={"index"} label={t("index")} layout="vertical">
            <Input type="text" placeholder={t("index")} />
          </Form.Item>
        </Col>
      )}

      <Col span={8}>
        <Form.Item name={"region"} label={t("region")} layout="vertical">
          <Select placeholder={t("region")} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item name={"city"} label={t("city")} layout="vertical">
          <Select placeholder={t("city")} />
        </Form.Item>
      </Col>
    </Row>
  );
};

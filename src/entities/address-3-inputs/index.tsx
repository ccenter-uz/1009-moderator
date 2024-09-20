import { Row, Col, Input, Select, Form } from "antd";
import { FC } from "react";

export const Address3Inputs: FC = () => {
  return (
    <Row gutter={8}>
      <Col xs={24} sm={12} md={12} lg={12} xl={5}>
        <Form.Item name={"index"} label="Индекс" layout="vertical">
          <Input type="text" placeholder="Индекс" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={6}>
        <Form.Item name={"region"} label="Регион" layout="vertical">
          <Select placeholder="Регион" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={6}>
        <Form.Item name={"city"} label="Город" layout="vertical">
          <Select placeholder="Город" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={6}>
        <Form.Item name={"district"} label="Район" layout="vertical">
          <Select placeholder="Район" />
        </Form.Item>
      </Col>
    </Row>
  );
};

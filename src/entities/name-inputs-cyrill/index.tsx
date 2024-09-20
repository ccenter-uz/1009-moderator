import { Row, Col, Input, Form } from "antd";
import { FC } from "react";

export const NameInputsCyrill: FC = () => {
  return (
    <Row gutter={8}>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item
          name={"name_uzcyrill"}
          label="Название (Кирилл)"
          layout="vertical"
        >
          <Input type="text" placeholder="Название (Кирилл)" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item
          name={"old_name_uzcyrill"}
          label="Старое название (Кирилл)"
          layout="vertical"
        >
          <Input type="text" placeholder="Старое название (Кирилл)" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item
          name={"new_name_uzcyrill"}
          label="Новое название (Кирилл)"
          layout="vertical"
        >
          <Input type="text" placeholder="Новое название (Кирилл)" />
        </Form.Item>
      </Col>
    </Row>
  );
};

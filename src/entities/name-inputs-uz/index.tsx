import { Row, Col, Input, Form } from "antd";
import { FC } from "react";

export const NameInputsUz: FC = () => {
  return (
    <Row gutter={8}>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item
          name={"name_uz"}
          label="Название (Узбекский)"
          layout="vertical"
        >
          <Input type="text" placeholder="Название (Узбекский)" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item
          name={"old_name_uz"}
          label="Старое название (Узбекский)"
          layout="vertical"
        >
          <Input type="text" placeholder="Старое название (Узбекский)" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item
          name={"new_name_uz"}
          label="Новое название (Узбекский)"
          layout="vertical"
        >
          <Input type="text" placeholder="Новое название (Узбекский)" />
        </Form.Item>
      </Col>
    </Row>
  );
};

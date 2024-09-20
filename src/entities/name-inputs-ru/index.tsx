import { Row, Col, Input, Form } from "antd";
import { FC } from "react";

export const NameInputsRu: FC = () => {
  return (
    <Row gutter={8}>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item
          name={"name_ru"}
          label="Название (Русский)"
          layout="vertical"
        >
          <Input type="text" placeholder="Название (Русский)" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item
          name={"old_name_ru"}
          label="Старое название (Русский)"
          layout="vertical"
        >
          <Input type="text" placeholder="Старое название (Русский)" />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item
          name={"new_name_ru"}
          label="Новое название (Русский)"
          layout="vertical"
        >
          <Input type="text" placeholder="Новое название (Русский)" />
        </Form.Item>
      </Col>
    </Row>
  );
};

import { Typography, Row, Col, Input, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { t } from "i18next";
import { FC } from "react";

export const AdditionalAddFirstStepUI: FC = () => {
  return (
    <>
      <Typography.Title level={4}>{t("title")}</Typography.Title>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name={"title-ru"} label={t("ru")}>
            <Input type="text" placeholder={t("title-ru")} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={"title-uz"} label={t("uz")}>
            <Input type="text" placeholder={t("title-uz")} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={"title-cyrill"} label={t("cyrill")}>
            <Input type="text" placeholder={t("title-cyrill")} />
          </Form.Item>
        </Col>
      </Row>
      <Typography.Title level={4}>{t("warning")}</Typography.Title>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name={"warning-ru"} label={t("ru")}>
            <TextArea placeholder={t("title-ru")} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={"warning-uz"} label={t("uz")}>
            <TextArea placeholder={t("title-uz")} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={"warning-cyrill"} label={t("cyrill")}>
            <TextArea placeholder={t("title-cyrill")} />
          </Form.Item>
        </Col>
      </Row>
      <Typography.Title level={4}>{t("mention")}</Typography.Title>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name={"mention-ru"} label={t("ru")}>
            <TextArea placeholder={t("title-ru")} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={"mention-uz"} label={t("uz")}>
            <TextArea placeholder={t("title-uz")} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={"mention-cyrill"} label={t("cyrill")}>
            <TextArea placeholder={t("title-cyrill")} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

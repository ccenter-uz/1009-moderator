import { Col, Form, Input, Row } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { AddTableCategoryTuUI } from "@features/add-table-category-tu";

import { SingleInputWithModalUI } from "@shared/ui/single-input-with-modal";

export const OrgAddFirstStepUI: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Row justify={"space-between"} gutter={24}>
        <Col span={12}>
          <Form.Item name={"abonent"} label={t("abonent")}>
            <Input type="text" placeholder={t("abonent")} allowClear />
          </Form.Item>
          <Form.Item name={"org-name"} label={t("org-name")}>
            <Input type="text" placeholder={t("org-name")} allowClear />
          </Form.Item>
          <Form.Item name={"category"} label={t("category")}>
            <SingleInputWithModalUI
              value={""}
              label={""}
              dataFetcher={() => [{}]}
              columns={[]}
              searchHref={""}
            />
          </Form.Item>
          <Form.Item name={"sub-category"} label={t("sub-category")}>
            <SingleInputWithModalUI
              value={""}
              label={""}
              dataFetcher={() => [{}]}
              columns={[]}
              searchHref={""}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={"main-org"} label={t("main-org")}>
            <SingleInputWithModalUI
              value={""}
              label={""}
              dataFetcher={() => [{}]}
              columns={[]}
              searchHref={""}
            />
          </Form.Item>
          <Form.Item name={"secret"} label={t("Секрет")}>
            <Input type="text" placeholder={t("Секрет")} allowClear />
          </Form.Item>
        </Col>
      </Row>
      <AddTableCategoryTuUI />
    </>
  );
};

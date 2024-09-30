import { Row, Col, Input, Form, Select } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { AddTableOrientirUI } from "@features/add-table-orientir";

import { SingleInputWithModalUI } from "@shared/ui/single-input-with-modal";

export const OrgAddSecondStepUI: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Row justify={"space-between"} gutter={24}>
        <Col span={8}>
          <Form.Item name={"region"} label={t("region")} required>
            <Select
              options={[]}
              allowClear
              showSearch
              placeholder={t("region")}
            />
          </Form.Item>
          <Form.Item name={"city"} label={t("city")} required>
            <Select
              options={[]}
              allowClear
              showSearch
              placeholder={t("city")}
            />
          </Form.Item>
          <Form.Item name={"village"} label={t("village")}>
            <SingleInputWithModalUI
              value={""}
              label={""}
              dataFetcher={() => [{}]}
              columns={[]}
              searchHref={""}
            />
          </Form.Item>
          <Form.Item name={"district"} label={t("district")}>
            <SingleInputWithModalUI
              value={""}
              label={""}
              dataFetcher={() => [{}]}
              columns={[]}
              searchHref={""}
            />
          </Form.Item>
          <Form.Item name={"manage"} label={t("manage")}>
            <SingleInputWithModalUI
              value={""}
              label={""}
              dataFetcher={() => [{}]}
              columns={[]}
              searchHref={""}
            />
          </Form.Item>
          <Form.Item name={"residential-area"} label={t("residential-area")}>
            <SingleInputWithModalUI
              value={""}
              label={""}
              dataFetcher={() => [{}]}
              columns={[]}
              searchHref={""}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={"area"} label={t("area")}>
            <SingleInputWithModalUI
              value={""}
              label={""}
              dataFetcher={() => [{}]}
              columns={[]}
              searchHref={""}
            />
          </Form.Item>
          <Form.Item name={"kvartal"} label={t("kvartal")}>
            <Input type="text" placeholder={t("kvartal")} allowClear />
          </Form.Item>
          <Form.Item name={"street"} label={t("street")}>
            <Input type="text" placeholder={t("street")} allowClear />
          </Form.Item>
          <Form.Item name={"lane"} label={t("lane")}>
            <SingleInputWithModalUI
              value={""}
              label={""}
              dataFetcher={() => [{}]}
              columns={[]}
              searchHref={""}
            />
          </Form.Item>
          <Form.Item name={"passage"} label={t("passage")}>
            <SingleInputWithModalUI
              value={""}
              label={""}
              dataFetcher={() => [{}]}
              columns={[]}
              searchHref={""}
            />
          </Form.Item>
          <Form.Item name={"impasse"} label={t("impasse")}>
            <SingleInputWithModalUI
              value={""}
              label={""}
              dataFetcher={() => [{}]}
              columns={[]}
              searchHref={""}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={"address"} label={t("address")}>
            <Input type="text" placeholder={t("address")} allowClear />
          </Form.Item>
          <Form.Item name={"home"} label={t("home")}>
            <Input type="text" placeholder={t("home")} allowClear />
          </Form.Item>
          <Form.Item name={"apartment"} label={t("apartment")}>
            <Input type="text" placeholder={t("apartment")} allowClear />
          </Form.Item>
        </Col>
      </Row>
      <AddTableOrientirUI />
    </>
  );
};

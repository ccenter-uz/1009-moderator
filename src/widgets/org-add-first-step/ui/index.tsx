import { Col, Form, Input, Row, Select } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { TableCategoryServices } from "@features/table-category-services";

import { RootState } from "@shared/types";

import { setData } from "../model/Slicer";

export const OrgAddFirstStepUI: FC = () => {
  const { t } = useTranslation();
  const { data } = useSelector(
    ({ useAddOrgFirstStepSlice }: RootState) => useAddOrgFirstStepSlice,
  );

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
            <Select
              options={[]}
              placeholder={t("category")}
              allowClear
              showSearch
            />
          </Form.Item>
          <Form.Item name={"sub-category"} label={t("sub-category")}>
            <Select
              options={[]}
              placeholder={t("sub-category")}
              allowClear
              showSearch
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={"main-org"} label={t("main-org")}>
            <Select
              placeholder={t("main-org")}
              options={[]}
              allowClear
              showSearch
            />
          </Form.Item>
          <Form.Item name={"secret"} label={t("Секрет")}>
            <Input type="text" placeholder={t("Секрет")} allowClear />
          </Form.Item>
          <Form.Item name={"segment"} label={t("segment")}>
            <Select
              placeholder={t("segment")}
              options={[]}
              allowClear
              showSearch
            />
          </Form.Item>
          <Form.Item name={"manager"} label={t("manager")}>
            <Input type="text" placeholder={t("manager")} allowClear />
          </Form.Item>
        </Col>
      </Row>
      <TableCategoryServices data={data} setData={setData} />
    </>
  );
};

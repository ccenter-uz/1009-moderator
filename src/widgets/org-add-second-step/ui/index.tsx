import { Row, Col, Input, Form, Select } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { TableOrientirUI } from "@features/table-orientir";

import { RootState } from "@shared/types";

import { setData } from "../model/Slicer";

export const OrgAddSecondStepUI: FC = () => {
  const { t } = useTranslation();
  const { data } = useSelector(
    ({ useAddOrgSecondStepSlice }: RootState) => useAddOrgSecondStepSlice,
  );

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
            <Select
              options={[]}
              allowClear
              showSearch
              placeholder={t("village")}
            />
          </Form.Item>
          <Form.Item name={"district"} label={t("district")}>
            <Select
              options={[]}
              allowClear
              showSearch
              placeholder={t("district")}
            />
          </Form.Item>
          <Form.Item name={"avenue"} label={t("avenue")}>
            <Select
              options={[]}
              allowClear
              showSearch
              placeholder={t("avenue")}
            />
          </Form.Item>
          <Form.Item name={"residential-area"} label={t("residential-area")}>
            <Select
              options={[]}
              allowClear
              showSearch
              placeholder={t("residential-area")}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={"area"} label={t("area")}>
            <Select
              options={[]}
              allowClear
              showSearch
              placeholder={t("area")}
            />
          </Form.Item>
          <Form.Item name={"kvartal"} label={t("kvartal")}>
            <Input type="text" placeholder={t("kvartal")} allowClear />
          </Form.Item>
          <Form.Item name={"street"} label={t("street")}>
            <Input type="text" placeholder={t("street")} allowClear />
          </Form.Item>
          <Form.Item name={"lane"} label={t("lane")}>
            <Select
              options={[]}
              allowClear
              showSearch
              placeholder={t("lane")}
            />
          </Form.Item>
          <Form.Item name={"passage"} label={t("passage")}>
            <Select
              options={[]}
              allowClear
              showSearch
              placeholder={t("passage")}
            />
          </Form.Item>
          <Form.Item name={"impasse"} label={t("impasse")}>
            <Select
              options={[]}
              allowClear
              showSearch
              placeholder={t("impasse")}
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
      <TableOrientirUI data={data} setData={setData} />
    </>
  );
};

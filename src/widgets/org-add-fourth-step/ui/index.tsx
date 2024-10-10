import { Form, Col, Row, Checkbox, Input, Typography, Flex } from "antd";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { UploadUI } from "@features/upload";

import { RootState } from "@shared/types";

import { setData } from "../model/Slicer";

export const OrgAddFourthStepUI: FC = () => {
  const { t } = useTranslation();
  const { data: fileListData } = useSelector(
    ({ useAddOrgFourthStepSlice }: RootState) => useAddOrgFourthStepSlice,
  );
  const [allCheck, setAllCheck] = useState<boolean>(false);

  return (
    <>
      <Row>
        <Col span={12}>
          <Flex align="center" gap={16}>
            <Form.Item
              name="all_type"
              label={t("all_type")}
              valuePropName="checked"
            >
              <Checkbox onChange={(e) => setAllCheck(e.target.checked)} />
            </Form.Item>
            <Form.Item
              name={"terminal"}
              label={t("terminal")}
              valuePropName="checked"
            >
              <Checkbox disabled={allCheck} />
            </Form.Item>
            <Form.Item name={"cash"} label={t("cash")} valuePropName="checked">
              <Checkbox disabled={allCheck} />
            </Form.Item>
            <Form.Item
              name={"transfer"}
              label={t("transfer")}
              valuePropName="checked"
            >
              <Checkbox disabled={allCheck} />
            </Form.Item>
          </Flex>
        </Col>
        <Col span={12}>
          <Form.Item name={"description"} label={t("description")}>
            <Input.TextArea />
          </Form.Item>
        </Col>
      </Row>
      <Typography.Title aria-level={4} level={4} style={{ margin: 0 }}>
        {t("images")}
      </Typography.Title>
      <div style={{ marginTop: 10 }}>
        <UploadUI setData={setData} data={fileListData} />
      </div>
    </>
  );
};

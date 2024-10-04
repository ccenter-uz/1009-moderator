import { Form, Col, Row, Checkbox, Input, Typography } from "antd";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { UploadUI } from "@features/upload";

import { RootState } from "@shared/types";

import { setData } from "../model/Slicer";

export const OrgEditFourthStepUI: FC = () => {
  const { t } = useTranslation();
  const { data: fileListData } = useSelector(
    ({ useEditOrgFourthStepSlice }: RootState) => useEditOrgFourthStepSlice,
  );
  const [allCheck, setAllCheck] = useState<boolean>(false);

  return (
    <>
      <Row>
        <Col span={12}>
          <Form.Item
            name="payment_type"
            label={t("payment_type")}
            valuePropName="checked"
          >
            <Checkbox.Group>
              <Checkbox
                value="all_type"
                onChange={(e) => setAllCheck(e.target.checked)}
              >
                {t("all_type")}
              </Checkbox>
              <Checkbox disabled={allCheck} value="terminal">
                {t("terminal")}
              </Checkbox>
              <Checkbox disabled={allCheck} value="cash">
                {t("cash")}
              </Checkbox>
              <Checkbox disabled={allCheck} value="transfer">
                {t("transfer")}
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>
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

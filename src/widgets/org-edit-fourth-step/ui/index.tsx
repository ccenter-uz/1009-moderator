import { Form, Col, Row, Checkbox, Input, Typography, Flex } from "antd";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { UploadUI } from "@features/upload";

import { RootState } from "@shared/types";

import { setData, setPictures } from "../model/Slicer";

export const OrgEditFourthStepUI: FC = () => {
  const { t } = useTranslation();
  const { data: fileListData } = useSelector(
    ({ useEditOrgFourthStepSlice }: RootState) => useEditOrgFourthStepSlice,
  );
  const [allCheck, setAllCheck] = useState<boolean>(false);

  return (
    <>
      <Row gutter={24}>
        <Col span={12}>
          <Typography.Title
            aria-level={4}
            level={5}
            style={{ margin: 0, color: "grey" }}
          >
            {t("payment_type")}
          </Typography.Title>
          <Flex align="center" gap={14}>
            <Form.Item
              name="allType"
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
          <Row gutter={16}>
            <Typography.Title
              aria-level={4}
              level={5}
              style={{ margin: 5, color: "grey" }}
            >
              {t("worktime")}
            </Typography.Title>
            <Col span={24}>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    name={"worktimeFrom"}
                    label={t("from")}
                    rules={[
                      {
                        required: true,
                        message: t("required-field"),
                      },
                    ]}
                  >
                    <Input type="time" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={"worktimeTo"}
                    label={t("to")}
                    rules={[
                      {
                        required: true,
                        message: t("required-field"),
                      },
                    ]}
                  >
                    <Input type="time" />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Typography.Title
              aria-level={4}
              level={5}
              style={{ margin: 5, color: "grey" }}
            >
              {t("lunch")}
            </Typography.Title>
            <Col span={24}>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    name={"lunchFrom"}
                    label={t("from")}
                    rules={[
                      {
                        required: true,
                        message: t("required-field"),
                      },
                    ]}
                  >
                    <Input type="time" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={"lunchTo"}
                    label={t("to")}
                    rules={[
                      {
                        required: true,
                        message: t("required-field"),
                      },
                    ]}
                  >
                    <Input type="time" />
                  </Form.Item>
                </Col>
              </Row>
              <Typography.Title
                aria-level={4}
                level={5}
                style={{ margin: 0, color: "grey" }}
              >
                {t("dayoffs")}
              </Typography.Title>
              <Flex align="center" gap={14}>
                <Form.Item
                  name={"monday"}
                  label={t("monday")}
                  valuePropName="checked"
                >
                  <Checkbox />
                </Form.Item>
                <Form.Item
                  name={"tuesday"}
                  label={t("tuesday")}
                  valuePropName="checked"
                >
                  <Checkbox />
                </Form.Item>
                <Form.Item
                  name={"wednesday"}
                  label={t("wednesday")}
                  valuePropName="checked"
                >
                  <Checkbox />
                </Form.Item>
                <Form.Item
                  name={"thursday"}
                  label={t("thursday")}
                  valuePropName="checked"
                >
                  <Checkbox />
                </Form.Item>
                <Form.Item
                  name={"friday"}
                  label={t("friday")}
                  valuePropName="checked"
                >
                  <Checkbox />
                </Form.Item>
                <Form.Item
                  name={"saturday"}
                  label={t("saturday")}
                  valuePropName="checked"
                >
                  <Checkbox />
                </Form.Item>
                <Form.Item
                  name={"sunday"}
                  label={t("sunday")}
                  valuePropName="checked"
                >
                  <Checkbox />
                </Form.Item>
              </Flex>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Form.Item
            name={"description"}
            label={t("description")}
            rules={[
              {
                required: true,
                message: t("required-field"),
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item name={"bus"} label={`${t("bus")} №`}>
            <Input placeholder={t("bus")} />
          </Form.Item>
          <Form.Item name={"microBus"} label={`${t("micro-bus")} №`}>
            <Input placeholder={t("micro-bus")} />
          </Form.Item>
          <Form.Item name={"metroStation"} label={t("metro-station")}>
            <Input placeholder={t("metro-station")} />
          </Form.Item>
        </Col>
      </Row>
      <Typography.Title aria-level={4} level={4} style={{ margin: 0 }}>
        {t("images")}
      </Typography.Title>
      <div style={{ marginTop: 10 }}>
        <UploadUI
          setData={setData}
          data={fileListData}
          setPictures={setPictures}
        />
      </div>
    </>
  );
};

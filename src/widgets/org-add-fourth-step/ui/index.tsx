import { Form, Col, Row, Checkbox, Input, Typography, Flex } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { UploadUI } from "@features/upload";

import { RootState } from "@shared/types";
import { ParagraphBold } from "@shared/ui/paragraph-bold";

import { setData } from "../model/Slicer";

export const OrgAddFourthStepUI: FC = () => {
  const { t } = useTranslation();
  const {
    data: fileListData,
    allType,
    allDay,
    noDayoffs,
    withoutLunch,
  } = useSelector(
    ({ useAddOrgFourthStepSlice }: RootState) => useAddOrgFourthStepSlice,
  );

  return (
    <>
      <Row>
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
              name={"terminal"}
              label={t("terminal")}
              valuePropName="checked"
            >
              <Checkbox disabled={allType} />
            </Form.Item>
            <Form.Item name={"cash"} label={t("cash")} valuePropName="checked">
              <Checkbox disabled={allType} />
            </Form.Item>
            <Form.Item
              name={"transfer"}
              label={t("transfer")}
              valuePropName="checked"
            >
              <Checkbox disabled={allType} />
            </Form.Item>
            <Form.Item
              name="allType"
              label={<ParagraphBold>{t("all_type")}</ParagraphBold>}
              valuePropName="checked"
            >
              <Checkbox />
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
                        required: !allDay,
                        message: t("required-field"),
                      },
                    ]}
                  >
                    <Input type="time" disabled={allDay} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={"worktimeTo"}
                    label={t("to")}
                    rules={[
                      {
                        required: !allDay,
                        message: t("required-field"),
                      },
                    ]}
                  >
                    <Input type="time" disabled={allDay} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={"allDay"}
                    label={<ParagraphBold>{t("allDay")}</ParagraphBold>}
                    valuePropName="checked"
                  >
                    <Checkbox />
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
                        required: !withoutLunch,
                        message: t("required-field"),
                      },
                    ]}
                  >
                    <Input type="time" disabled={withoutLunch} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={"lunchTo"}
                    label={t("to")}
                    rules={[
                      {
                        required: !withoutLunch,
                        message: t("required-field"),
                      },
                    ]}
                  >
                    <Input type="time" disabled={withoutLunch} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={"withoutLunch"}
                    label={<ParagraphBold>{t("withoutLunch")}</ParagraphBold>}
                    valuePropName="checked"
                  >
                    <Checkbox />
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
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name={"noDayoffs"}
                    label={<ParagraphBold>{t("noDayoffs")}</ParagraphBold>}
                    valuePropName="checked"
                    style={{ marginBottom: 0 }}
                  >
                    <Checkbox />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    name={"monday"}
                    label={t("monday")}
                    valuePropName="checked"
                  >
                    <Checkbox disabled={noDayoffs} />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    name={"tuesday"}
                    label={t("tuesday")}
                    valuePropName="checked"
                  >
                    <Checkbox disabled={noDayoffs} />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    name={"wednesday"}
                    label={t("wednesday")}
                    valuePropName="checked"
                  >
                    <Checkbox disabled={noDayoffs} />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    name={"thursday"}
                    label={t("thursday")}
                    valuePropName="checked"
                  >
                    <Checkbox disabled={noDayoffs} />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    name={"friday"}
                    label={t("friday")}
                    valuePropName="checked"
                  >
                    <Checkbox disabled={noDayoffs} />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    name={"saturday"}
                    label={t("saturday")}
                    valuePropName="checked"
                  >
                    <Checkbox disabled={noDayoffs} />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item
                    name={"sunday"}
                    label={t("sunday")}
                    valuePropName="checked"
                  >
                    <Checkbox disabled={noDayoffs} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Form.Item
            name={"description"}
            label={<ParagraphBold>{t("description")}</ParagraphBold>}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name={"bus"}
            label={<ParagraphBold>{`${t("bus")} №`}</ParagraphBold>}
          >
            <Input placeholder={t("bus")} />
          </Form.Item>
          <Form.Item
            name={"microBus"}
            label={<ParagraphBold>{`${t("micro-bus")} №`}</ParagraphBold>}
          >
            <Input placeholder={t("micro-bus")} />
          </Form.Item>
          <Form.Item
            name={"metroStation"}
            label={<ParagraphBold>{t("metro-station")}</ParagraphBold>}
          >
            <Input placeholder={t("metro-station")} />
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

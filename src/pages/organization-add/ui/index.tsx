import { Button, Divider, Flex, Form, message, Steps } from "antd";
import i18next from "i18next";
import { CSSProperties, FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { OrgAddFirstStepUI } from "@widgets/org-add-first-step";
import { OrgAddFourthStepUI } from "@widgets/org-add-fourth-step";
import { OrgAddSecondStepUI } from "@widgets/org-add-second-step";
import { OrgAddThirdStepUI } from "@widgets/org-add-third-step";

const items = [
  {
    title: i18next.t("personal"),
    description: i18next.t("personal_description"),
    content: <OrgAddFirstStepUI />,
  },
  {
    title: i18next.t("address"),
    description: i18next.t("address_description"),
    content: <OrgAddSecondStepUI />,
  },
  {
    title: i18next.t("contacts"),
    description: i18next.t("contacts_description"),
    content: <OrgAddThirdStepUI />,
  },
  {
    title: i18next.t("additional"),
    description: i18next.t("additional_description"),
    content: <OrgAddFourthStepUI />,
  },
];
const contentStyle: CSSProperties = {
  margin: "16px",
};

export const OrgAddPage: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onSubmit = (values: unknown) => {
    console.log(values, "create-org-form");
  };

  return (
    <>
      <Steps current={current} items={items} />
      <Divider />
      <div className="step-content" style={contentStyle}>
        <Form onFinish={onSubmit} id="create-org-form" form={form}>
          {items[current].content}
        </Form>
      </div>
      <Divider />
      <Flex align="center" justify="end" gap={8} style={{ marginTop: 24 }}>
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            {t("previous")}
          </Button>
        )}
        {current < items.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            {t("next")}
          </Button>
        )}
        {current === items.length - 1 && (
          <Button type="primary" htmlType="submit" form="create-org-form">
            {t("save")}
          </Button>
        )}
      </Flex>
    </>
  );
};

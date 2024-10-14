import { Button, Divider, Flex, Form, Steps } from "antd";
import i18next from "i18next";
import { CSSProperties, FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { AdditionalAddFirstStepUI } from "@widgets/additional-add-first-step";
import { AdditionalAddSecondStepUI } from "@widgets/additional-add-second-step";
import { AdditionalAddThirdStepUI } from "@widgets/additional-add-third-step";

const steps = [
  {
    title: i18next.t("main"),
    description: i18next.t("main-data"),
    content: <AdditionalAddFirstStepUI />,
  },
  {
    title: i18next.t("table"),
    description: i18next.t("table-data"),
    content: <AdditionalAddSecondStepUI />,
  },
  {
    title: i18next.t("description"),
    description: i18next.t("description-data"),
    content: <AdditionalAddThirdStepUI />,
  },
];
const contentStyle: CSSProperties = {
  margin: "16px",
};

export const AdditionalAdd: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  const onSubmit = (values: unknown) => {
    console.log(values, "values");
  };

  return (
    <>
      <Steps current={current} items={steps} />
      <div className="step-content" style={contentStyle}>
        <Form
          onFinish={onSubmit}
          form={form}
          id="additional-add"
          layout="vertical"
        >
          {steps[current].content}
        </Form>
      </div>
      <Divider />
      <Flex align="center" justify="end" gap={8} style={{ marginTop: 24 }}>
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            {t("previous")}
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            {t("next")}
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" htmlType="submit" form="additional-add">
            {t("save")}
          </Button>
        )}
      </Flex>
    </>
  );
};

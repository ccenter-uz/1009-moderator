import { Button, Divider, Flex, Form, Steps } from "antd";
import i18next from "i18next";
import { CSSProperties, FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { OrgAddFirstStepUI } from "@widgets/org-add-first-step";
import { OrgAddFourthStepUI } from "@widgets/org-add-fourth-step";
import { OrgAddSecondStepUI } from "@widgets/org-add-second-step";
import { OrgAddThirdStepUI } from "@widgets/org-add-third-step";

import { RootState } from "@shared/types";

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
  const { data: categoryTu } = useSelector(
    ({ useAddTableCategoryTuSlice }: RootState) => useAddTableCategoryTuSlice,
  );
  const { data: orientirData } = useSelector(
    ({ useAddTableOrientirSlice }: RootState) => useAddTableOrientirSlice,
  );
  const { data: phoneData } = useSelector(
    ({ useAddOrgThirdStepSlice }: RootState) => useAddOrgThirdStepSlice,
  );
  const { data: images } = useSelector(
    ({ useAddOrgFourthStepSlice }: RootState) => useAddOrgFourthStepSlice,
  );
  const [current, setCurrent] = useState(
    Number(localStorage.getItem("currentStep")) || 0,
  );

  const next = () => {
    setCurrent(current + 1);
    if (current === 0) {
      const firstStepData = {
        abonent: form.getFieldValue("abonent"),
        "org-name": form.getFieldValue("org-name"),
        category: form.getFieldValue("category"),
        "sub-category": form.getFieldValue("sub-category"),
        "main-org": form.getFieldValue("main-org"),
        secret: form.getFieldValue("secret"),
        "category-tu": categoryTu,
      };
      localStorage.setItem("firstStepData", JSON.stringify(firstStepData));
    } else if (current === 1) {
      const secondStepData = {
        region: form.getFieldValue("region"),
        city: form.getFieldValue("city"),
        village: form.getFieldValue("village"),
        district: form.getFieldValue("district"),
        manage: form.getFieldValue("manage"),
        "residential-area": form.getFieldValue("residential-area"),
        area: form.getFieldValue("area"),
        kvartal: form.getFieldValue("kvartal"),
        street: form.getFieldValue("street"),
        lane: form.getFieldValue("lane"),
        passage: form.getFieldValue("passage"),
        impasse: form.getFieldValue("impasse"),
        address: form.getFieldValue("address"),
        home: form.getFieldValue("home"),
        apartment: form.getFieldValue("apartment"),
        orientir: orientirData,
      };
      localStorage.setItem("secondStepData", JSON.stringify(secondStepData));
    } else if (current === 2) {
      const thirdStepData = {
        phone: phoneData,
      };
      localStorage.setItem("thirdStepData", JSON.stringify(thirdStepData));
    } else if (current === 3) {
      const fourthStepData = {
        payment_type: form.getFieldValue("payment_type"),
        description: form.getFieldValue("description"),
        images,
      };
      localStorage.setItem("fourthStepData", JSON.stringify(fourthStepData));
    }

    localStorage.setItem("currentStep", JSON.stringify(current + 1));
  };

  const prev = () => {
    setCurrent(current - 1);
    localStorage.setItem("currentStep", JSON.stringify(current - 1));
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

import { Button, Divider, Flex, Form, Steps } from "antd";
import i18next from "i18next";
import { CSSProperties, FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { setCategoryData } from "@widgets/org-add-first-step";
import { setOrientirData } from "@widgets/org-add-second-step";
import { setPhoneData } from "@widgets/org-add-third-step";
import { OrgEditFirstStepUI } from "@widgets/org-edit-first-step";
import { OrgEditFourthStepUI } from "@widgets/org-edit-fourth-step";
import { OrgEditSecondStepUI } from "@widgets/org-edit-second-step";
import { OrgEditThirdStepUI } from "@widgets/org-edit-third-step";

import { SEND_BODY, STEPS_DATA, STEPS_ENUM } from "@shared/lib/helpers";
import { RootState } from "@shared/types";

const items = [
  {
    title: i18next.t("personal"),
    description: i18next.t("personal_description"),
    content: <OrgEditFirstStepUI />,
  },
  {
    title: i18next.t("address"),
    description: i18next.t("address_description"),
    content: <OrgEditSecondStepUI />,
  },
  {
    title: i18next.t("contacts"),
    description: i18next.t("contacts_description"),
    content: <OrgEditThirdStepUI />,
  },
  {
    title: i18next.t("additional"),
    description: i18next.t("additional_description"),
    content: <OrgEditFourthStepUI />,
  },
];
const contentStyle: CSSProperties = {
  margin: "16px",
};

export const OrgEditPage: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { data: categoryTu } = useSelector(
    ({ useAddOrgFirstStepSlice }: RootState) => useAddOrgFirstStepSlice,
  );
  const { data: orientirData } = useSelector(
    ({ useAddOrgSecondStepSlice }: RootState) => useAddOrgSecondStepSlice,
  );
  const { data: phoneData } = useSelector(
    ({ useAddOrgThirdStepSlice }: RootState) => useAddOrgThirdStepSlice,
  );
  const { data: images } = useSelector(
    ({ useAddOrgFourthStepSlice }: RootState) => useAddOrgFourthStepSlice,
  );
  const [current, setCurrent] = useState(
    Number(localStorage.getItem("currentStepEdit")) || 0,
  );

  const next = () => {
    setCurrent(current + 1);
    localStorage.setItem("currentStepEdit", JSON.stringify(current + 1));
    // STORE STEPS DATA
    if (current === STEPS_ENUM.firstStep) {
      const firstStepData = {
        ...form.getFieldsValue(STEPS_DATA.FIRST_FORMDATA),
        "category-tu": categoryTu,
      };
      localStorage.setItem("firstStepDataEdit", JSON.stringify(firstStepData));
    } else if (current === STEPS_ENUM.secondStep) {
      const secondStepData = {
        ...form.getFieldsValue(STEPS_DATA.SECOND_FORMDATA),
        orientir: orientirData,
      };
      localStorage.setItem(
        "secondStepDataEdit",
        JSON.stringify(secondStepData),
      );
    } else if (current === STEPS_ENUM.thirdStep) {
      const thirdStepData = {
        phone: phoneData,
      };
      localStorage.setItem("thirdStepDataEdit", JSON.stringify(thirdStepData));
    }
  };

  const prev = () => {
    setCurrent(current - 1);
    localStorage.setItem("currentStepEdit", JSON.stringify(current - 1));
  };

  const onSubmit = async () => {
    const body = {
      ...form.getFieldsValue(SEND_BODY),
      payment_types: {
        cash: form.getFieldValue("cash"),
        terminal: form.getFieldValue("terminal"),
        trasnfer: form.getFieldValue("trasnfer"),
        all_type: form.getFieldValue("all_type"),
      },
      "category-tu": categoryTu,
      orientir: orientirData,
      phone: phoneData,
      images,
    };

    console.log(body, "body-edit");
  };

  useEffect(() => {
    // SET-STORED-DATA-FROM-LOCAL-STORAGE
    const firstStepData = localStorage.getItem("firstStepDataEdit");
    const secondStepData = localStorage.getItem("secondStepDataEdit");
    const thirdStepData = localStorage.getItem("thirdStepDataEdit");
    if (firstStepData) {
      form.setFieldsValue(JSON.parse(firstStepData)),
        dispatch(setCategoryData(JSON.parse(firstStepData)["category-tu"]));
    }

    if (secondStepData) {
      form.setFieldsValue(JSON.parse(secondStepData)),
        dispatch(setOrientirData(JSON.parse(secondStepData)?.orientir));
    }
    if (thirdStepData) {
      form.setFieldsValue(JSON.parse(thirdStepData)),
        dispatch(setPhoneData(JSON.parse(thirdStepData)?.phone));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Steps current={current} items={items} />
      <Divider />
      <div className="step-content" style={contentStyle}>
        <Form onFinish={onSubmit} id="edit-org-form" form={form}>
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
          <Button type="primary" htmlType="submit" form="edit-org-form">
            {t("save")}
          </Button>
        )}
      </Flex>
    </>
  );
};

import { Button, Divider, Flex, Form, Steps } from "antd";
import i18next from "i18next";
import { CSSProperties, FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import {
  OrgAddFirstStepUI,
  setCategoryData,
} from "@widgets/org-add-first-step";
import { OrgAddFourthStepUI } from "@widgets/org-add-fourth-step";
import {
  OrgAddSecondStepUI,
  setOrientirData,
} from "@widgets/org-add-second-step";
import { OrgAddThirdStepUI, setPhoneData } from "@widgets/org-add-third-step";

import { SEND_BODY, STEPS_DATA, STEPS_ENUM } from "@shared/lib/helpers";
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
    Number(localStorage.getItem("currentStep")) || 0,
  );

  const next = () => {
    setCurrent(current + 1);
    localStorage.setItem("currentStep", JSON.stringify(current + 1));
    // STORE STEPS DATA
    if (current === STEPS_ENUM.firstStep) {
      const firstStepData = {
        ...form.getFieldsValue(STEPS_DATA.FIRST_FORMDATA),
        "category-tu": categoryTu,
      };
      localStorage.setItem("firstStepData", JSON.stringify(firstStepData));
    } else if (current === STEPS_ENUM.secondStep) {
      const secondStepData = {
        ...form.getFieldsValue(STEPS_DATA.SECOND_FORMDATA),
        orientir: orientirData,
      };
      localStorage.setItem("secondStepData", JSON.stringify(secondStepData));
    } else if (current === STEPS_ENUM.thirdStep) {
      const thirdStepData = {
        phone: phoneData,
      };
      localStorage.setItem("thirdStepData", JSON.stringify(thirdStepData));
    }
  };

  const prev = () => {
    setCurrent(current - 1);
    localStorage.setItem("currentStep", JSON.stringify(current - 1));
  };

  const onSubmit = async () => {
    const body = {
      ...form.getFieldsValue(SEND_BODY),
      payment_type: {
        cash: form.getFieldValue("all_type")
          ? true
          : form.getFieldValue("cash"),
        terminal: form.getFieldValue("all_type")
          ? true
          : form.getFieldValue("terminal"),
        trasnfer: form.getFieldValue("all_type")
          ? true
          : form.getFieldValue("trasnfer"),
        all_type: form.getFieldValue("all_type"),
      },
      worktime: {
        dayoffs: form.getFieldValue("dayoffs"),
        "worktime-from": form.getFieldValue("worktime-from"),
        "worktime-to": form.getFieldValue("worktime-to"),
        "lunch-from": form.getFieldValue("lunch-from"),
        "lunch-to": form.getFieldValue("lunch-to"),
      },
      transport: {
        bus: form.getFieldValue("bus"),
        "micro-bus": form.getFieldValue("micro-bus"),
        "metro-station": form.getFieldValue("metro-station"),
      },
      "category-tu": categoryTu,
      orientir: orientirData,
      phone: phoneData,
      images,
    };

    console.log(body, "body");
  };

  useEffect(() => {
    // SET-STORED-DATA-FROM-LOCAL-STORAGE
    const firstStepData = localStorage.getItem("firstStepData");
    const secondStepData = localStorage.getItem("secondStepData");
    const thirdStepData = localStorage.getItem("thirdStepData");
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

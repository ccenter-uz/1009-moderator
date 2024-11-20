import { Button, Divider, Flex, Form, Steps } from "antd";
import i18next from "i18next";
import { CSSProperties, FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useBlocker, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

import { AdditionalAddFirstStepUI } from "@widgets/additional-add-first-step";
import { AdditionalAddSecondStepUI } from "@widgets/additional-add-second-step";
import { AdditionalAddThirdStepUI } from "@widgets/additional-add-third-step";

import {
  ADDITIONAL_ADD_STEPS,
  additionalSubmitData,
  clearAllAdditionalAddStorage,
  getLocalStorage,
  setLocalStorage,
} from "@shared/lib/helpers";

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
  const location = useLocation();
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(
    +getLocalStorage(ADDITIONAL_ADD_STEPS.ADDITIONAL_ADD_CURRENT_STEP) || 0,
  );

  const next = () => {
    if (current === 0) {
      setLocalStorage(
        ADDITIONAL_ADD_STEPS.ADDITIONAL_ADD_FIRST_STEP,
        form.getFieldsValue(),
      );
    }
    setCurrent(current + 1);
  };
  const prev = () => setCurrent(current - 1);

  const onSubmit = () => {
    const data = {
      ...additionalSubmitData(
        ADDITIONAL_ADD_STEPS.ADDITIONAL_ADD_FIRST_STEP,
        ADDITIONAL_ADD_STEPS.ADDITIONAL_ADD_SECOND_STEP,
        ADDITIONAL_ADD_STEPS.ADDITIONAL_ADD_THIRD_STEP,
      ),
      category_id: location.state?.category || null,
    };
    console.log(data, "data");
  };

  useEffect(() => {
    setLocalStorage(ADDITIONAL_ADD_STEPS.ADDITIONAL_ADD_CURRENT_STEP, current);
    if (current === 0) {
      form.setFieldsValue(
        getLocalStorage(ADDITIONAL_ADD_STEPS.ADDITIONAL_ADD_FIRST_STEP),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (
      getLocalStorage(ADDITIONAL_ADD_STEPS.ADDITIONAL_ADD_FIRST_STEP) &&
      currentLocation.pathname !== nextLocation.pathname
    ) {
      return true;
    } else {
      return false;
    }
  });

  useEffect(() => {
    if (blocker.state === "blocked") {
      Swal.fire({
        title: t("are-you-sure"),
        text: t("all-data-will-be-restored"),
        showCancelButton: true,
        cancelButtonText: t("no-stay"),
        confirmButtonText: t("okay-restore"),
      }).then((res) => {
        if (res.isConfirmed) {
          blocker.proceed();
          clearAllAdditionalAddStorage();
        } else {
          blocker.reset();
        }
      });
    }
  }, [blocker, t]);

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

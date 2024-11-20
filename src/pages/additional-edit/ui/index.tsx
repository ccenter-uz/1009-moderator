import { Button, Divider, Flex, Form, Steps } from "antd";
import i18next from "i18next";
import { CSSProperties, FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useBlocker, useLocation, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { AdditionalEditFirstStepUI } from "@widgets/additional-edit-first-step";
import { AdditionalEditSecondStepUI } from "@widgets/additional-edit-second-step";
import { AdditionalEditThirdStepUI } from "@widgets/additional-edit-third-step";

import {
  ADDITIONAL_EDIT_STEPS,
  additionalSubmitData,
  clearAllAdditionalEditStorage,
  getLocalStorage,
  setLocalStorage,
} from "@shared/lib/helpers";

const steps = [
  {
    title: i18next.t("main"),
    description: i18next.t("main-data"),
    content: <AdditionalEditFirstStepUI />,
  },
  {
    title: i18next.t("table"),
    description: i18next.t("table-data"),
    content: <AdditionalEditSecondStepUI />,
  },
  {
    title: i18next.t("description"),
    description: i18next.t("description-data"),
    content: <AdditionalEditThirdStepUI />,
  },
];
const contentStyle: CSSProperties = {
  margin: "16px",
};

export const AdditionalEdit: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(
    +getLocalStorage(ADDITIONAL_EDIT_STEPS.ADDITIONAL_EDIT_CURRENT_STEP) || 0,
  );

  const next = () => {
    if (current === 0) {
      setLocalStorage(
        ADDITIONAL_EDIT_STEPS.ADDITIONAL_EDIT_FIRST_STEP,
        form.getFieldsValue(),
      );
    }
    setCurrent(current + 1);
  };
  const prev = () => setCurrent(current - 1);

  const onSubmit = () => {
    const data = {
      ...additionalSubmitData(
        ADDITIONAL_EDIT_STEPS.ADDITIONAL_EDIT_FIRST_STEP,
        ADDITIONAL_EDIT_STEPS.ADDITIONAL_EDIT_SECOND_STEP,
        ADDITIONAL_EDIT_STEPS.ADDITIONAL_EDIT_THIRD_STEP,
      ),
      id,
      category_id: location.state?.category || null,
    };
    console.log(data, "data");
  };

  useEffect(() => {
    setLocalStorage(
      ADDITIONAL_EDIT_STEPS.ADDITIONAL_EDIT_CURRENT_STEP,
      current,
    );
    if (current === 0) {
      form.setFieldsValue(
        getLocalStorage(ADDITIONAL_EDIT_STEPS.ADDITIONAL_EDIT_FIRST_STEP),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (
      getLocalStorage(ADDITIONAL_EDIT_STEPS.ADDITIONAL_EDIT_FIRST_STEP) &&
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
          clearAllAdditionalEditStorage();
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
          id="additional-edit"
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
          <Button type="primary" htmlType="submit" form="additional-edit">
            {t("save")}
          </Button>
        )}
      </Flex>
    </>
  );
};

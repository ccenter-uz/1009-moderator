import { Button, Divider, Flex, Form, Steps } from "antd";
import i18next from "i18next";
import { CSSProperties, FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useBlocker, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

import { AdditionalAddFirstStepUI } from "@widgets/additional-add-first-step";
import { AdditionalAddSecondStepUI } from "@widgets/additional-add-second-step";
import { AdditionalAddThirdStepUI } from "@widgets/additional-add-third-step";

import { getLocalStorage, setLocalStorage } from "@shared/lib/helpers";

const enum LOCAL_STEP_NAME {
  ADDITIONAL_ADD_FIRST_STEP = "additionalAddFirstStep",
  ADDITIONAL_ADD_SECOND_STEP = "additionalAddSecondStep",
  ADDITIONAL_ADD_THIRD_STEP = "additionalAddThirdStep",
  ADDITIONAL_ADD_CURRENT_STEP = "additionalAddCurrentStep",
}
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
    +getLocalStorage(LOCAL_STEP_NAME.ADDITIONAL_ADD_CURRENT_STEP) || 0,
  );

  const next = () => {
    if (current === 0) {
      setLocalStorage(
        LOCAL_STEP_NAME.ADDITIONAL_ADD_FIRST_STEP,
        form.getFieldsValue(),
      );
    }
    setCurrent(current + 1);
  };
  const prev = () => setCurrent(current - 1);

  const onSubmit = () => {
    const data = {
      category_id: location.state?.category || null,
      mention: {
        ru: getLocalStorage(LOCAL_STEP_NAME.ADDITIONAL_ADD_FIRST_STEP)[
          "mention-ru"
        ],
        uz: getLocalStorage(LOCAL_STEP_NAME.ADDITIONAL_ADD_FIRST_STEP)[
          "mention-uz"
        ],
        cy: getLocalStorage(LOCAL_STEP_NAME.ADDITIONAL_ADD_FIRST_STEP)[
          "mention-cyrill"
        ],
      },
      warning: {
        ru: getLocalStorage(LOCAL_STEP_NAME.ADDITIONAL_ADD_FIRST_STEP)[
          "warning-ru"
        ],
        uz: getLocalStorage(LOCAL_STEP_NAME.ADDITIONAL_ADD_FIRST_STEP)[
          "warning-uz"
        ],
        cy: getLocalStorage(LOCAL_STEP_NAME.ADDITIONAL_ADD_FIRST_STEP)[
          "warning-cyrill"
        ],
      },
      title: {
        ru: getLocalStorage(LOCAL_STEP_NAME.ADDITIONAL_ADD_FIRST_STEP)[
          "title-ru"
        ],
        uz: getLocalStorage(LOCAL_STEP_NAME.ADDITIONAL_ADD_FIRST_STEP)[
          "title-uz"
        ],
        cy: getLocalStorage(LOCAL_STEP_NAME.ADDITIONAL_ADD_FIRST_STEP)[
          "title-cyrill"
        ],
      },
      table: getLocalStorage(LOCAL_STEP_NAME.ADDITIONAL_ADD_SECOND_STEP),
      content: getLocalStorage(LOCAL_STEP_NAME.ADDITIONAL_ADD_THIRD_STEP),
    };
    console.log(data, "data");
  };

  useEffect(() => {
    setLocalStorage(LOCAL_STEP_NAME.ADDITIONAL_ADD_CURRENT_STEP, current);
    if (current === 0) {
      form.setFieldsValue(
        getLocalStorage(LOCAL_STEP_NAME.ADDITIONAL_ADD_FIRST_STEP),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (
      getLocalStorage(LOCAL_STEP_NAME.ADDITIONAL_ADD_FIRST_STEP) &&
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

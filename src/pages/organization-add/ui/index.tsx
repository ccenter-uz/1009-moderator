import { Button, Divider, Flex, Form, notification, Steps } from "antd";
import i18next from "i18next";
import { CSSProperties, FC, useEffect, useState, Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setCategoryData } from "@widgets/org-add-first-step";
import {
  setAllDay,
  setAllType,
  setImages,
  setNoDayoffs,
  setWithoutLunch,
} from "@widgets/org-add-fourth-step";
import { setOrientirData } from "@widgets/org-add-second-step";
import { setPhoneData } from "@widgets/org-add-third-step";

import { useCreateOrganizationMutation } from "@entities/organization";

import {
  ERROR_STEPS,
  getDayOffsCheckbox,
  getLocalStorage,
  notificationResponse,
  omitUndefinedValues,
  removeLocalStorage,
  SEND_BODY,
  setLocalStorage,
  STEPS_ADD_KEYS,
  STEPS_DATA,
  STEPS_ENUM,
} from "@shared/lib/helpers";
import { IOrganizationBody, RootState } from "@shared/types";
import { LoadingSpinner } from "@shared/ui";

// LAZY LOAD
const OrgAddFirstStepUI = lazy(() =>
  import("@widgets/org-add-first-step").then((module) => ({
    default: module.OrgAddFirstStepUI,
  })),
);
const OrgAddSecondStepUI = lazy(() =>
  import("@widgets/org-add-second-step").then((module) => ({
    default: module.OrgAddSecondStepUI,
  })),
);
const OrgAddThirdStepUI = lazy(() =>
  import("@widgets/org-add-third-step").then((module) => ({
    default: module.OrgAddThirdStepUI,
  })),
);
const OrgAddFourthStepUI = lazy(() =>
  import("@widgets/org-add-fourth-step").then((module) => ({
    default: module.OrgAddFourthStepUI,
  })),
);

const contentStyle: CSSProperties = {
  margin: "16px",
};

interface IPaymentTypes {
  cash: boolean;
  terminal: boolean;
  transfer: boolean;
  allType: boolean;
}

export const OrgAddPage: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstErrorStep, setFirstErrorStep] = useState<number | null>(
    getLocalStorage(ERROR_STEPS.FIRST) ?? null,
  );
  const [secondErrorStep, setSecondErrorStep] = useState<number | null>(
    getLocalStorage(ERROR_STEPS.SECOND) ?? null,
  );
  const [thirdErrorStep, setThirdErrorStep] = useState<number | null>(
    getLocalStorage(ERROR_STEPS.THIRD) ?? null,
  );
  const [fourErrorStep, setFourErrorStep] = useState<number | null>(
    getLocalStorage(ERROR_STEPS.FOURTH) ?? null,
  );
  const [createOrganization, { isLoading }] = useCreateOrganizationMutation();
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
    Number(localStorage.getItem(STEPS_ADD_KEYS.CURRENT)) || 0,
  );

  // STEPS
  const items = [
    {
      title: i18next.t("personal"),
      description: i18next.t("personal_description"),
      status:
        firstErrorStep == STEPS_ENUM.firstStep ? ("error" as const) : undefined,
    },
    {
      title: i18next.t("address"),
      description: i18next.t("address_description"),
      status: secondErrorStep ? ("error" as const) : undefined,
    },
    {
      title: i18next.t("contacts"),
      description: i18next.t("contacts_description"),
      status: thirdErrorStep ? ("error" as const) : undefined,
    },
    {
      title: i18next.t("additional"),
      description: i18next.t("additional_description"),
      status: fourErrorStep ? ("error" as const) : undefined,
    },
  ];

  const STORE_STEPS_DATA = (current: number) => {
    if (current === STEPS_ENUM.firstStep) {
      const firstStepData = {
        ...form.getFieldsValue(STEPS_DATA.FIRST_FORMDATA),
        categoryTu: categoryTu,
      };
      localStorage.setItem(STEPS_ADD_KEYS.FIRST, JSON.stringify(firstStepData));
    } else if (current === STEPS_ENUM.secondStep) {
      const secondStepData = {
        ...form.getFieldsValue(STEPS_DATA.SECOND_FORMDATA),
        nearbees: orientirData,
      };
      localStorage.setItem(
        STEPS_ADD_KEYS.SECOND,
        JSON.stringify(secondStepData),
      );
    } else if (current === STEPS_ENUM.thirdStep) {
      const thirdStepData = {
        ...form.getFieldsValue(STEPS_DATA.THIRD_FORMDATA),
        phone: phoneData,
      };
      localStorage.setItem(STEPS_ADD_KEYS.THIRD, JSON.stringify(thirdStepData));
    }
  };

  const handleErrorStep = (isNull: boolean) => {
    switch (current) {
      case STEPS_ENUM.firstStep:
        return (
          setFirstErrorStep(isNull ? null : current),
          setLocalStorage(ERROR_STEPS.FIRST, isNull ? null : current)
        );
      case STEPS_ENUM.secondStep:
        return (
          setSecondErrorStep(isNull ? null : current),
          setLocalStorage(ERROR_STEPS.SECOND, isNull ? null : current)
        );
      case STEPS_ENUM.thirdStep:
        return (
          setThirdErrorStep(isNull ? null : current),
          setLocalStorage(ERROR_STEPS.THIRD, isNull ? null : current)
        );
      case STEPS_ENUM.fourthStep:
        return (
          setFourErrorStep(isNull ? null : current),
          setLocalStorage(ERROR_STEPS.FOURTH, isNull ? null : current)
        );
    }
  };

  const handleStepChange = async (step: number, isNext: boolean) => {
    try {
      await form.validateFields();
      handleErrorStep(true);
    } catch (e) {
      handleErrorStep(false);
    } finally {
      setCurrent(isNext ? step + 1 : step);
      localStorage.setItem(
        STEPS_ADD_KEYS.CURRENT,
        JSON.stringify(isNext ? step + 1 : step),
      );
      STORE_STEPS_DATA(step);
    }
  };

  const next = async () => {
    handleStepChange(current, true);
  };

  const prev = () => {
    setCurrent(current - 1);
    localStorage.setItem(STEPS_ADD_KEYS.CURRENT, JSON.stringify(current - 1));
  };

  const onSubmit = async () => {
    if (
      firstErrorStep !== null ||
      secondErrorStep !== null ||
      thirdErrorStep !== null ||
      fourErrorStep !== null
    ) {
      return notificationResponse(
        null,
        t("you_have_not_filled_the_required_fields"),
      );
    } else {
      const formData = new FormData();
      const paymentTypes: IPaymentTypes = [
        "cash",
        "terminal",
        "transfer",
        "allType",
      ].reduce((acc, key) => {
        acc[key as keyof typeof acc] = form.getFieldValue(key) ?? false;
        return acc;
      }, {} as IPaymentTypes);
      const body: IOrganizationBody = {
        ...omitUndefinedValues(form.getFieldsValue(SEND_BODY)),
        paymentTypes,
        workTime: {
          dayoffs: getDayOffsCheckbox(form),
          worktimeFrom: form.getFieldValue("worktimeFrom"),
          worktimeTo: form.getFieldValue("worktimeTo"),
          workTimeDescription: form.getFieldValue("workTimeDescription"),
          allDayDescription: form.getFieldValue("allDayDescription"),
          allDay: form.getFieldValue("allDay"),
          noDayoffs: form.getFieldValue("noDayoffs"),
          withoutLunch: form.getFieldValue("withoutLunch"),
          lunchFrom: form.getFieldValue("lunchFrom"),
          lunchTo: form.getFieldValue("lunchTo"),
        },
        transport: {
          bus: form.getFieldValue("bus"),
          microBus: form.getFieldValue("microBus"),
          metroStation: form.getFieldValue("metroStation"),
        },
        productService: { productServices: categoryTu },
        nearby: {
          nearbees: orientirData,
        },
        phone: { phones: phoneData },
      };
      for (const key in body) {
        formData.append(key, JSON.stringify(body[key]));
      }
      for (let i = 0; i < images.length; i++) {
        formData.append("photos", images[i]);
      }
      const response = await createOrganization(formData);
      notificationResponse(response);
      response?.data.status === 201 &&
        (onClearAllData({ fromSubmit: true }), navigate("/orgs/all"));
    }
  };

  const onValuesChange = (
    _: {
      [name: string]: boolean;
    },
    allValues: {
      allDay: boolean;
      allType: boolean;
      noDayoffs: boolean;
      withoutLunch: boolean;
    },
  ) => {
    const { allDay, allType, noDayoffs, withoutLunch } = allValues;
    dispatch(setAllDay(allDay));
    dispatch(setAllType(allType));
    dispatch(setNoDayoffs(noDayoffs));
    dispatch(setWithoutLunch(withoutLunch));

    if (withoutLunch) {
      form.resetFields(["lunchFrom", "lunchTo"]);
    }

    if (allType) {
      form.setFieldsValue({ cash: true, terminal: true, transfer: true });
    }
    if (noDayoffs) {
      form.resetFields([
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ]);
    }
  };

  const clearErrorSteps = ({ withState }: { withState: boolean }) => {
    if (withState) {
      removeLocalStorage(ERROR_STEPS.FIRST);
      removeLocalStorage(ERROR_STEPS.SECOND);
      removeLocalStorage(ERROR_STEPS.THIRD);
      removeLocalStorage(ERROR_STEPS.FOURTH);
      setFirstErrorStep(null);
      setSecondErrorStep(null);
      setThirdErrorStep(null);
      setFourErrorStep(null);
    } else {
      removeLocalStorage(ERROR_STEPS.FIRST);
      removeLocalStorage(ERROR_STEPS.SECOND);
      removeLocalStorage(ERROR_STEPS.THIRD);
      removeLocalStorage(ERROR_STEPS.FOURTH);
    }
  };

  const onClearAllData = ({ fromSubmit = false }: { fromSubmit?: boolean }) => {
    removeLocalStorage(STEPS_ADD_KEYS.FIRST);
    removeLocalStorage(STEPS_ADD_KEYS.SECOND);
    removeLocalStorage(STEPS_ADD_KEYS.THIRD);
    removeLocalStorage(STEPS_ADD_KEYS.CURRENT);
    clearErrorSteps({ withState: true });
    form.resetFields();
    dispatch(setCategoryData([]));
    dispatch(setOrientirData([]));
    dispatch(setPhoneData([]));
    dispatch(setImages([]));
    dispatch(setAllDay(false));
    dispatch(setAllType(false));
    dispatch(setNoDayoffs(false));
    dispatch(setWithoutLunch(false));
    !fromSubmit &&
      notification.success({
        message: t("erased"),
        placement: "bottomRight",
        duration: 1,
      });
    setCurrent(0);
  };

  const onClearCurrentStep = () => {
    if (current === STEPS_ENUM.firstStep) {
      form.resetFields(STEPS_DATA.FIRST_FORMDATA);
      dispatch(setCategoryData([]));
      removeLocalStorage(ERROR_STEPS.FIRST);
      setFirstErrorStep(null);
    } else if (current === STEPS_ENUM.secondStep) {
      form.resetFields(STEPS_DATA.SECOND_FORMDATA);
      dispatch(setOrientirData([]));
      removeLocalStorage(ERROR_STEPS.SECOND);
      setSecondErrorStep(null);
    } else if (current === STEPS_ENUM.thirdStep) {
      form.resetFields(STEPS_DATA.THIRD_FORMDATA);
      dispatch(setPhoneData([]));
      removeLocalStorage(ERROR_STEPS.THIRD);
      setThirdErrorStep(null);
    } else if (current === STEPS_ENUM.fourthStep) {
      form.resetFields([
        ...STEPS_DATA.FOURTH_FORMDATA,
        "cash",
        "terminal",
        "transfer",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ]);
      dispatch(setAllDay(false));
      dispatch(setAllType(false));
      dispatch(setNoDayoffs(false));
      dispatch(setWithoutLunch(false));
      dispatch(setImages([]));
      removeLocalStorage(ERROR_STEPS.FOURTH);
      setFourErrorStep(null);
    }
  };

  useEffect(() => {
    // SET-STORED-DATA-FROM-LOCAL-STORAGE
    const firstStepData = localStorage.getItem(STEPS_ADD_KEYS.FIRST);
    const secondStepData = localStorage.getItem(STEPS_ADD_KEYS.SECOND);
    const thirdStepData = localStorage.getItem(STEPS_ADD_KEYS.THIRD);
    if (firstStepData) {
      form.setFieldsValue(JSON.parse(firstStepData)),
        dispatch(setCategoryData(JSON.parse(firstStepData)?.categoryTu));
    }

    if (secondStepData) {
      form.setFieldsValue(JSON.parse(secondStepData)),
        dispatch(setOrientirData(JSON.parse(secondStepData)?.nearbees));
    }
    if (thirdStepData) {
      form.setFieldsValue(JSON.parse(thirdStepData)),
        dispatch(setPhoneData(JSON.parse(thirdStepData)?.phone));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // SAVE-VALUES-UNMOUNT
  useEffect(() => {
    return () => {
      const currentStep = Number(localStorage.getItem(STEPS_ADD_KEYS.CURRENT));

      STORE_STEPS_DATA(currentStep);
      clearErrorSteps({ withState: false });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Steps
        current={current}
        items={items}
        onChange={(step) => handleStepChange(step, false)}
      />
      <Divider />
      <div className="step-content" style={contentStyle}>
        <Form
          onFinish={onSubmit}
          onValuesChange={onValuesChange}
          id="create-org-form"
          form={form}
        >
          <Suspense fallback={<LoadingSpinner />}>
            {current === STEPS_ENUM.firstStep && (
              <OrgAddFirstStepUI form={form} />
            )}
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            {current === STEPS_ENUM.secondStep && <OrgAddSecondStepUI />}
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            {current === STEPS_ENUM.thirdStep && <OrgAddThirdStepUI />}
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            {current === STEPS_ENUM.fourthStep && <OrgAddFourthStepUI />}
          </Suspense>
        </Form>
      </div>
      <Divider />
      <Flex align="center" justify="end" gap={8} style={{ marginTop: 24 }}>
        <Button
          disabled={isLoading}
          type="primary"
          danger
          style={{ margin: "0 8px" }}
          onClick={() => onClearAllData({ fromSubmit: false })}
        >
          {t("erase-all")}
        </Button>
        <Button disabled={isLoading} onClick={onClearCurrentStep}>
          {t("erase-current-step")}
        </Button>
        {current > 0 && (
          <Button
            disabled={isLoading}
            style={{ margin: "0 8px" }}
            onClick={() => prev()}
          >
            {t("previous")}
          </Button>
        )}
        {current < items.length - 1 && (
          <Button disabled={isLoading} type="primary" onClick={() => next()}>
            {t("next")}
          </Button>
        )}
        {current === items.length - 1 && (
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            form="create-org-form"
          >
            {t("save")}
          </Button>
        )}
      </Flex>
    </>
  );
};

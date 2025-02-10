import { Button, Divider, Flex, Form, notification, Steps } from "antd";
import i18next from "i18next";
import { CSSProperties, FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  OrgAddFirstStepUI,
  setCategoryData,
} from "@widgets/org-add-first-step";
import {
  OrgAddFourthStepUI,
  setAllDay,
  setAllType,
  setImages,
  setNoDayoffs,
  setWithoutLunch,
} from "@widgets/org-add-fourth-step";
import {
  OrgAddSecondStepUI,
  setOrientirData,
} from "@widgets/org-add-second-step";
import { OrgAddThirdStepUI, setPhoneData } from "@widgets/org-add-third-step";

import { useCreateOrganizationMutation } from "@entities/organization";

import {
  getDayOffsCheckbox,
  notificationResponse,
  removeLocalStorage,
  SEND_BODY,
  STEPS_DATA,
  STEPS_ENUM,
} from "@shared/lib/helpers";
import { RootState } from "@shared/types";

const contentStyle: CSSProperties = {
  margin: "16px",
};

export const OrgAddPage: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    Number(localStorage.getItem("currentStep")) || 0,
  );

  // STEPS
  const items = [
    {
      title: i18next.t("personal"),
      description: i18next.t("personal_description"),
      content: <OrgAddFirstStepUI form={form} />,
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

  const next = async () => {
    await form.validateFields();
    setCurrent(current + 1);
    localStorage.setItem("currentStep", JSON.stringify(current + 1));
    // STORE STEPS DATA
    if (current === STEPS_ENUM.firstStep) {
      const firstStepData = {
        ...form.getFieldsValue(STEPS_DATA.FIRST_FORMDATA),
        categoryTu: categoryTu,
      };
      localStorage.setItem("firstStepData", JSON.stringify(firstStepData));
    } else if (current === STEPS_ENUM.secondStep) {
      const secondStepData = {
        ...form.getFieldsValue(STEPS_DATA.SECOND_FORMDATA),
        nearbees: orientirData,
      };
      localStorage.setItem("secondStepData", JSON.stringify(secondStepData));
    } else if (current === STEPS_ENUM.thirdStep) {
      const thirdStepData = {
        ...form.getFieldsValue(STEPS_DATA.THIRD_FORMDATA),
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
    const formData = new FormData();

    const body = {
      ...form.getFieldsValue(SEND_BODY),
      paymentTypes: {
        cash: form.getFieldValue("cash"),
        terminal: form.getFieldValue("terminal"),
        transfer: form.getFieldValue("transfer"),
        allType: form.getFieldValue("allType"),
      },
      workTime: {
        dayoffs: getDayOffsCheckbox(form),
        worktimeFrom: form.getFieldValue("worktimeFrom"),
        worktimeTo: form.getFieldValue("worktimeTo"),
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

    response?.data.status === 201 && (onClearAllData(), navigate("/orgs/all"));
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
    if (allDay) {
      form.setFieldsValue({
        worktimeFrom: "00:00",
        worktimeTo: "23:59",
      });
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

  const onClearAllData = () => {
    removeLocalStorage("firstStepData");
    removeLocalStorage("secondStepData");
    removeLocalStorage("thirdStepData");
    removeLocalStorage("currentStep");
    form.resetFields();
    dispatch(setCategoryData([]));
    dispatch(setOrientirData([]));
    dispatch(setPhoneData([]));
    dispatch(setImages([]));
    dispatch(setAllDay(false));
    dispatch(setAllType(false));
    dispatch(setNoDayoffs(false));
    dispatch(setWithoutLunch(false));
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
    } else if (current === STEPS_ENUM.secondStep) {
      form.resetFields(STEPS_DATA.SECOND_FORMDATA);
      dispatch(setOrientirData([]));
    } else if (current === STEPS_ENUM.thirdStep) {
      form.resetFields(STEPS_DATA.THIRD_FORMDATA);
      dispatch(setPhoneData([]));
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
    }
  };

  useEffect(() => {
    // SET-STORED-DATA-FROM-LOCAL-STORAGE
    const firstStepData = localStorage.getItem("firstStepData");
    const secondStepData = localStorage.getItem("secondStepData");
    const thirdStepData = localStorage.getItem("thirdStepData");
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

  return (
    <>
      <Steps current={current} items={items} />
      <Divider />
      <div className="step-content" style={contentStyle}>
        <Form
          onFinish={onSubmit}
          onValuesChange={onValuesChange}
          id="create-org-form"
          form={form}
        >
          {items[current].content}
        </Form>
      </div>
      <Divider />
      <Flex align="center" justify="end" gap={8} style={{ marginTop: 24 }}>
        <Button
          disabled={isLoading}
          style={{ margin: "0 8px" }}
          onClick={onClearAllData}
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

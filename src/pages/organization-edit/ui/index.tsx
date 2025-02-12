import { Button, Divider, Flex, Form, notification, Steps } from "antd";
import { AnyObject } from "antd/es/_util/type";
import i18next from "i18next";
import { CSSProperties, FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  OrgEditFirstStepUI,
  setCategoryData,
} from "@widgets/org-edit-first-step";
import {
  OrgEditFourthStepUI,
  setEditAllDay,
  setEditAllType,
  setEditNoDayoffs,
  setEditWithoutLunch,
  setImages,
} from "@widgets/org-edit-fourth-step";
import {
  OrgEditSecondStepUI,
  setOrientirData,
} from "@widgets/org-edit-second-step";
import { OrgEditThirdStepUI, setPhoneData } from "@widgets/org-edit-third-step";

import { useUpdateOrganizationMutation } from "@entities/organization";

import {
  getDayOffsCheckbox,
  getEditingStepStorageValues,
  notificationResponse,
  omitUndefinedValues,
  removeLocalStorage,
  SEND_BODY,
  setDatyOffsCheckbox,
  STEPS_DATA,
  STEPS_EDIT_DATA,
  STEPS_ENUM,
} from "@shared/lib/helpers";
import { IOrganizationBody, RootState } from "@shared/types";

// STYLE
const contentStyle: CSSProperties = {
  margin: "16px",
};

export const OrgEditPage: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<string>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateOrganization, { isLoading }] = useUpdateOrganizationMutation();
  const [form] = Form.useForm();
  const { data: categoryTu } = useSelector(
    ({ useEditOrgFirstStepSlice }: RootState) => useEditOrgFirstStepSlice,
  );
  const { data: orientirData } = useSelector(
    ({ useEditOrgSecondStepSlice }: RootState) => useEditOrgSecondStepSlice,
  );
  const { data: phoneData } = useSelector(
    ({ useEditOrgThirdStepSlice }: RootState) => useEditOrgThirdStepSlice,
  );
  const { data: images, pictures } = useSelector(
    ({ useEditOrgFourthStepSlice }: RootState) => useEditOrgFourthStepSlice,
  );
  const [current, setCurrent] = useState(
    Number(localStorage.getItem(STEPS_EDIT_DATA.CURRENT)) || 0,
  );

  // STEPS
  const items = [
    {
      title: i18next.t("personal"),
      description: i18next.t("personal_description"),
      content: <OrgEditFirstStepUI form={form} />,
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

  const initializeFormValues = () => {
    const { firstStepData, secondStepData, thirdStepData, fourthStepData } =
      getEditingStepStorageValues();

    if (firstStepData) {
      form.setFieldsValue(firstStepData);
      dispatch(setCategoryData(firstStepData.categoryTu));
    }
    if (secondStepData) {
      form.setFieldsValue(secondStepData);
      dispatch(setOrientirData(secondStepData.nearbees));
    }
    if (thirdStepData) {
      form.setFieldsValue(thirdStepData);
      dispatch(setPhoneData(thirdStepData.phone));
    }
    if (fourthStepData) {
      const dayOffs = setDatyOffsCheckbox(form, fourthStepData.dayoffs);
      form.setFieldsValue({
        ...fourthStepData,
        dayOffs,
      });
      dispatch(setImages(fourthStepData.images));
      dispatch(setEditAllDay(fourthStepData.allDay));
      dispatch(setEditAllType(fourthStepData.allType));
      dispatch(setEditNoDayoffs(fourthStepData.noDayoffs));
      dispatch(setEditWithoutLunch(fourthStepData.withoutLunch));
    }
  };
  const next = async () => {
    await form.validateFields();
    setCurrent(current + 1);
    localStorage.setItem(STEPS_EDIT_DATA.CURRENT, JSON.stringify(current + 1));
    // STORE STEPS DATA
    if (current === STEPS_ENUM.firstStep) {
      const firstStepData = {
        ...form.getFieldsValue(STEPS_DATA.FIRST_FORMDATA),
        categoryTu,
      };
      localStorage.setItem(
        STEPS_EDIT_DATA.FIRST,
        JSON.stringify(firstStepData),
      );
      localStorage.setItem(STEPS_EDIT_DATA.EDIT_ID, JSON.stringify(id));
    } else if (current === STEPS_ENUM.secondStep) {
      const secondStepData = {
        ...form.getFieldsValue(STEPS_DATA.SECOND_FORMDATA),
        nearbees: orientirData,
      };
      localStorage.setItem(
        STEPS_EDIT_DATA.SECOND,
        JSON.stringify(secondStepData),
      );
    } else if (current === STEPS_ENUM.thirdStep) {
      const thirdStepData = {
        ...form.getFieldsValue(STEPS_DATA.THIRD_FORMDATA),
        phone: phoneData,
      };
      localStorage.setItem(
        STEPS_EDIT_DATA.THIRD,
        JSON.stringify(thirdStepData),
      );
    }
  };
  const prev = () => {
    setCurrent(current - 1);
    localStorage.setItem(STEPS_EDIT_DATA.CURRENT, JSON.stringify(current - 1));
  };
  const onSubmit = async () => {
    const formData = new FormData();

    const body: IOrganizationBody = {
      ...omitUndefinedValues(form.getFieldsValue(SEND_BODY)),
      id: id as string,
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
      phone: {
        phones: phoneData.map((item: AnyObject) => ({
          key: item.id,
          phone: item.phone,
          phoneTypeId: item.phoneTypeId,
          isSecret: item.isSecret,
        })),
      },
      picture: {
        pictures:
          pictures.length !== 0
            ? pictures
            : images.map((item: AnyObject) => ({
                link: item.link,
              })),
      },
    };
    for (const key in body) {
      formData.append(key, JSON.stringify(body[key]));
    }
    for (let i = 0; i < images.length; i++) {
      if (!images[i].link) {
        formData.append("photos", images[i]);
      }
    }

    const response = await updateOrganization(formData);

    notificationResponse(response, t);

    response?.data.status === 200 && (onClearAllData(), navigate("/orgs/all"));
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
    dispatch(setEditAllDay(allDay));
    dispatch(setEditAllType(allType));
    dispatch(setEditNoDayoffs(noDayoffs));
    dispatch(setEditWithoutLunch(withoutLunch));

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
    removeLocalStorage("firstStepDataEdit");
    removeLocalStorage("secondStepDataEdit");
    removeLocalStorage("thirdStepDataEdit");
    removeLocalStorage("currentStepEdit");
    form.resetFields();
    dispatch(setCategoryData([]));
    dispatch(setOrientirData([]));
    dispatch(setPhoneData([]));
    dispatch(setImages([]));
    dispatch(setEditAllDay(false));
    dispatch(setEditAllType(false));
    dispatch(setEditNoDayoffs(false));
    dispatch(setEditWithoutLunch(false));
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
      dispatch(setEditAllDay(false));
      dispatch(setEditAllType(false));
      dispatch(setEditNoDayoffs(false));
      dispatch(setEditWithoutLunch(false));
      dispatch(setImages([]));
    }
  };

  useEffect(() => {
    initializeFormValues();

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
          id="edit-org-form"
          form={form}
        >
          {items[current].content}
        </Form>
      </div>
      <Divider />
      <Flex align="center" justify="end" gap={8} style={{ marginTop: 24 }}>
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
            form="edit-org-form"
          >
            {t("save")}
          </Button>
        )}
      </Flex>
    </>
  );
};

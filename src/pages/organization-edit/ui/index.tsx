import { Button, Divider, Flex, Form, Steps } from "antd";
import { AnyObject } from "antd/es/_util/type";
import i18next from "i18next";
import { CSSProperties, FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  OrgEditFirstStepUI,
  setCategoryData,
} from "@widgets/org-edit-first-step";
import { OrgEditFourthStepUI, setImages } from "@widgets/org-edit-fourth-step";
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
  SEND_BODY,
  setDatyOffsCheckbox,
  STEPS_DATA,
  STEPS_EDIT_DATA,
  STEPS_ENUM,
} from "@shared/lib/helpers";
import { RootState } from "@shared/types";

// STEPS
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
// STYLE
const contentStyle: CSSProperties = {
  margin: "16px",
};

export const OrgEditPage: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [updateOrganization] = useUpdateOrganizationMutation();
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

    const body = {
      ...form.getFieldsValue(SEND_BODY),
      id,
      paymentTypes: {
        cash: form.getFieldValue("allType") ? true : form.getFieldValue("cash"),
        terminal: form.getFieldValue("allType")
          ? true
          : form.getFieldValue("terminal"),
        transfer: form.getFieldValue("allType")
          ? true
          : form.getFieldValue("transfer"),
      },
      workTime: {
        dayoffs: getDayOffsCheckbox(form),
        worktimeFrom: form.getFieldValue("worktimeFrom"),
        worktimeTo: form.getFieldValue("worktimeTo"),
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

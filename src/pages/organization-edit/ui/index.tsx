import { Button, Divider, Flex, Form, Steps } from "antd";
import { AnyObject } from "antd/es/_util/type";
import i18next from "i18next";
import { CSSProperties, FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

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
  notificationResponse,
  SEND_BODY,
  STEPS_DATA,
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
// MOCK
const mock: AnyObject = {
  abonent: "abonent123",
  "org-name": "org-name",
  category: "category",
  "sub-category": "sub-category",
  "main-org": "main-org",
  secret: "secret",
  segment: "segment",
  manager: "manager",
  region: "region",
  city: "city",
  village: "village",
  district: "district",
  manage: "manage",
  "residential-area": "residential-area",
  area: "area",
  kvartal: "kvartal",
  street: "street",
  lane: "lane",
  passage: "passage",
  impasse: "impasse",
  address: "address",
  home: "home",
  apartment: "apartment",
  account: "account",
  email: "email",
  index: "index",
  tin: "tin",
  bank_number: "bank_number",
  description: "description",
  bus: "bus",
  "micro-bus": "micro-bus",
  "metro-station": "metro-station",
  "worktime-from": "09:00",
  "worktime-to": "18:00",
  "lunch-from": "12:00",
  "lunch-to": "13:00",
  dayoffs: "Yakshanba",
  payment_type: {
    cash: true,
    terminal: true,
    transfer: false,
    all_type: true,
  },
  "category-tu": [
    {
      id: 1,
      key: 1,
      label: "Подраздел  Т/У 1.1",
      value: "sub-category-tu 1.1",
      "category-tu": "Раздел Т/У",
      "sub-category-tu": "Подраздел  Т/У 1.1",
    },
  ],
  orientir: [
    {
      id: 1,
      key: 1,
      label: "Ориентир 1.1",
      nearby: "nearby",
      "nearby-category": "Категория ориентир 1",
      value: "",
      description: "description",
    },
  ],
  phone: [
    {
      id: 1,
      key: 1,
      label: "Телефон 1.1",
      phone: "phone",
      "phone-type": "phone-type",
      value: "value",
      secret: true,
    },
    {
      id: 2,
      key: 2,
      label: "Телефон 1.2",
      phone: "phone",
      "phone-type": "phone-type",
      value: "value",
      secret: false,
    },
  ],
  images: [],
};
// HANDY-FN
const mockReducer = (data: string[]) => {
  return data.reduce(
    (acc, fieldName) => ({
      ...acc,
      [fieldName]: mock[fieldName],
    }),
    {},
  );
};
const clearStorage = () => {
  localStorage.removeItem(STEPS_EDIT_DATA.FIRST);
  localStorage.removeItem(STEPS_EDIT_DATA.SECOND);
  localStorage.removeItem(STEPS_EDIT_DATA.THIRD);
  localStorage.removeItem(STEPS_EDIT_DATA.FOURTH);
  localStorage.removeItem(STEPS_EDIT_DATA.CURRENT);
  localStorage.removeItem(STEPS_EDIT_DATA.EDIT_ID);
};
const getStorageValues = () => {
  const firstStepData = JSON.parse(
    localStorage.getItem(STEPS_EDIT_DATA.FIRST) as string,
  );
  const secondStepData = JSON.parse(
    localStorage.getItem(STEPS_EDIT_DATA.SECOND) as string,
  );
  const thirdStepData = JSON.parse(
    localStorage.getItem(STEPS_EDIT_DATA.THIRD) as string,
  );
  const fourthStepData = JSON.parse(
    localStorage.getItem(STEPS_EDIT_DATA.FOURTH) as string,
  );
  const currentStep = JSON.parse(
    localStorage.getItem(STEPS_EDIT_DATA.CURRENT) as string,
  );
  const editingId = JSON.parse(
    localStorage.getItem(STEPS_EDIT_DATA.EDIT_ID) as string,
  );
  return {
    firstStepData,
    secondStepData,
    thirdStepData,
    fourthStepData,
    currentStep,
    editingId,
  };
};
// ENUM
const enum STEPS_EDIT_DATA {
  FIRST = "firstStepDataEdit",
  SECOND = "secondStepDataEdit",
  THIRD = "thirdStepDataEdit",
  FOURTH = "fourthStepDataEdit",
  CURRENT = "currentStepEdit",
  EDIT_ID = "editingOrgId",
}

export const OrgEditPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
  const { data: images } = useSelector(
    ({ useEditOrgFourthStepSlice }: RootState) => useEditOrgFourthStepSlice,
  );
  const [current, setCurrent] = useState(
    Number(localStorage.getItem(STEPS_EDIT_DATA.CURRENT)) || 0,
  );

  const checkExistId = () => {
    const { editingId, firstStepData } = getStorageValues();

    if (editingId && Number(id) !== Number(editingId)) {
      Swal.fire({
        icon: "warning",
        title: t("oops"),
        text: `${t("you-were-editing")} ${firstStepData?.abonent}, ${t(
          "do-you-want-to-continue-or-reset-before-data",
        )} ${firstStepData?.abonent} ?`,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: t("continue"),
        cancelButtonText: t("reset"),
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/orgs/edit/${editingId}`, { replace: true });
        } else if (
          !result.isConfirmed &&
          result.isDismissed &&
          !!result.dismiss
        ) {
          clearStorage();
          setCurrent(STEPS_ENUM.firstStep);
        }
        initializeFormValues();
      });
    }
    initializeFormValues();
  };
  const initializeFormValues = () => {
    const { firstStepData, secondStepData, thirdStepData, fourthStepData } =
      getStorageValues();

    if (firstStepData) {
      form.setFieldsValue(firstStepData);
      dispatch(setCategoryData(firstStepData["category-tu"]));
    } else {
      const firstStepDefaultValues = mockReducer(STEPS_DATA.FIRST_FORMDATA);
      form.setFieldsValue(firstStepDefaultValues);
      dispatch(setCategoryData(mock["category-tu"]));
    }

    if (secondStepData) {
      form.setFieldsValue(secondStepData);
      dispatch(setOrientirData(secondStepData.orientir));
    } else {
      const secondStepDefaultValues = mockReducer(STEPS_DATA.SECOND_FORMDATA);
      form.setFieldsValue(secondStepDefaultValues);
      dispatch(setOrientirData(mock.orientir));
    }

    if (thirdStepData) {
      form.setFieldsValue(thirdStepData);
      dispatch(setPhoneData(thirdStepData.phone));
    } else {
      const thirdStepDefaultValues = mockReducer(STEPS_DATA.THIRD_FORMDATA);
      form.setFieldsValue(thirdStepDefaultValues);
      dispatch(setPhoneData(mock.phone));
    }

    if (fourthStepData) {
      form.setFieldsValue(fourthStepData);
      dispatch(setImages(fourthStepData.images));
    } else {
      const fourthStepDefaultValues = mockReducer(STEPS_DATA.FOURTH_FORMDATA);
      form.setFieldsValue(fourthStepDefaultValues);
      dispatch(setImages(mock.images));
    }
  };
  const next = () => {
    setCurrent(current + 1);
    localStorage.setItem(STEPS_EDIT_DATA.CURRENT, JSON.stringify(current + 1));
    // STORE STEPS DATA
    if (current === STEPS_ENUM.firstStep) {
      const firstStepData = {
        ...form.getFieldsValue(STEPS_DATA.FIRST_FORMDATA),
        "category-tu": categoryTu,
      };
      localStorage.setItem(
        STEPS_EDIT_DATA.FIRST,
        JSON.stringify(firstStepData),
      );
      localStorage.setItem(STEPS_EDIT_DATA.EDIT_ID, JSON.stringify(id));
    } else if (current === STEPS_ENUM.secondStep) {
      const secondStepData = {
        ...form.getFieldsValue(STEPS_DATA.SECOND_FORMDATA),
        orientir: orientirData,
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
      phone: { phones: phoneData },
      pictures: [],
    };
    for (const key in body) {
      formData.append(key, JSON.stringify(body[key]));
    }
    formData.append("photos", images);

    console.log(body, "body-edit");
    const response = await updateOrganization({ formData, id });

    notificationResponse(response, t);
    clearStorage();
  };

  useEffect(() => {
    checkExistId();
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

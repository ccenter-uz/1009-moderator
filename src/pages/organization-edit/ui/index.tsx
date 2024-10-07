import { Button, Divider, Flex, Form, Steps } from "antd";
import { AnyObject } from "antd/es/_util/type";
import i18next from "i18next";
import { CSSProperties, FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

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
  "worktime-from": "worktime-from",
  "worktime-to": "worktime-to",
  "lunch-from": "lunch-from",
  "lunch-to": "lunch-to",
  dayoffs: "dayoffs",
  payment_type: {
    cash: true,
    terminal: true,
    transfer: false,
    all_type: true,
  },
  "category-tu": [],
  images: [],
  orientir: [],
  phone: [],
};

export const OrgEditPage: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
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
    Number(localStorage.getItem("currentStepEdit")) || 0,
  );

  const editingValues = () => {
    const firstStepData = localStorage.getItem("firstStepDataEdit");
    const secondStepData = localStorage.getItem("secondStepDataEdit");
    const thirdStepData = localStorage.getItem("thirdStepDataEdit");
    const fourthStepData = localStorage.getItem("fourthStepDataEdit");
    if (firstStepData) {
      form.setFieldsValue(JSON.parse(firstStepData)),
        dispatch(setCategoryData(JSON.parse(firstStepData)["category-tu"]));
    } else {
      const firstDataFromEndpoint = STEPS_DATA.FIRST_FORMDATA.reduce(
        (acc, item: string) => {
          return {
            ...acc,
            [item]: mock[item],
            "category-tu": mock["category-tu"],
          };
        },
        {},
      );

      form.setFieldsValue(firstDataFromEndpoint),
        dispatch(setCategoryData(mock["category-tu"]));
    }

    if (secondStepData) {
      form.setFieldsValue(JSON.parse(secondStepData)),
        dispatch(setOrientirData(JSON.parse(secondStepData)?.orientir));
    } else {
      const secondDataFromEndpoint = STEPS_DATA.SECOND_FORMDATA.reduce(
        (acc, item: string) => {
          return {
            ...acc,
            [item]: mock[item],
            orientir: mock["orientir"],
          };
        },
        {},
      );

      form.setFieldsValue(secondDataFromEndpoint),
        dispatch(setOrientirData(mock["orientir"]));
    }

    if (thirdStepData) {
      form.setFieldsValue(JSON.parse(thirdStepData)),
        dispatch(setPhoneData(JSON.parse(thirdStepData)?.phone));
    } else {
      const thirdDataFromEndpoint = STEPS_DATA.THIRD_FORMDATA.reduce(
        (acc, item: string) => {
          return { ...acc, [item]: mock[item], phone: mock.phone };
        },
        {},
      );

      form.setFieldsValue(thirdDataFromEndpoint),
        dispatch(setPhoneData(mock.phone));
    }
    if (fourthStepData) {
      form.setFieldsValue(JSON.parse(fourthStepData)),
        dispatch(setImages(JSON.parse(fourthStepData)?.images));
    } else {
      const fourthDataFromEndpoint = STEPS_DATA.FOURTH_FORMDATA.reduce(
        (acc, item: string) => {
          return { ...acc, [item]: mock[item], images: mock.images };
        },
        {},
      );

      form.setFieldsValue(fourthDataFromEndpoint),
        dispatch(setImages(mock.images));
    }
  };

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

    console.log(body, "body-edit");
  };

  useEffect(() => {
    // CHECK-AND-SET-EDITING-VALUES
    editingValues();

    return () => {
      localStorage.removeItem("currentStepEdit");
      localStorage.removeItem("firstStepDataEdit");
      localStorage.removeItem("secondStepDataEdit");
      localStorage.removeItem("thirdStepDataEdit");
    };
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

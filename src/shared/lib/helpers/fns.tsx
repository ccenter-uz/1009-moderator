import { notification } from "antd";
import { AnyObject } from "antd/es/_util/type";
import DOMPurify from "dompurify";
import i18next from "i18next";
import { ReactNode } from "react";
import { FaCheck } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { IoClose, IoWarning } from "react-icons/io5";

import { STEPS_EDIT_DATA } from "./enums";
import { STEPS_DATA } from "./static-datas";

export const returnAllParams = () => {
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
};

export const renderHtml = (html: string) => {
  return DOMPurify.sanitize(html);
};

export const getLocalStorage = (localName: string) => {
  return JSON.parse(localStorage.getItem(localName) as string);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setLocalStorage = (localName: string, data: any) => {
  localStorage.setItem(localName, JSON.stringify(data));
};

export const removeLocalStorage = (localName: string) => {
  localStorage.removeItem(localName);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

const enum LOCAL_STEP_NAME {
  ADDITIONAL_EDIT_FIRST_STEP = "additionalEditFirstStep",
  ADDITIONAL_EDIT_SECOND_STEP = "additionalEditSecondStep",
  ADDITIONAL_EDIT_THIRD_STEP = "additionalEditThirdStep",
  ADDITIONAL_EDIT_CURRENT_STEP = "additionalEditCurrentStep",
  ADDITIONAL_ADD_FIRST_STEP = "additionalAddFirstStep",
  ADDITIONAL_ADD_SECOND_STEP = "additionalAddSecondStep",
  ADDITIONAL_ADD_THIRD_STEP = "additionalAddThirdStep",
  ADDITIONAL_ADD_CURRENT_STEP = "additionalAddCurrentStep",
}
export const clearAllAdditionalAddStorage = () => {
  removeLocalStorage(LOCAL_STEP_NAME.ADDITIONAL_ADD_CURRENT_STEP);
  removeLocalStorage(LOCAL_STEP_NAME.ADDITIONAL_ADD_FIRST_STEP);
  removeLocalStorage(LOCAL_STEP_NAME.ADDITIONAL_ADD_SECOND_STEP);
  removeLocalStorage(LOCAL_STEP_NAME.ADDITIONAL_ADD_THIRD_STEP);
};

export const clearAllAdditionalEditStorage = () => {
  removeLocalStorage(LOCAL_STEP_NAME.ADDITIONAL_EDIT_CURRENT_STEP);
  removeLocalStorage(LOCAL_STEP_NAME.ADDITIONAL_EDIT_FIRST_STEP);
  removeLocalStorage(LOCAL_STEP_NAME.ADDITIONAL_EDIT_SECOND_STEP);
  removeLocalStorage(LOCAL_STEP_NAME.ADDITIONAL_EDIT_THIRD_STEP);
};

export const clearAllAdditionalStorage = () => {
  clearAllAdditionalAddStorage();
  clearAllAdditionalEditStorage();
};

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

export const deleteCookie = (name: string) => {
  document.cookie = name + "=; Max-Age=-99999999;";
};

export const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}`;
};

export const clearCookie = () => {
  deleteCookie("access_token");
  deleteCookie("refreshToken");
};

export const notificationResponse = (res: AnyObject, onClose?: () => void) => {
  if (res.data.status >= 200 && res.data.status < 300) {
    notification.success({
      message: i18next.t("success"),
      placement: "bottomRight",
    });
    onClose && onClose();
  } else {
    notification.error({
      message: i18next.t("error"),
      placement: "bottomRight",
    });
  }
};

export const setColorByStatus = (status: string) => {
  switch (status) {
    case i18next.t("rejected"):
      return (
        <span
          style={{
            color: "#ff4d4f",
            display: "flex",
            alignItems: "center",
            gap: "0.5em",
          }}
          title={i18next.t("rejected")}
        >
          <IoWarning />
          {i18next.t("rejected")}
        </span>
      );
    case i18next.t("accepted"):
      return (
        <span
          style={{
            color: "#52c41a",
            display: "flex",
            alignItems: "center",
            gap: "0.5em",
          }}
          title={i18next.t("accepted")}
        >
          <FaCheck />
          {i18next.t("accepted")}
        </span>
      );
    case i18next.t("deleted"):
      return (
        <span
          style={{
            color: "#ff4d4f",
            display: "flex",
            alignItems: "center",
            gap: "0.5em",
          }}
          title={i18next.t("deleted")}
        >
          <IoClose />
          {i18next.t("deleted")}
        </span>
      );
    case i18next.t("check"):
      return (
        <span
          style={{
            color: "grey",
            display: "flex",
            alignItems: "center",
            gap: "0.5em",
          }}
          title={i18next.t("check")}
        >
          <GoClock />
          {i18next.t("check")}
        </span>
      );
    default:
      return null;
  }
};

export const renderLabelSelect = ({ label }: { label: string | ReactNode }) => {
  if (label == undefined) {
    return "";
  }
  return label;
};
export const getDayOffsCheckbox = (form: AnyObject) => {
  const dayOffs = [];
  form.getFieldValue("monday") && dayOffs.push("monday");
  form.getFieldValue("tuesday") && dayOffs.push("tuesday");
  form.getFieldValue("wednesday") && dayOffs.push("wednesday");
  form.getFieldValue("thursday") && dayOffs.push("thursday");
  form.getFieldValue("friday") && dayOffs.push("friday");
  form.getFieldValue("saturday") && dayOffs.push("saturday");
  form.getFieldValue("sunday") && dayOffs.push("sunday");
  return dayOffs;
};

export const setDatyOffsCheckbox = (form: AnyObject, dayOffs: string[]) => {
  dayOffs?.forEach((day) => {
    form.setFieldsValue({ [day]: true });
  });
};

export const getStepsValueByKey = (stepKeys: string[], getFrom: AnyObject) => {
  return stepKeys.reduce(
    (acc, fieldName) => ({
      ...acc,
      [fieldName]: getFrom[fieldName],
    }),
    {},
  );
};

export const getEditingStepStorageValues = () => {
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

export const clearEditStepStorage = () => {
  localStorage.removeItem(STEPS_EDIT_DATA.FIRST);
  localStorage.removeItem(STEPS_EDIT_DATA.SECOND);
  localStorage.removeItem(STEPS_EDIT_DATA.THIRD);
  localStorage.removeItem(STEPS_EDIT_DATA.FOURTH);
  localStorage.removeItem(STEPS_EDIT_DATA.CURRENT);
  localStorage.removeItem(STEPS_EDIT_DATA.EDIT_ID);
};

const PRODUCT_FILED_NAMES = ["ProductServices", "ProductServicesVersion"];
const NEARBEES_FILED_NAMES = ["Nearbees", "NearbeesVersion"];
const PHONE_FILED_NAMES = ["Phone", "PhoneVersion"];
const PICTURE_FILED_NAMES = ["Picture", "PictureVersion"];
const PAYMENT_TYPES_FILED_NAMES = ["PaymentTypes", "PaymentTypesVersion"];

function getDynamicPropKey(record: AnyObject, names: string[]) {
  return Object.keys(record).find((item) => names.includes(item)) as string;
}

export const handleEditLocalDatas = (record: AnyObject) => {
  // First step
  const productName = getDynamicPropKey(record, PRODUCT_FILED_NAMES);
  const firstEditStep = {
    ...getStepsValueByKey(STEPS_DATA.FIRST_FORMDATA, record),
    cityId: record.city?.id,
    regionId: record.region?.id,
    districtId: record.district?.id,
    segmentId: record.segment?.id,
    categoryId: record.category?.id,
    categoryTu: record[productName]?.map((item: AnyObject) => ({
      key: item.id,
      productServiceCategoryId: item.ProductServiceCategory?.id,
      productServiceSubCategoryId: item.ProductServiceSubCategory?.id,
      productServiceCategoryName:
        item.ProductServiceCategory?.name[i18next.language],
      productServiceSubCategoryName:
        item.ProductServiceSubCategory?.name[i18next.language],
    })),
  };
  // Second step
  const nearbyName = getDynamicPropKey(record, NEARBEES_FILED_NAMES);
  const secondEditStep = {
    ...getStepsValueByKey(STEPS_DATA.SECOND_FORMDATA, record),
    areaId: record.area?.id,
    avenueId: record.avenue?.id,
    streetId: record.street?.id,
    impasseId: record.impasse?.id,
    villageId: record.village?.id,
    laneId: record.lane?.id,
    nearbees: record[nearbyName]?.map((item: AnyObject) => ({
      key: item.Nearby?.id,
      nearbyId: item.Nearby?.id,
      nearbyCategoryId: item?.NearbyCategory?.id,
      nearbyCategoryName: item?.NearbyCategory?.name,
      nearbyName: item.Nearby?.name[i18next.language],
      description: item?.description,
    })),
  };

  // Third step
  const phoneName = getDynamicPropKey(record, PHONE_FILED_NAMES);
  const thirdEditStep = {
    ...getStepsValueByKey(STEPS_DATA.THIRD_FORMDATA, record),
    phone: record[phoneName]?.map((item: AnyObject) => ({
      ...item,
      key: item.id,
      phone: item.phone,
      phoneTypeId: item.PhoneTypeId,
      "phone-type": item.PhoneTypes?.name[i18next.language],
    })),
  };

  // Fourth step
  const paymentName = getDynamicPropKey(record, PAYMENT_TYPES_FILED_NAMES);
  const pictureName = getDynamicPropKey(record, PICTURE_FILED_NAMES);
  const fourthEditStep = {
    ...getStepsValueByKey(STEPS_DATA.FOURTH_FORMDATA, record),
    allType:
      record[paymentName][0]?.Cash &&
      record[paymentName][0]?.Terminal &&
      record[paymentName][0]?.Transfer,
    cash: record[paymentName][0]?.Cash,
    terminal: record[paymentName][0]?.Terminal,
    transfer: record[paymentName][0]?.Transfer,
    worktimeFrom: record.workTime?.worktimeFrom,
    worktimeTo: record.workTime?.worktimeTo,
    lunchFrom: record.workTime?.lunchFrom,
    lunchTo: record.workTime?.lunchTo,
    dayoffs: record.workTime?.dayoffs,
    allDay: record.workTime?.allDay,
    noDayoffs: record.workTime?.noDayoffs,
    withoutLunch: record.workTime?.withoutLunch,
    bus: record.transport?.bus,
    microBus: record.transport?.microBus,
    metroStation: record.transport?.metroStation,
    images: record[pictureName],
  };

  setLocalStorage(STEPS_EDIT_DATA.FIRST, firstEditStep);
  setLocalStorage(STEPS_EDIT_DATA.SECOND, secondEditStep);
  setLocalStorage(STEPS_EDIT_DATA.THIRD, thirdEditStep);
  setLocalStorage(STEPS_EDIT_DATA.FOURTH, fourthEditStep);
};

// DRAGGABLE-ELEMENT-FUNCTION
export function enableVerticalDrag(element: HTMLElement) {
  let startY = 0;
  let startTop = 0;

  const handleMouseDown = (e: MouseEvent) => {
    startY = e.clientY;
    startTop = element.offsetTop;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const deltaY = e.clientY - startY;
    const newTop = startTop + deltaY;

    // Prevent overflow
    const maxTop = window.innerHeight - element.offsetHeight;
    const boundedTop = Math.max(0, Math.min(newTop, maxTop));

    element.style.top = `${boundedTop}px`;
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  element.addEventListener("mousedown", handleMouseDown);
}

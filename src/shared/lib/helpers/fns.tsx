import { notification } from "antd";
import { AnyObject } from "antd/es/_util/type";
import DOMPurify from "dompurify";
import i18next from "i18next";
import { ReactNode } from "react";

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

export const notificationResponse = (
  res: AnyObject,
  t: (arg0: string) => string,
  onClose: () => void,
) => {
  if (res.data.status >= 200 && res.data.status < 300) {
    notification.success({
      message: t("success"),
      placement: "bottomRight",
    });
    onClose();
  }
};

export const setColorByStatus = (status: string) => {
  switch (status) {
    case i18next.t("not-active"):
      return (
        <span style={{ color: "#ff4d4f" }}>{i18next.t("not-active")}</span>
      );
    case i18next.t("active"):
      return <span style={{ color: "#52c41a" }}>{i18next.t("active")}</span>;
    default:
      return null;
  }
};


export const renderLabelSelect = ({ label }: { label: string | ReactNode }) => {
  if (label == undefined) {
    return "";
  }
  return label;


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

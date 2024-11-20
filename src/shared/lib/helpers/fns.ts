import DOMPurify from "dompurify";

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

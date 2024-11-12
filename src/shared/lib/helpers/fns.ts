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

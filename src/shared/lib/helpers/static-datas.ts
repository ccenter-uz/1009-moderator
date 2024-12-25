import { getLocalStorage } from "./fns";

export const BASE_URL = "https://admin-1009.ccenter.uz/v1/";

export const STEPS_DATA = {
  FIRST_FORMDATA: [
    "abonent",
    "org-name",
    "category",
    "sub-category",
    "main-org",
    "secret",
    "segment",
    "manager",
  ],
  SECOND_FORMDATA: [
    "region",
    "city",
    "village",
    "district",
    "manage",
    "residential-area",
    "area",
    "kvartal",
    "street",
    "lane",
    "passage",
    "impasse",
    "address",
    "home",
    "apartment",
  ],
  THIRD_FORMDATA: ["account", "email", "index", "tin", "bank_number"],
  FOURTH_FORMDATA: [
    "payment_type",
    "description",
    "bus",
    "micro-bus",
    "metro-station",
    "worktime-from",
    "worktime-to",
    "lunch-from",
    "lunch-to",
    "dayoffs",
  ],
};

export const SEND_BODY = [
  "abonent",
  "org-name",
  "category",
  "sub-category",
  "main-org",
  "secret",
  "segment",
  "manager",
  "region",
  "city",
  "village",
  "district",
  "manage",
  "residential-area",
  "area",
  "kvartal",
  "street",
  "lane",
  "passage",
  "impasse",
  "address",
  "home",
  "apartment",
  "account",
  "email",
  "index",
  "tin",
  "bank_number",
  "payment_type",
  "description",
  "bus",
  "micro-bus",
  "metro-station",
  "worktime-from",
  "worktime-to",
  "lunch-from",
  "lunch-to",
  "dayoffs",
];

export const additionalSubmitData = (
  firstStep: string,
  secondStep: string,
  thirdStep: string,
) => {
  return {
    mention: {
      ru: getLocalStorage(firstStep)["mention-ru"],
      uz: getLocalStorage(firstStep)["mention-uz"],
      cy: getLocalStorage(firstStep)["mention-cyrill"],
    },
    warning: {
      ru: getLocalStorage(firstStep)["warning-ru"],
      uz: getLocalStorage(firstStep)["warning-uz"],
      cy: getLocalStorage(firstStep)["warning-cyrill"],
    },
    title: {
      ru: getLocalStorage(firstStep)["title-ru"],
      uz: getLocalStorage(firstStep)["title-uz"],
      cy: getLocalStorage(firstStep)["title-cyrill"],
    },
    table: getLocalStorage(secondStep),
    content: getLocalStorage(thirdStep),
  };
};

export const GET_ALL_ACTIVE_STATUS = {
  active: 1,
  all: true,
};

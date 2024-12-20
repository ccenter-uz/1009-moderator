import { getLocalStorage } from "./fns";

export const BASE_URL = "https://admin-1009.ccenter.uz/v1/";

export const STEPS_DATA = {
  FIRST_FORMDATA: [
    "name",
    "legalName",
    "categoryId",
    "subCategoryId",
    "mainOrganizationId",
    "secret",
    "segmentId",
    "manager",
  ],
  SECOND_FORMDATA: [
    "regionId",
    "cityId",
    "villageId",
    "districtId",
    "residentialId",
    "areaId",
    "avenueId",
    "kvartal",
    "streetId",
    "laneId",
    "passageId",
    "impasseId",
    "address",
    "home",
    "apartment",
  ],
  THIRD_FORMDATA: ["account", "mail", "index", "inn", "bank_number"],
  FOURTH_FORMDATA: [
    "paymentType",
    "description",
    "bus",
    "microBus",
    "metroStation",
    "worktimeFrom",
    "worktimeTo",
    "lunchFrom",
    "lunchTo",
    "dayoffs",
  ],
};

export const SEND_BODY = [
  "name",
  "legalName",
  "categoryId",
  "subCategoryId",
  "mainOrganizationId",
  "secret",
  "segmentId",
  "manager",
  "regionId",
  "cityId",
  "avenueId",
  "villageId",
  "districtId",
  "residentialId",
  "areaId",
  "kvartal",
  "streetId",
  "laneId",
  "passageId",
  "impasseId",
  "address",
  "home",
  "apartment",
  "account",
  "mail",
  "index",
  "inn",
  "bank_number",
  "description",
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

export const allActives = {
  all: GET_ALL_ACTIVE_STATUS.all,
  status: GET_ALL_ACTIVE_STATUS.active,
};

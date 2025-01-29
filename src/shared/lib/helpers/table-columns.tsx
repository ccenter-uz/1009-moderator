import { Tooltip } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import i18next from "i18next";
import { FaLock, FaLockOpen } from "react-icons/fa";

import { setColorByStatus } from "./fns";

type searchColType = ColumnsType<AnyObject> | undefined;

export type statusType = 0 | 1 | 2 | -1;

export const columnsForMyOrganizations = [
  {
    title: i18next.t("code"),
    dataIndex: "inn",
    key: "inn",
    width: 80,
    align: "center",
  },
  {
    width: 200,
    title: i18next.t("abonent"),
    dataIndex: "name",
    key: "name",
    render: (text: string) => <p style={{ margin: 0 }}>{text}</p>,
  },
  {
    width: 400,
    title: i18next.t("address"),
    dataIndex: "address",
    key: "address",
  },
  {
    width: 80,
    title: i18next.t("status"),
    dataIndex: "status",
    key: "status",
    render: (text: statusType) => setColorByStatus(statusForOrgs[text]),
  },
  {
    width: 80,
    title: i18next.t("reason"),
    dataIndex: "reason",
    key: "reason",
    render: (
      _: string,
      record: { status: number; deleteReason: string; rejectReason: string },
    ) => {
      if (record.status === -1) return record.deleteReason;
      if (record.status === 2) return record.rejectReason;
    },
  },
];

export const columnsForAddress = [
  {
    title: i18next.t("name"),
    dataIndex: "name",
    key: "name",
    render: (text: { [key: string]: string }) => text?.[i18next.language],
  },
  {
    title: i18next.t("old_name"),
    dataIndex: "oldName",
    key: "oldName",
    render: (text: { [key: string]: string }) => text?.[i18next.language],
  },
  {
    title: i18next.t("new_name"),
    dataIndex: "newName",
    key: "newName",
    render: (text: { [key: string]: string }) => text?.[i18next.language],
  },
  {
    title: i18next.t("region"),
    dataIndex: "region",
    key: "region",
    render: (text: { name: { [key: string]: string } }) =>
      text?.name?.[i18next.language],
  },
  {
    title: i18next.t("city"),
    dataIndex: "city",
    key: "city",
    render: (text: { name: { [key: string]: string } }) =>
      text?.name?.[i18next.language],
  },
  {
    title: i18next.t("district"),
    dataIndex: "district",
    key: "district",
    render: (text: { name: { [key: string]: string } }) =>
      text?.name?.[i18next.language],
  },
  {
    title: i18next.t("index"),
    dataIndex: "index",
    key: "index",
  },
  {
    title: i18next.t("status"),
    dataIndex: "status",
    key: "status",
    render: (text: statusType) => setColorByStatus(status[text]),
  },
  {
    title: i18next.t("update_date"),
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (text: string) => dayjs(text).format("DD.MM.YYYY HH:mm:ss"),
  },
  {
    title: i18next.t("employee"),
    dataIndex: "staffNumber",
    key: "staffNumber",
  },
];

export const columnsForForBasicTable = [
  {
    title: i18next.t("name"),
    dataIndex: "name",
    key: "name",
    render: (text: { [key: string]: string }) => text[i18next.language],
  },
  {
    title: i18next.t("createdAt"),
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text: string) => dayjs(text).format("DD.MM.YYYY HH:mm:ss"),
  },
  {
    title: i18next.t("update_date"),
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (text: string) => dayjs(text).format("DD.MM.YYYY HH:mm:ss"),
  },
  {
    title: i18next.t("deletedAt"),
    dataIndex: "deletedAt",
    key: "deletedAt",
    render: (text: string) => dayjs(text).format("DD.MM.YYYY HH:mm:ss"),
  },
  {
    title: i18next.t("status"),
    dataIndex: "status",
    key: "status",
    render: (text: number) => setColorByStatus(status[text]),
  },
];
export const columnsWithSingleName = [
  {
    title: i18next.t("name"),
    dataIndex: "name",
    key: "name",
  },
  {
    title: i18next.t("createdAt"),
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text: string) => dayjs(text).format("DD.MM.YYYY HH:mm:ss"),
  },
  {
    title: i18next.t("update_date"),
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (text: string) => dayjs(text).format("DD.MM.YYYY HH:mm:ss"),
  },
  {
    title: i18next.t("deletedAt"),
    dataIndex: "deletedAt",
    key: "deletedAt",
    render: (text: string) => dayjs(text).format("DD.MM.YYYY HH:mm:ss"),
  },
  {
    title: i18next.t("status"),
    dataIndex: "status",
    key: "status",
    render: (text: statusType) => setColorByStatus(status[text]),
  },
];
export const columnsForPhoneTypeTable = [
  {
    title: i18next.t("name"),
    dataIndex: "name",
    key: "name",
    render: (text: { [key: string]: string }) => text[i18next.language],
  },
  {
    title: i18next.t("createdAt"),
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text: string) => dayjs(text).format("DD.MM.YYYY HH:mm:ss"),
  },
  {
    title: i18next.t("update_date"),
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (text: string) => dayjs(text).format("DD.MM.YYYY HH:mm:ss"),
  },
  {
    title: i18next.t("deletedAt"),
    dataIndex: "deletedAt",
    key: "deletedAt",
    render: (text: string) => dayjs(text).format("DD.MM.YYYY HH:mm:ss"),
  },
  {
    title: i18next.t("status"),
    dataIndex: "status",
    key: "status",
    render: (text: statusType) => setColorByStatus(status[text]),
  },
  {
    title: i18next.t("employee"),
    dataIndex: "staffNumber",
    key: "staffNumber",
  },
];

export const columnsWithRegions = [
  {
    title: i18next.t("name"),
    dataIndex: "name",
    key: "name",
    render: (text: { [key: string]: string }) => text[i18next.language],
  },
  {
    title: i18next.t("nearby-category"),
    dataIndex: "category",
    key: "category",
    render: (text: { name: string }) => text?.name,
  },
  {
    title: i18next.t("region"),
    dataIndex: "region",
    key: "region",
    render: (text: { name: { [key: string]: string } }) =>
      text?.name[i18next.language],
  },
  {
    title: i18next.t("city"),
    dataIndex: "city",
    key: "city",
    render: (text: { name: { [key: string]: string } }) =>
      text?.name[i18next.language],
  },
  {
    title: i18next.t("status"),
    dataIndex: "status",
    key: "status",
    render: (text: statusType) => setColorByStatus(status[text]),
  },
  {
    title: i18next.t("update_date"),
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (text: string) => dayjs(text).format("DD.MM.YYYY HH:mm:ss"),
  },
  {
    title: i18next.t("employee"),
    dataIndex: "staffNumber",
    key: "staffNumber",
  },
];

export const columnsWithAddressAndNamings = [
  {
    title: i18next.t("name"),
    dataIndex: "name",
    key: "name",
    render: (text: { [key: string]: string }) => text[i18next.language],
  },
  {
    title: i18next.t("old_name"),
    dataIndex: "oldName",
    key: "oldName",
    render: (text: { [key: string]: string }) => text[i18next.language],
  },
  {
    title: i18next.t("new_name"),
    dataIndex: "newName",
    key: "newName",
    render: (text: { [key: string]: string }) => text[i18next.language],
  },
  {
    title: i18next.t("region"),
    dataIndex: "region",
    key: "region",
    render: (text: { name: { [key: string]: string } }) =>
      text?.name[i18next.language],
  },
  {
    title: i18next.t("city"),
    dataIndex: "city",
    key: "city",
    render: (text: { name: { [key: string]: string } }) =>
      text?.name[i18next.language],
  },
  {
    title: i18next.t("index"),
    dataIndex: "index",
    key: "index",
  },
  {
    title: i18next.t("status"),
    dataIndex: "status",
    key: "status",
    render: (text: statusType) => setColorByStatus(status[text]),
  },
  {
    title: i18next.t("update_date"),
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (text: string) => dayjs(text).format("DD.MM.YYYY HH:mm:ss"),
  },
  {
    title: i18next.t("employee"),
    dataIndex: "staffNumber",
    key: "staffNumber",
  },
];

export const columnsForCategories = [
  {
    title: i18next.t("name_ru"),
    dataIndex: "name",
    key: "name",
    render: (text: { ru: string }) => text.ru,
  },
  {
    title: i18next.t("name_uz"),
    dataIndex: "name",
    key: "name",
    render: (text: { uz: string }) => text.uz,
  },
  {
    title: i18next.t("name_uzcyrill"),
    dataIndex: "name",
    key: "name",
    render: (text: { cy: string }) => text.cy,
  },
  {
    title: i18next.t("region"),
    dataIndex: "region",
    key: "region",
    render: (text: { name: { [key: string]: string } }) =>
      text?.name[i18next.language],
  },
  {
    title: i18next.t("city"),
    dataIndex: "city",
    key: "city",
    render: (text: { name: { [key: string]: string } }) =>
      text?.name[i18next.language],
  },
  {
    title: i18next.t("status"),
    dataIndex: "status",
    key: "status",
    render: (text: statusType) => setColorByStatus(status[text]),
  },
  {
    title: i18next.t("update_date"),
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (text: string) => dayjs(text).format("DD.MM.YYYY HH:mm:ss"),
  },
  {
    title: i18next.t("employee"),
    dataIndex: "staffNumber",
    key: "staffNumber",
  },
];
export const columnsForCategoriesTu = [
  {
    title: i18next.t("name_ru"),
    dataIndex: "name",
    key: "name",
    render: (text: { ru: string }) => text.ru,
  },
  {
    title: i18next.t("name_uz"),
    dataIndex: "name",
    key: "name",
    render: (text: { uz: string }) => text.uz,
  },
  {
    title: i18next.t("name_uzcyrill"),
    dataIndex: "name",
    key: "name",
    render: (text: { cy: string }) => text.cy,
  },
  {
    title: i18next.t("status"),
    dataIndex: "status",
    key: "status",
    render: (text: statusType) => setColorByStatus(status[text]),
  },
  {
    title: i18next.t("update_date"),
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (text: string) => dayjs(text).format("DD.MM.YYYY HH:mm:ss"),
  },
  {
    title: i18next.t("employee"),
    dataIndex: "staffNumber",
    key: "staffNumber",
  },
];

export const subCategoryColumns: searchColType = [
  {
    title: i18next.t("sub-category-tu"),
    dataIndex: "ProductServiceSubCategory",
    key: "ProductServiceSubCategory",
  },
];

export const attrColumns: searchColType = [
  {
    width: 150,
    title: i18next.t("category"),
    dataIndex: "category",
    key: "category",
    render: (text: { name: { [key: string]: string } }) =>
      text?.name[i18next.language],
  },
  {
    width: 150,
    title: i18next.t("sub-category"),
    dataIndex: "subcategory",
    key: "subcategory",
    render: (text: { name: { [key: string]: string } }) =>
      text?.name[i18next.language],
  },
  {
    width: 100,
    title: i18next.t("main-org"),
    dataIndex: "mainorganization",
    key: "mainorganization",
    render: (text: { name: string }) => text.name,
  },
  {
    width: 60,
    align: "center",
    title: i18next.t("region"),
    dataIndex: "region",
    key: "region",
    render: (text: { name: { [key: string]: string } }) =>
      text?.name[i18next.language],
  },
  {
    width: 60,
    align: "center",
    title: i18next.t("city"),
    dataIndex: "city",
    key: "city",
    render: (text: { name: { [key: string]: string } }) =>
      text?.name[i18next.language],
  },
  {
    width: 60,
    align: "center",
    title: i18next.t("district"),
    dataIndex: "district",
    key: "district",
    render: (text: { name: { [key: string]: string } }) =>
      text?.name[i18next.language],
  },
  {
    width: 150,
    title: i18next.t("description"),
    dataIndex: "description",
    key: "description",
  },
];

export const phoneColumns: searchColType = [
  {
    title: i18next.t("secret"),
    dataIndex: "isSecret",
    key: "isSecret",
    width: 80,
    align: "center",
    render: (text: boolean) => {
      return text ? (
        <Tooltip title={i18next.t("allowed")}>
          <FaLock color="grey" />
        </Tooltip>
      ) : (
        <Tooltip title={i18next.t("not-allowed")}>
          <FaLockOpen color="grey" />
        </Tooltip>
      );
    },
  },
  {
    title: i18next.t("phone"),
    dataIndex: "phone",
    key: "phone",
    width: 200,
    align: "center",
  },
  {
    title: i18next.t("phone-type"),
    dataIndex: "phoneType",
    key: "phoneType",
    width: 200,
    align: "center",
  },
];

export const searchModalColumns: searchColType = [
  {
    title: i18next.t("name_uz"),
    dataIndex: "name",
    key: "name",
    render: (text: { [key: string]: string }) => text.uz,
  },
  {
    title: i18next.t("name_ru"),
    dataIndex: "name",
    key: "name",
    render: (text: { [key: string]: string }) => text.ru,
  },
];

export const statusForOrgs: { [key in 0 | 1 | -1 | 2]: string } = {
  0: i18next.t("check"),
  1: i18next.t("accepted"),
  "-1": i18next.t("deleted"),
  2: i18next.t("rejected"),
};

export const status: { [key: number]: string } = {
  0: i18next.t("deleted"),
  1: i18next.t("accepted"),
  "-1": i18next.t("deleted"),
};
export const usersTableColumns = [
  {
    title: i18next.t("full-name"),
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: i18next.t("role"),
    dataIndex: "role",
    key: "role",
    render: (text: { name: string }) =>
      text.name[0].toUpperCase() + text.name.slice(1),
  },
  {
    title: i18next.t("phone"),
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: i18next.t("user-number"),
    dataIndex: "numericId",
    key: "numericId",
  },
  {
    title: i18next.t("status"),
    dataIndex: "status",
    key: "status",
    render: (text: statusType) => setColorByStatus(status[text]),
  },
  {
    title: i18next.t("createdAt"),
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text: string) => dayjs(text).format("DD.MM.YYYY HH:mm:ss"),
  },
  {
    title: i18next.t("updatedAt"),
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (text: string) => dayjs(text).format("DD.MM.YYYY HH:mm:ss"),
  },
  {
    title: i18next.t("deletedAt"),
    dataIndex: "deletedAt",
    key: "deletedAt",
    render: (text: string) => dayjs(text).format("DD.MM.YYYY HH:mm:ss"),
  },
];

export const rolesTableColumns = [
  {
    title: i18next.t("name"),
    dataIndex: "name",
    key: "name",
    render: (text: string) => text[0].toUpperCase() + text.slice(1),
  },
  {
    title: i18next.t("status"),
    dataIndex: "status",
    key: "status",
    render: (text: statusType) => setColorByStatus(status[text]),
  },
  {
    title: i18next.t("createdAt"),
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text: string) => dayjs(text).format("DD.MM.YYYY HH:mm:ss"),
  },
  {
    title: i18next.t("updatedAt"),
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (text: string) => dayjs(text).format("DD.MM.YYYY HH:mm:ss"),
  },
  {
    title: i18next.t("deletedAt"),
    dataIndex: "deletedAt",
    key: "deletedAt",
    render: (text: string) => dayjs(text).format("DD.MM.YYYY HH:mm:ss"),
  },
];

export const unconfirmedTableColumns = [
  {
    title: i18next.t("code"),
    dataIndex: "inn",
    key: "inn",
    width: 100,
  },
  {
    title: i18next.t("abonent"),
    dataIndex: "name",
    key: "name",
  },
  {
    title: i18next.t("region"),
    dataIndex: "region",
    key: "region",
    render: (text: { name: { [key: string]: string } }) =>
      text?.name[i18next.language],
  },
  {
    title: i18next.t("city"),
    dataIndex: "city",
    key: "city",
    render: (text: { name: { [key: string]: string } }) =>
      text?.name[i18next.language],
  },
  {
    title: i18next.t("address"),
    dataIndex: "address",
    key: "address",
  },
  {
    title: i18next.t("employee"),
    dataIndex: "staffNumber",
    key: "staffNumber",
  },
  {
    title: i18next.t("type"),
    dataIndex: "method",
    key: "method",
    render: (text: string) => i18next.t(text),
  },
];

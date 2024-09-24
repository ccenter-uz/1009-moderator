import i18next from "i18next";

export const columnsForAddress: {
  title: string;
  dataIndex: string;
  key: string;
  align?: "left" | "center" | "right";
  render?: (t: string, record: { id: number | string }) => JSX.Element;
}[] = [
  {
    title: i18next.t("name"),
    dataIndex: "name",
    key: "name",
  },
  {
    title: i18next.t("old_name"),
    dataIndex: "old_name",
    key: "old_name",
  },
  {
    title: i18next.t("new_name"),
    dataIndex: "new_name",
    key: "new_name",
  },
  {
    title: i18next.t("region"),
    dataIndex: "region",
    key: "region",
  },
  {
    title: i18next.t("city"),
    dataIndex: "city",
    key: "city",
  },
  {
    title: i18next.t("district"),
    dataIndex: "district",
    key: "district",
  },
  {
    title: i18next.t("index"),
    dataIndex: "index",
    key: "index",
  },
  {
    title: i18next.t("update_date"),
    dataIndex: "updated_date",
    key: "updated_date",
  },
  {
    title: i18next.t("employee"),
    dataIndex: "employee",
    key: "employee",
  },
];

export const columnsForForBasicTable: {
  title: string;
  dataIndex: string;
  key: string;
}[] = [
  {
    title: i18next.t("name"),
    dataIndex: "name",
    key: "name",
  },
  {
    title: i18next.t("update_date"),
    dataIndex: "updated_date",
    key: "updated_date",
  },
  {
    title: i18next.t("employee"),
    dataIndex: "employee",
    key: "employee",
  },
];

export const columnsWithRegions: {
  title: string;
  dataIndex: string;
  key: string;
}[] = [
  {
    title: i18next.t("name"),
    dataIndex: "name",
    key: "name",
  },
  {
    title: i18next.t("region"),
    dataIndex: "region",
    key: "region",
  },
  {
    title: i18next.t("city"),
    dataIndex: "city",
    key: "city",
  },
  {
    title: i18next.t("update_date"),
    dataIndex: "updated_date",
    key: "updated_date",
  },
  {
    title: i18next.t("employee"),
    dataIndex: "employee",
    key: "employee",
  },
];

export const columnsWithAddressAndNamings: {
  title: string;
  dataIndex: string;
  key: string;
}[] = [
  {
    title: i18next.t("name"),
    dataIndex: "name",
    key: "name",
  },
  {
    title: i18next.t("old_name"),
    dataIndex: "old_name",
    key: "old_name",
  },
  {
    title: i18next.t("new_name"),
    dataIndex: "new_name",
    key: "new_name",
  },
  {
    title: i18next.t("region"),
    dataIndex: "region",
    key: "region",
  },
  {
    title: i18next.t("city"),
    dataIndex: "city",
    key: "city",
  },
  {
    title: i18next.t("index"),
    dataIndex: "index",
    key: "index",
  },
  {
    title: i18next.t("update_date"),
    dataIndex: "updated_date",
    key: "updated_date",
  },
  {
    title: i18next.t("employee"),
    dataIndex: "employee",
    key: "employee",
  },
];

export const columnsForCategories: {
  title: string;
  dataIndex: string;
  key: string;
}[] = [
  {
    title: i18next.t("name_ru"),
    dataIndex: "name_ru",
    key: "name_ru",
  },
  {
    title: i18next.t("name_uz"),
    dataIndex: "name_uz",
    key: "name_uz",
  },
  {
    title: i18next.t("name_uzcyrill"),
    dataIndex: "name_cyrill",
    key: "name_cyrill",
  },
  {
    title: i18next.t("update_date"),
    dataIndex: "updated_date",
    key: "updated_date",
  },
  {
    title: i18next.t("employee"),
    dataIndex: "employee",
    key: "employee",
  },
];

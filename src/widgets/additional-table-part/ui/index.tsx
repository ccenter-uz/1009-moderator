import { Flex, Table, Tooltip } from "antd";
import i18next from "i18next";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FaPen } from "react-icons/fa";
import { MdRestore } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";

import { AdditionalExpandPartUI } from "@features/additional-expand-part";
import { DeleteTableItemUI } from "@features/delete-table-item";

import {
  IAdditionalType,
  useDeleteAdditionalMutation,
  useRestoreAdditionalMutation,
} from "@entities/additional";

import {
  ADDITIONAL_EDIT_STEPS,
  setLocalStorage,
  STATUS,
} from "@shared/lib/helpers";
import { usePaginate } from "@shared/lib/hooks";
import { Can } from "@shared/ui";

type Props = {
  data: IAdditionalType[];
  loading: boolean;
};

export const AdditionalTablePartUI: FC<Props> = (props) => {
  const { data, loading } = props;
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const { page, pageSize, setPage, setPageSize, pageSizeOptions } = usePaginate(
    { pageName: "page", limitName: "limit" },
  );
  const [deleteAdditional] = useDeleteAdditionalMutation();
  const [restoreAdditional] = useRestoreAdditionalMutation();

  const onEditClick = (record: IAdditionalType) => {
    const firstStep = {
      "mention-ru": record?.mention?.ru,
      "mention-uz": record?.mention?.uz,
      "mention-cyrill": record?.mention?.cy,
      "warning-ru": record?.warning?.ru,
      "warning-uz": record?.warning?.uz,
      "warning-cyrill": record?.warning?.cy,
      "name-ru": record?.name?.ru,
      "name-uz": record?.name?.uz,
      "name-cyrill": record?.name?.cy,
    };
    const secondStep = record?.table;
    const thirdStep = record?.content;
    setLocalStorage(
      ADDITIONAL_EDIT_STEPS.ADDITIONAL_EDIT_FIRST_STEP,
      firstStep,
    );
    setLocalStorage(
      ADDITIONAL_EDIT_STEPS.ADDITIONAL_EDIT_SECOND_STEP,
      secondStep,
    );
    setLocalStorage(
      ADDITIONAL_EDIT_STEPS.ADDITIONAL_EDIT_THIRD_STEP,
      thirdStep,
    );
  };

  const columns = [
    {
      title: t("title"),
      dataIndex: "name",
      key: "name",
      render: (text: { [key: string]: string }) => text[i18next.language],
    },
    {
      title: t("action"),
      dataIndex: "action",
      key: "action",
      render: (_: unknown, record: IAdditionalType) => {
        if (record.status === STATUS.ACTIVE) {
          return (
            <Flex align="center" gap={5}>
              <Can i="update" a="additional">
                <Tooltip title={t("edit")}>
                  <Link
                    onClick={() => onEditClick(record)}
                    to={`/additional/edit/${record?.id}`}
                    state={{
                      category: searchParams.get("additionalCategoryId"),
                    }}
                  >
                    <FaPen cursor={"pointer"} color="grey" title={t("edit")} />
                  </Link>
                </Tooltip>
              </Can>

              <Can i="delete" a="additional">
                <Tooltip title={t("delete")}>
                  <DeleteTableItemUI
                    fetch={() => deleteAdditional(record.id)}
                  />
                </Tooltip>
              </Can>
            </Flex>
          );
        } else {
          return (
            <Can i="update" a="additional">
              <Flex align="center">
                <Tooltip title={t("restore")}>
                  <MdRestore
                    color="orange"
                    cursor={"pointer"}
                    fontSize={18}
                    onClick={() => restoreAdditional(record.id)}
                  />
                </Tooltip>
              </Flex>
            </Can>
          );
        }
      },
    },
  ];

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      bordered
      size="small"
      pagination={{
        current: page,
        pageSize: pageSize,
        pageSizeOptions: pageSizeOptions,
        showSizeChanger: true,
        onChange: (page, pageSize) => {
          setPage(page);
          setPageSize(pageSize);
        },
      }}
      expandable={{
        expandedRowRender: (record) => (
          <AdditionalExpandPartUI record={record} />
        ),
      }}
    />
  );
};

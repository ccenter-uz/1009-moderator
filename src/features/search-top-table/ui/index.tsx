import { Table, Flex, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import i18next from "i18next";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEnvelope, FaPencilAlt } from "react-icons/fa";
import { MdRestore } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { DeleteTableItemUI } from "@features/delete-table-item";

import {
  useDeleteOrganizationMutation,
  useRestoreOrganizationMutation,
} from "@entities/organization";

import {
  AntDesignSwal,
  clearEditStepStorage,
  getEditingStepStorageValues,
  handleEditLocalDatas,
  phoneColumns,
  setColorByStatus,
  setLocalStorage,
  statusForOrgs,
  statusType,
  STEPS_EDIT_DATA,
  STEPS_ENUM,
} from "@shared/lib/helpers";
import { useDisclosure, usePaginate } from "@shared/lib/hooks";
import { Can } from "@shared/ui";

import { TAttr, TPhone, TSelectedData } from "../model/types";

import { SMSModal } from "./modal";

type Props = {
  data: { status: number; id: number | string }[] | [];
  setAttrData: (data: TAttr[]) => void;
  phonesData: TPhone[];
  totalItems: number;
  isLoading?: boolean;
};

export const SearchTopTable: FC<Props> = (props) => {
  const { data, totalItems, isLoading, setAttrData, phonesData } = props;
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { page, pageSize, setPage, setPageSize } = usePaginate({
    pageName: "page",
    limitName: "limit",
  });
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState<null | TSelectedData>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number>(0);
  const [deleteOrganization] = useDeleteOrganizationMutation();
  const [restoreOrganization] = useRestoreOrganizationMutation();

  const checkExistId = (record: { id: number | string; status: number }) => {
    const { editingId, firstStepData } = getEditingStepStorageValues();

    if (editingId && Number(record.id) !== Number(editingId)) {
      AntDesignSwal.fire({
        icon: "warning",
        title: t("oops"),
        text: `${t("you-were-editing")} ${firstStepData?.name}, ${t(
          "do-you-want-to-continue-or-reset-before-data",
        )} ${firstStepData?.name} ?`,
        showCancelButton: true,
        confirmButtonColor: "#1677ff",
        cancelButtonColor: "crimson",
        confirmButtonText: t("continue"),
        cancelButtonText: t("reset"),
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/orgs/edit/${editingId}`, { replace: true });
        } else if (
          !result.isConfirmed &&
          result.isDismissed &&
          !!result.dismiss
        ) {
          clearEditStepStorage();
          setLocalStorage(STEPS_EDIT_DATA.CURRENT, STEPS_ENUM.firstStep);
          handleEditLocalDatas(record);
          navigate(`/orgs/edit/${record.id}`);
        }
      });
    } else {
      handleEditLocalDatas(record);
      navigate(`/orgs/edit/${record.id}`);
    }
  };

  const handleDelete = async (id: number | string) => {
    const result = await AntDesignSwal.fire({
      input: "textarea",
      inputLabel: t("delete-reason"),
      inputPlaceholder: t("tell-about-reason"),
      inputAttributes: {
        "aria-label": t("tell-about-reason"),
      },
      showCancelButton: true,
    });

    if (result.isConfirmed && result.value) {
      const params = {
        id,
        deleteReason: result.value,
      };

      await deleteOrganization(params);
    }
  };

  const columns = [
    {
      title: t("code"),
      dataIndex: "inn",
      key: "inn",
    },
    {
      title: t("abonent"),
      dataIndex: "name",
      key: "name",
      render: (text: string) => <p style={{ margin: 0 }}>{text}</p>,
    },
    {
      title: t("sms"),
      dataIndex: "sms",
      key: "sms",
      align: "center",
      render: (_: string, record: TSelectedData) => (
        <FaEnvelope
          color="#4e9eff"
          cursor={"pointer"}
          title={t("sms")}
          onClick={() => {
            onOpen(),
              setSelectedRowKeys(Number(record.id)),
              setSelectedData(record);
          }}
        />
      ),
    },
    {
      title: t("address"),
      dataIndex: "street",
      key: "street",
      render: (text: { name: Record<string, string> }) =>
        text?.name[i18next.language as keyof typeof text.name],
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text: statusType) => (
        <Flex justify="center">{setColorByStatus(statusForOrgs[text])}</Flex>
      ),
    },
    {
      title: t("action"),
      key: "action",
      dataIndex: "action",
      render: (_: string, record: { status: number; id: number | string }) => {
        if (record.status === 1) {
          return (
            <Flex justify="center" align="center" gap={8}>
              <Can i="update">
                <FaPencilAlt
                  onClick={() => checkExistId(record)}
                  color="grey"
                  fontSize={16}
                  cursor={"pointer"}
                  title={t("edit")}
                />
              </Can>
              <Can i="delete">
                <DeleteTableItemUI fetch={() => handleDelete(record.id)} />
              </Can>
            </Flex>
          );
        } else if (record.status === -1) {
          return (
            <Tooltip title={t("restore")}>
              <MdRestore
                color="grey"
                cursor={"pointer"}
                size={20}
                onClick={() => restoreOrganization(record.id)}
              />
            </Tooltip>
          );
        }
      },
    },
  ];

  return (
    <Flex align={"flex-start"} style={{ width: "100%" }} wrap>
      <div
        style={{
          width: "65%",
          resize: "horizontal",
          overflow: "auto",
          border: "1px solid lightgrey",
        }}
      >
        <Table
          loading={isLoading}
          columns={columns as ColumnsType<{ id: number | string }>}
          dataSource={data}
          scroll={{ y: 55 * 5 }}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: totalItems,
            showTotal(total, range) {
              return `${range[0]}-${range[1]} из ${total} элементов`;
            },
            showSizeChanger: true,
            onShowSizeChange: (current, size) => setPageSize(size),
            onChange: (current) => setPage(current),
          }}
          bordered
          onRow={(row: { id: number | string }) => ({
            onClick: () => {
              setSelectedRowKeys(Number(row.id)), setAttrData([row as TAttr]);
            },
          })}
          rowClassName={(row) =>
            row.id === selectedRowKeys ? "selected-row" : ""
          }
        />
      </div>
      <div
        style={{
          flex: 1,
          overflow: "auto",
          border: "1px solid lightgrey",
        }}
      >
        <Table
          loading={isLoading}
          columns={phoneColumns}
          dataSource={phonesData}
          bordered
          pagination={false}
          scroll={{ y: 55 * 5 }}
        />
      </div>
      {/* SMS */}
      <SMSModal
        open={isOpen}
        onClose={onClose}
        data={selectedData}
        title={t("abonent")}
      />
    </Flex>
  );
};

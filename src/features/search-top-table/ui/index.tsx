import { Table, Flex, Tooltip } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import i18next from "i18next";
import { Dispatch, FC, Fragment, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaEnvelope, FaPencilAlt } from "react-icons/fa";
import { MdRestore } from "react-icons/md";
import { useNavigate, useOutletContext } from "react-router-dom";

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
  STEPS_EDIT_KEYS,
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

const recordNames: Record<string, { text: string }> = {
  region: {
    text: "reg.",
  },
  city: {
    text: "",
  },
  district: {
    text: "dist.",
  },
  village: {
    text: "vill.",
  },
  street: {
    text: "str.",
  },
  kvartal: {
    text: "kv-l.",
  },
  avenue: {
    text: "ave.",
  },
  area: {
    text: "are.",
  },
  home: {
    text: "h.",
  },
};

export const returnAddressColumnData = (record: AnyObject) => {
  if (!record) return;

  return (
    <p>
      {Object.keys(recordNames).map((name, index) => {
        if (["kvartal", "home"].includes(name)) {
          return (
            record[name] && (
              <Fragment key={name}>
                <span
                  style={{
                    fontWeight: "500",
                    marginLeft: index !== 0 ? 5 : 0,
                    marginRight: 2,
                  }}
                  key={name}
                >
                  {i18next.t(recordNames[name].text)}
                </span>
                <span>{record[name]}</span>,
              </Fragment>
            )
          );
        }
        return (
          record[name]?.name[i18next.language] && (
            <Fragment key={name}>
              <span
                style={{
                  fontWeight: "500",
                  marginLeft: index !== 0 ? 5 : 0,
                  marginRight: 2,
                }}
                key={name}
              >
                {i18next.t(recordNames[name].text)}
              </span>
              <span>{record[name]?.name[i18next.language]},</span>
            </Fragment>
          )
        );
      })}
    </p>
  );
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
  const { setEditId } = useOutletContext<{
    setEditId: Dispatch<SetStateAction<number | string>>;
  }>();

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
          setEditId(editingId);
          navigate(`/orgs/edit/${editingId}`, { replace: true });
        } else if (
          !result.isConfirmed &&
          result.isDismissed &&
          !!result.dismiss
        ) {
          clearEditStepStorage();
          setLocalStorage(STEPS_EDIT_KEYS.CURRENT, STEPS_ENUM.firstStep);
          handleEditLocalDatas(record);
          setEditId(record.id);
          navigate(`/orgs/edit/${record.id}`);
        }
      });
    } else {
      handleEditLocalDatas(record);
      setEditId(record.id);
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
      width: "10%",
      title: t("code"),
      dataIndex: "inn",
      key: "inn",
    },
    {
      width: "20%",
      title: t("abonent"),
      dataIndex: "name",
      key: "name",
      render: (text: string) => <p style={{ margin: 0 }}>{text}</p>,
    },
    {
      width: "5%",
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
      width: "40%",
      title: t("address"),
      dataIndex: "address",
      key: "address",
      render: (_: string, record: AnyObject) => returnAddressColumnData(record),
    },
    {
      width: "10%",
      title: t("status"),
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text: statusType) => (
        <Flex justify="center">{setColorByStatus(statusForOrgs[text])}</Flex>
      ),
    },
    {
      width: "10%",
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
          minWidth: "40%",
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
          minWidth: "25rem",
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

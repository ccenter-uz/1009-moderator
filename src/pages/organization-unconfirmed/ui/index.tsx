import { Button, Flex, Table, Tooltip } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FaCheck, FaPen } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";

import { BasicSearchPartUI } from "@features/basic-search-part";

import {
  useCheckOrganizationMutation,
  useGetUnconfirmedOrganizationsQuery,
} from "@entities/organization";

import {
  AntDesignSwal,
  clearEditStepStorage,
  getEditingStepStorageValues,
  handleEditLocalDatas,
  returnAllParams,
  setLocalStorage,
  STEPS_EDIT_DATA,
  STEPS_ENUM,
  unconfirmedTableColumns,
} from "@shared/lib/helpers";
import { usePaginate } from "@shared/lib/hooks";

enum TYPE_AND_STATUS {
  TYPE_CONFIRM = "confirm",
  TYPE_REJECT = "reject",
  STATUS_CONFIRMED = 1,
  STATUS_REJECTED = 2,
}

export const OrgUnconfirmedPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [_, setSearchParams] = useSearchParams();
  const { page, pageSize, pageSizeOptions, setPage, setPageSize } = usePaginate(
    { pageName: "page", limitName: "limit" },
  );
  const { data, isLoading } = useGetUnconfirmedOrganizationsQuery({
    ...returnAllParams(),
  });
  const [checkOrganization] = useCheckOrganizationMutation();

  const handleCheckOrganization = (
    id: number,
    type: string,
    description?: string,
  ) => {
    if (type === TYPE_AND_STATUS.TYPE_CONFIRM) {
      return checkOrganization({
        id,
        status: TYPE_AND_STATUS.STATUS_CONFIRMED,
      });
    }
    if (type === TYPE_AND_STATUS.TYPE_REJECT) {
      return checkOrganization({
        id,
        status: TYPE_AND_STATUS.STATUS_REJECTED,
        description,
      });
    }
  };

  const checkExistId = (record: AnyObject) => {
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

  const handleReject = async (id: number) => {
    const result = await AntDesignSwal.fire({
      input: "textarea",
      inputLabel: t("reject-reason"),
      inputPlaceholder: t("tell-about-reason"),
      inputAttributes: {
        "aria-label": t("tell-about-reason"),
      },
      showCancelButton: true,
    });

    if (result.isConfirmed && result.value) {
      handleCheckOrganization(id, TYPE_AND_STATUS.TYPE_REJECT, result.value);
    }
  };

  const columns = [
    ...unconfirmedTableColumns,
    {
      title: t("actions"),
      dataIndex: "actions",
      key: "actions",
      width: 100,
      render: (_: string, record: { id: number }) => {
        return (
          <Flex align="center" gap={10}>
            <Tooltip title={t("edit")}>
              <Button
                onClick={() => checkExistId(record)}
                style={{
                  color: "grey",
                  borderColor: "grey",
                }}
                icon={<FaPen />}
              />
            </Tooltip>
            <Tooltip title={t("reject")}>
              <Button
                onClick={() => {
                  handleReject(record.id);
                }}
                style={{
                  color: "crimson",
                  borderColor: "crimson",
                }}
                icon={<IoClose size={22} />}
              />
            </Tooltip>
            <Tooltip title={t("confirm")}>
              <Button
                onClick={() =>
                  handleCheckOrganization(
                    record.id,
                    TYPE_AND_STATUS.TYPE_CONFIRM,
                  )
                }
                style={{ color: "#1677FF", borderColor: "#1677FF" }}
                icon={<FaCheck />}
              />
            </Tooltip>
          </Flex>
        );
      },
    },
  ];

  const handleSearch = ({ search }: { search: string }) => {
    const prevParams = returnAllParams();
    setSearchParams({
      ...prevParams,
      search,
    });
  };

  return (
    <>
      <h2>{t("unconfirmed")}</h2>
      <Flex vertical gap={16}>
        <BasicSearchPartUI
          handleSearch={handleSearch}
          isFilterByStatusRequired={false}
        />
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={data?.data || []}
          size="small"
          bordered
          pagination={{
            current: page,
            pageSize: pageSize,
            total: 0,
            showTotal: (total) => `${total} ${t("piece")}`,
            showSizeChanger: true,
            pageSizeOptions: pageSizeOptions,
            onShowSizeChange: (current, size) => {
              setPageSize(size);
            },
            onChange: (current) => {
              setPage(current);
            },
          }}
        />
      </Flex>
    </>
  );
};

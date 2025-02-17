import { Button, Flex, Select, Table, Tooltip } from "antd";
import { FC, useState } from "react";
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
  CreatedByEnum,
  getEditingStepStorageValues,
  handleEditLocalDatas,
  notificationResponse,
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
  const params = returnAllParams();
  const [createdBy, setCreatedBy] = useState<CreatedByEnum>(
    (params.createdBy as CreatedByEnum) || CreatedByEnum.All,
  );

  const handleCheckOrganization = (
    organizationId: number,
    type: string,
    description?: string,
  ) => {
    if (type === TYPE_AND_STATUS.TYPE_CONFIRM) {
      return checkOrganization({
        organizationId,
        status: TYPE_AND_STATUS.STATUS_CONFIRMED,
      }).then((res) => {
        notificationResponse(res);
      });
    }
    if (type === TYPE_AND_STATUS.TYPE_REJECT) {
      return checkOrganization({
        organizationId,
        status: TYPE_AND_STATUS.STATUS_REJECTED,
        description,
      }).then((res) => {
        notificationResponse(res);
      });
    }
  };

  const checkExistId = (record: { organizationId: number }) => {
    const { editingId, firstStepData } = getEditingStepStorageValues();

    if (editingId && Number(record.organizationId) !== Number(editingId)) {
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
          navigate(`/orgs/edit/${record.organizationId}`);
        }
      });
    } else {
      handleEditLocalDatas(record);
      navigate(`/orgs/edit/${record.organizationId}`);
    }
  };

  const handleReject = async (organizationId: number) => {
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
      handleCheckOrganization(
        organizationId,
        TYPE_AND_STATUS.TYPE_REJECT,
        result.value,
      );
    }
  };

  const columns = [
    ...unconfirmedTableColumns,
    {
      title: t("actions"),
      dataIndex: "actions",
      key: "actions",
      width: 100,
      render: (_: string, record: { organizationId: number }) => {
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
                  handleReject(record.organizationId);
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
                    record.organizationId,
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
    setSearchParams({
      ...params,
      search: search || "",
      createdBy: String(createdBy),
    });
  };

  const handleReset = () => {
    const prevParams = returnAllParams();
    delete prevParams.search;
    delete prevParams.createdBy;
    setCreatedBy(CreatedByEnum.All);
    setSearchParams(prevParams);
  };

  return (
    <>
      <h2>{t("unconfirmed")}</h2>
      <Flex vertical gap={16}>
        <BasicSearchPartUI
          handleSearch={handleSearch}
          handleReset={handleReset}
          hasFilterByStatus={false}
          additionalSearch={
            <Flex align="center" gap={8} flex={0.3}>
              <label htmlFor="createdBy">{t("createdBy")}</label>
              <Select
                value={createdBy}
                style={{ width: "100%" }}
                onSelect={(value) => setCreatedBy(value)}
                options={[
                  {
                    id: 0,
                    label: t("all"),
                    value: CreatedByEnum.All,
                  },
                  {
                    id: 1,
                    label: t("billing"),
                    value: CreatedByEnum.Billing,
                  },
                  {
                    id: 2,
                    label: t("client"),
                    value: CreatedByEnum.Client,
                  },
                  {
                    id: 3,
                    label: t("operator"),
                    value: CreatedByEnum.Operator,
                  },
                ]}
                placeholder={t("createdBy")}
                allowClear
              />
            </Flex>
          }
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
            total: data?.total,
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

import { Flex, Select, Tooltip } from "antd";
import i18next from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPencilAlt } from "react-icons/fa";
import { MdRestore } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";

import { BasicSearchPartUI } from "@features/basic-search-part";
import { DeleteTableItemUI } from "@features/delete-table-item";

import {
  useDeleteOrganizationMutation,
  useGetMyOrganizationsQuery,
  useRestoreOrganizationMutation,
} from "@entities/organization";

import {
  AntDesignSwal,
  clearEditStepStorage,
  columnsForMyOrganizations,
  getEditingStepStorageValues,
  handleEditLocalDatas,
  returnAllParams,
  setLocalStorage,
  STEPS_EDIT_DATA,
  STEPS_ENUM,
} from "@shared/lib/helpers";
import { ManageWrapperBox } from "@shared/ui";

const statusOptions = [
  {
    value: 3,
    label: i18next.t("all"),
  },
  { value: -1, label: i18next.t("deleted") },
  { value: 0, label: i18next.t("check") },
  { value: 1, label: i18next.t("accepted") },
  { value: 2, label: i18next.t("rejected") },
];

export const OrganizationWaitingsPage = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetMyOrganizationsQuery({
    ...returnAllParams(),
  });
  const [deleteOrganization] = useDeleteOrganizationMutation();
  const [restoreOrganization] = useRestoreOrganizationMutation();
  const navigate = useNavigate();
  const [_, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState<string>(() => {
    const params = returnAllParams();
    return params.status || "3";
  });

  const checkExistId = (record: { id: number }) => {
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
  const handleDelete = async (id: number) => {
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
    ...columnsForMyOrganizations,
    {
      width: 80,
      title: t("action"),
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (_: string, record: { status: number; id: number }) => {
        if (record.status !== -1) {
          return (
            <Flex justify="center" align="center" gap={8}>
              <FaPencilAlt
                onClick={() => checkExistId(record)}
                color="grey"
                fontSize={16}
                cursor={"pointer"}
                title={t("edit")}
              />
              <DeleteTableItemUI fetch={() => handleDelete(record.id)} />
            </Flex>
          );
        } else {
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

  const onSearch = ({ search }: { search: string }) => {
    const params = returnAllParams();
    if (status === "3") {
      delete params.status;
      setSearchParams({
        ...params,
        search: search || "",
      });
    } else {
      setSearchParams({
        ...params,
        search: search || "",
        status,
      });
    }
  };
  const handleReset = () => {
    setSearchParams({
      page: "1",
      limit: "10",
    });
    setStatus("3");
  };
  const handleSelectFilterByStatus = (value: number) =>
    setStatus(String(value));

  return (
    <div>
      <ManageWrapperBox
        loading={isLoading}
        title={t("organization-waitings")}
        searchPart={
          <BasicSearchPartUI
            additionalSearch={
              <Flex align="center" gap={8}>
                <label>{t("status")}</label>
                <Select
                  value={Number(status)}
                  style={{ width: 150 }}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "").localeCompare(optionB?.label ?? "")
                  }
                  onSelect={handleSelectFilterByStatus}
                  options={statusOptions}
                />
              </Flex>
            }
            handleSearch={onSearch}
            handleReset={handleReset}
            isFilterByStatusRequired={false}
          />
        }
        columns={columns}
        data={data?.data || []}
        totalItems={data?.total || 0}
      />
    </div>
  );
};

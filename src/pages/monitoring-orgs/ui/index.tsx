import { Flex, Popover, Select, Tooltip } from "antd";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdCallMade, MdCallReceived } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

import { BasicSearchPartUI } from "@features/basic-search-part";

import { useGetOrganizationMonitoringQuery } from "@entities/monitoring";
import { useGetRolesQuery, useGetUsersQuery } from "@entities/users";

import { renderLabelSelect, returnAllParams } from "@shared/lib/helpers";
import { ManageWrapperBox } from "@shared/ui";

const styles = {
  popoverStyle: {
    whiteSpace: "pre-wrap",
    height: "fit-content",
    maxHeight: "15.62rem",
    overflow: "auto",
    padding: "0.5rem 1rem",
  },
  select: {
    flex: 1,
    textOverflow: "ellipsis",
  },
};

export const MonitoringOrgsUI: FC = () => {
  const { t } = useTranslation();
  const previousParams = returnAllParams();
  const [_, setSearchParams] = useSearchParams();
  const [roleId, setRoleId] = useState<number | null | string>(
    Number(previousParams.roleId) || null,
  );
  const [userId, setUserId] = useState<number | null | string>(
    Number(previousParams.userId) || null,
  );
  const { data: roles, isLoading: isLoadingRoles } = useGetRolesQuery({
    ...previousParams,
    all: true,
  });
  const {
    data: users,
    isLoading: isLoadingUsers,
    refetch: refetchUsers,
  } = useGetUsersQuery({
    ...previousParams,
    all: true,
    roleId: roleId ? String(roleId) : "",
  });
  const { data, isLoading } = useGetOrganizationMonitoringQuery({
    ...previousParams,
    onlyOrgs: true,
  });

  const columns = [
    {
      title: t("organization"),
      dataIndex: "organizationName",
      key: "organizationName",
    },
    {
      title: t("employee"),
      dataIndex: "userFullName",
      key: "userFullName",
    },
    {
      title: t("role"),
      dataIndex: "userRole",
      key: "userRole",
      align: "center",
    },
    {
      title: t("method"),
      dataIndex: "method",
      key: "method",
      align: "center",
    },
    {
      width: 200,
      title: t("createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      width: 100,
      title: t("action"),
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_: string, record: { request: string; response: string }) => {
        return (
          <Flex justify="center" align="center" gap={8}>
            <Popover
              placement="bottomRight"
              trigger={"click"}
              content={<div style={styles.popoverStyle}>{record.request}</div>}
            >
              <Tooltip title={t("request")}>
                <MdCallMade cursor={"pointer"} />
              </Tooltip>
            </Popover>
            <Popover
              placement="bottomRight"
              trigger={"click"}
              content={<div style={styles.popoverStyle}>{record.response}</div>}
            >
              <Tooltip title={t("response")}>
                <MdCallReceived cursor={"pointer"} />
              </Tooltip>
            </Popover>
          </Flex>
        );
      },
    },
  ];

  const onSearch = ({ search }: { search: string }) => {
    const prevParams = returnAllParams();
    setSearchParams({
      ...prevParams,
      roleId: roleId ? String(roleId) : "",
      userId: userId ? String(userId) : "",
      search: search || "",
    });
  };

  const handleReset = () => {
    const prevParams = returnAllParams();
    delete prevParams.search;
    delete prevParams.roleId;
    delete prevParams.userId;
    setRoleId(null);
    setUserId(null);
    setSearchParams(prevParams);
  };

  useEffect(() => {
    refetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleId]);

  return (
    <div>
      <ManageWrapperBox
        loading={isLoading}
        title={t("monitoring-orgs")}
        searchPart={
          <BasicSearchPartUI
            additionalSearch={
              <Flex style={{ minWidth: "30%" }} align="center" gap={8}>
                <label htmlFor="roles">{t("role")}</label>
                <Select
                  allowClear
                  onClear={() => setRoleId(null)}
                  labelRender={renderLabelSelect}
                  loading={isLoadingRoles}
                  id="roles"
                  style={styles.select}
                  options={roles?.data.map((item: Record<string, string>) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                  placeholder={t("role")}
                  value={roleId}
                  onSelect={(value) => setRoleId(value)}
                />
                <label htmlFor="users">{t("users")}</label>
                <Select
                  allowClear
                  onClear={() => setUserId(null)}
                  labelRender={renderLabelSelect}
                  loading={isLoadingUsers}
                  id="users"
                  style={styles.select}
                  options={users?.data.map((item: Record<string, string>) => ({
                    value: item.id,
                    label: item.fullName,
                  }))}
                  placeholder={t("users")}
                  value={userId}
                  onSelect={(value) => setUserId(value)}
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

import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { BasicSearchPartUI } from "@features/basic-search-part";

import { useGetOrganizationMonitoringQuery } from "@entities/monitoring";

import { returnAllParams } from "@shared/lib/helpers";
import { ManageWrapperBox } from "@shared/ui";

export const MonitoringOrgsUI: FC = () => {
  const { t } = useTranslation();
  const [_, setSearchParams] = useSearchParams();
  const { data, isLoading } = useGetOrganizationMonitoringQuery({
    ...returnAllParams(),
  });

  const columns = [
    {
      title: t("name"),
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
      title: t("status"),
      dataIndex: "status",
      key: "status",
      align: "center",
    },
    {
      title: t("createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  const onSearch = ({ search }: { search: string }) => {
    const prevParams = returnAllParams();
    setSearchParams({
      ...prevParams,
      search,
    });
  };

  const handleReset = () => {
    const prevParams = returnAllParams();
    delete prevParams.search;
    setSearchParams(prevParams);
  };

  return (
    <div>
      <ManageWrapperBox
        loading={isLoading}
        title={t("monitoring-orgs")}
        searchPart={
          <BasicSearchPartUI
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

import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { BasicSearchPartUI } from "@features/basic-search-part";

import { useGetRolesQuery } from "@entities/users";

import { returnAllParams, rolesTableColumns } from "@shared/lib/helpers";
import { ManageWrapperBox } from "@shared/ui";

export const ManageRolesUI: FC = () => {
  const { t } = useTranslation();
  const [_, setSearchParams] = useSearchParams();
  const { data, isLoading } = useGetRolesQuery({ ...returnAllParams() });

  const onSearch = ({ search }: { search: string }) => {
    const prevParams = returnAllParams();
    setSearchParams({ ...prevParams, search });
  };

  return (
    <div>
      <ManageWrapperBox
        loading={isLoading}
        title={t("manage-roles")}
        searchPart={<BasicSearchPartUI handleSearch={onSearch} />}
        columns={rolesTableColumns}
        data={data?.data || []}
        totalItems={data?.total || 0}
      />
    </div>
  );
};

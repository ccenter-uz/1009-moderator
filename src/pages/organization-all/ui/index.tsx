import { FC } from "react";

import { SearchPartUI } from "@widgets/search-part";
import { SearchTableUI } from "@widgets/search-table";

import { useGetOrganizationsQuery } from "@entities/organization";

import { returnAllParams } from "@shared/lib/helpers";

export const OrgAllPage: FC = () => {
  const { data, isLoading } = useGetOrganizationsQuery(
    {
      ...returnAllParams(),
    },
    { refetchOnMountOrArgChange: true },
  );

  return (
    <div>
      <SearchPartUI />
      <SearchTableUI
        data={data?.data || []}
        totalItems={data?.total || 0}
        isLoading={isLoading}
      />
    </div>
  );
};

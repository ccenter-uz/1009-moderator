import { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { SearchPartUI } from "@widgets/search-part";
import { SearchTableUI } from "@widgets/search-table";

import { useGetOrganizationsQuery } from "@entities/organization";

import { returnAllParams } from "@shared/lib/helpers";

export const OrgAllPage: FC = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading, refetch } = useGetOrganizationsQuery({
    ...returnAllParams(),
  });

  useEffect(() => {
    refetch();
  }, [searchParams]);

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

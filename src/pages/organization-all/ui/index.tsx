import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { SearchPartUI } from "@widgets/search-part";
import { SearchTableUI } from "@widgets/search-table";

import { useGetOrganizationsQuery } from "@entities/organization";

import { returnAllParams } from "@shared/lib/helpers";

export const OrgAllPage: FC = () => {
  const [searchTableRef, setSearchTableRef] = useState<HTMLElement>();
  const [searchParams] = useSearchParams();
  const [searchValues, setSearchValues] = useState<{
    regionId: number;
    cityId: number;
  } | null>(null);
  const { data, isLoading, refetch } = useGetOrganizationsQuery({
    ...returnAllParams(),
    ...searchValues,
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, searchValues]);

  return (
    <div>
      <SearchPartUI
        setSearchValues={setSearchValues}
        searchTableRef={searchTableRef}
      />
      <SearchTableUI
        setRef={setSearchTableRef}
        data={data?.data || []}
        totalItems={data?.total || 0}
        isLoading={isLoading}
      />
    </div>
  );
};

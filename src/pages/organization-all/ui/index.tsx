import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { SearchPartUI, TSearchValues } from "@widgets/search-part";
import { SearchTableUI } from "@widgets/search-table";

import { useLazyGetOrganizationsQuery } from "@entities/organization";

import {
  getLocalStorage,
  getSessionStorage,
  omitUndefinedValues,
  returnAllParams,
  SEARCHPART_KEYS,
} from "@shared/lib/helpers";

export const OrgAllPage: FC = () => {
  const [searchTableRef, setSearchTableRef] = useState<HTMLElement>();
  const [searchParams] = useSearchParams();
  const [fromEdit, setFromEdit] = useState<boolean>(
    getSessionStorage(SEARCHPART_KEYS.FROM_EDIT_KEY) || false,
  );
  const [searchValues, setSearchValues] = useState<TSearchValues | null>(null);
  const [triggerOrg, { data: orgDatas, isLoading }] =
    useLazyGetOrganizationsQuery();
  const [data, setData] = useState<{
    data: {
      key: string;
      id: string;
      name: string;
      status: number;
      organizationId?: number;
    }[];
    total: number;
  } | null>(orgDatas || null);

  useEffect(() => {
    if (searchValues) {
      triggerOrg({
        ...returnAllParams(),
        ...omitUndefinedValues(searchValues),
      }).then((res) => {
        res.isSuccess && setData(res.data);
      });
    } else if (fromEdit) {
      triggerOrg({
        ...returnAllParams(),
        ...omitUndefinedValues({ regionId: getLocalStorage("regionId") }),
      }).then((res) => {
        res.isSuccess && setData(res.data);
      });
    } else {
      setData(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, searchValues, fromEdit]);

  return (
    <div>
      <SearchPartUI
        searchValues={searchValues}
        setFromEdit={setFromEdit}
        setSearchValues={setSearchValues}
        searchTableRef={searchTableRef}
      />
      <SearchTableUI
        setRef={setSearchTableRef}
        data={data?.data.map((item) => ({ ...item, key: item.id })) || []}
        totalItems={data?.total || 0}
        isLoading={isLoading}
      />
    </div>
  );
};

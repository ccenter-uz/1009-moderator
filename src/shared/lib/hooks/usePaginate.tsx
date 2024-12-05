import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { returnAllParams } from "../helpers";

const pageSizeOptions = [10, 20, 50, 100];

type propsType = {
  pageName: string;
  limitName: string;
};

export const usePaginate = (props: propsType) => {
  const { pageName, limitName } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    searchParams.has(pageName) ? Number(searchParams.get(pageName)) : 1,
  );
  const [pageSize, setPageSize] = useState<number>(
    searchParams.has(limitName) ? Number(searchParams.get(limitName)) : 10,
  );

  useEffect(() => {
    setSearchParams({
      ...returnAllParams(),
      [pageName]: `${page}`,
      [limitName]: `${pageSize}`,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
    pageSizeOptions,
  };
};

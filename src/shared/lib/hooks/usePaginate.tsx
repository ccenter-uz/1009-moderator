import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const pageSizeOptions = [10, 20, 50, 100];

type propsType = {
  pageName: string;
  limitName: string;
};

export const usePaginate = (props: propsType) => {
  const { pageName, limitName } = props;
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    searchParams.has(pageName) ? Number(searchParams.get(pageName)) : 1,
  );
  const [pageSize, setPageSize] = useState<number>(
    searchParams.has(limitName) ? Number(searchParams.get(limitName)) : 10,
  );

  useEffect(() => {
    if (searchParams.has(pageName) || searchParams.has(limitName)) {
      setPage(Number(searchParams.get(pageName)));
      setPageSize(Number(searchParams.get(limitName)));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
    pageSizeOptions,
  };
};

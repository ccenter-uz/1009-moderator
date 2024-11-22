import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const pageSizeOptions = [10, 20, 50, 100];

export const usePaginate = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    searchParams.has("page") ? Number(searchParams.get("page")) : 1,
  );
  const [pageSize, setPageSize] = useState<number>(
    searchParams.has("limit") ? Number(searchParams.get("limit")) : 10,
  );

  useEffect(() => {
    setSearchParams({
      page: `${page}`,
      limit: `${pageSize}`,
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

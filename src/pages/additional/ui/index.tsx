import { Divider } from "antd";
import { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { AdditionalTablePartUI } from "@widgets/additional-table-part";

import { AdditionalInputsCategoriesUI } from "@features/additional-inputs-categories";
import { AdditionalSearchAddUI } from "@features/additional-search-add";

import { useLazyGetAdditionalsQuery } from "@entities/additional";

import { returnAllParams } from "@shared/lib/helpers";

export const Additional: FC = () => {
  const [searchParams] = useSearchParams();
  const [triggerAdditional, { data: additionalData, isLoading }] =
    useLazyGetAdditionalsQuery();

  useEffect(() => {
    if (searchParams.get("additionalCategoryId")) {
      triggerAdditional({
        ...returnAllParams(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="additional">
      <AdditionalInputsCategoriesUI />
      <Divider />
      {searchParams.get("additionalCategoryId") && (
        <>
          <AdditionalSearchAddUI />
          <AdditionalTablePartUI
            data={additionalData?.data || []}
            loading={isLoading}
          />
        </>
      )}
    </div>
  );
};

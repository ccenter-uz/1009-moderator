import { Divider } from "antd";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { AdditionalTablePartUI } from "@widgets/additional-table-part";

import { AdditionalInputsCategoriesUI } from "@features/additional-inputs-categories";
import { AdditionalSearchAddUI } from "@features/additional-search-add";

import { RootState } from "@shared/types";

export const Additional: FC = () => {
  const [searchParams] = useSearchParams();
  const { data } = useSelector(
    ({ useAdditionalSlice }: RootState) => useAdditionalSlice,
  );

  useEffect(() => {
    if (searchParams.get("category") === "entertainment") {
      console.log("do not fetch untill selects subCategory");
    } else {
      console.log("fetch data when searchParams changes", searchParams);
    }

    // setData(mock);
  }, [searchParams]);

  return (
    <div className="additional">
      <AdditionalInputsCategoriesUI />
      <Divider />
      <AdditionalSearchAddUI />
      <AdditionalTablePartUI data={data} />
    </div>
  );
};

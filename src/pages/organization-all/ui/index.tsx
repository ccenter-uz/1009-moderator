import { FC } from "react";

import { SearchPartUI } from "@widgets/search-part";
import { SearchTableUI } from "@widgets/search-table";

export const OrgAllPage: FC = () => {
  return (
    <div>
      <SearchPartUI />
      <SearchTableUI />
    </div>
  );
};

import { FC } from "react";
import { useTranslation } from "react-i18next";

import { BasicSearchPartUI } from "@features/basic-search-part";

import { ManageWrapperBox } from "@shared/ui";

export const ManageUsersPage: FC = () => {
  const { t } = useTranslation();

  const onSearch = (search: string) => {
    console.log(search, "search");
  };

  const onAdd = () => {
    console.log("add");
  };

  return (
    <div>
      <ManageWrapperBox
        title={t("manage-users")}
        searchPart={<BasicSearchPartUI handleSearch={onSearch} />}
        add={onAdd}
        columns={[]}
        data={[]}
        totalItems={0}
      />
    </div>
  );
};

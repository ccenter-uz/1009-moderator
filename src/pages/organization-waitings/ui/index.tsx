import { useTranslation } from "react-i18next";

import { BasicSearchPartUI } from "@features/basic-search-part";

import { ManageWrapperBox } from "@shared/ui";

export const OrganizationWaitingsPage = () => {
  const { t } = useTranslation();

  const onSearch = ({ search }: { search: string }) => {
    console.log(search, "search");
  };

  return (
    <div>
      <ManageWrapperBox
        title={t("organization-waitings")}
        searchPart={<BasicSearchPartUI handleSearch={onSearch} />}
        columns={[]}
        data={[]}
        totalItems={0}
      />
    </div>
  );
};

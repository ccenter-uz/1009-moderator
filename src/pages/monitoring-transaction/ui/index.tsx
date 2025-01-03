import { FC } from "react";
import { useTranslation } from "react-i18next";

import { BasicSearchPartUI } from "@features/basic-search-part";

import { ManageWrapperBox } from "@shared/ui";

export const MonitoringTransactionUI: FC = () => {
  const { t } = useTranslation();

  const onSearch = ({ search }: { search: string }) => {
    console.log(search, "search");
  };

  return (
    <div>
      <ManageWrapperBox
        title={t("monitoring-transactions")}
        searchPart={<BasicSearchPartUI handleSearch={onSearch} />}
        columns={[]}
        data={[]}
        totalItems={0}
      />
    </div>
  );
};

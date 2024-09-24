import { FC } from "react";
import { useTranslation } from "react-i18next";

export const DashboardPage: FC = () => {
  const { t } = useTranslation();
  return <div>{t("main-page")}</div>;
};

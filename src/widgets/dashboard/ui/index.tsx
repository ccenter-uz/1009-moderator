import { FC } from "react";
import { useTranslation } from "react-i18next";

export const Dashboard: FC = () => {
  const { t } = useTranslation();
  return <div>{t("main-page")}</div>;
};

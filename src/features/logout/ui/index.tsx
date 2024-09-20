import { Button } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const LogoutUI: FC = () => {
  const { t } = useTranslation();
  return (
    <Button aria-label="Logout_btn" title="Выйти">
      {t("exit")}
    </Button>
  );
};

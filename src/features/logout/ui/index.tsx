import { Button } from "antd";
import { FC, startTransition } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { clearLocalStorage, deleteCookie } from "@shared/lib/helpers";

export const LogoutUI: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onLogout = () => {
    deleteCookie("access_token");
    clearLocalStorage();
    startTransition(() => {
      navigate("/login");
    });
  };

  return (
    <Button aria-label="Logout_btn" title={t("logout")} onClick={onLogout}>
      {t("exit")}
    </Button>
  );
};

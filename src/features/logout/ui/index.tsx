import { Button } from "antd";
import { FC, startTransition } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { clearLocalStorage } from "@shared/lib/helpers";

function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const cookieName = cookie.split("=")[0].trim();

    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

export const LogoutUI: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onLogout = () => {
    const clearStoragePromise = new Promise((resolve) => {
      window.localStorage.clear();
      deleteAllCookies();
      clearLocalStorage();
      resolve(true);
    });

    clearStoragePromise.then(() => {
      startTransition(() => {
        navigate("/login");
      });
    });
  };

  return (
    <Button aria-label="Logout_btn" title={t("logout")} onClick={onLogout}>
      {t("exit")}
    </Button>
  );
};

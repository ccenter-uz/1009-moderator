import { FC } from "react";
import { Navigate } from "react-router-dom";

import { getCookie, getLocalStorage } from "@shared/lib/helpers";

type Props = {
  children: JSX.Element;
};

export const AuthProtector: FC<Props> = ({ children }) => {
  const token = getCookie("access_token");
  const accessess = getLocalStorage("user");

  if (!token && !accessess) return <Navigate to="/login" />;

  return children;
};

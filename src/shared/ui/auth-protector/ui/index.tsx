import { FC } from "react";
import { Navigate } from "react-router-dom";

import { getCookie } from "@shared/lib/helpers";

type Props = {
  children: JSX.Element;
};

export const AuthProtector: FC<Props> = ({ children }) => {
  const token = getCookie("access_token");

  if (!token) return <Navigate to="/login" />;

  return children;
};

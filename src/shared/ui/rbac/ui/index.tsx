import { FC } from "react";

import { adminPermissionsByRole } from "@shared/lib/react-router";

type Props = {
  children: JSX.Element;
};

export const RBAC: FC<Props> = ({ children }) => {
  const accessByToken = adminPermissionsByRole;

  console.log(accessByToken, "accessByToken");

  return children;
};

import { AnyObject } from "antd/es/_util/type";
import { FC, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { getLocalStorage } from "@shared/lib/helpers";

type Props = {
  children: JSX.Element;
  i: string;
  a?: string;
};

export const Can: FC<Props> = (props) => {
  const { children, i, a } = props;
  const location = useLocation();
  const pathname = a ? a.split(" ") : location.pathname.split("/").slice(-2);
  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    const permissions = getLocalStorage("user")
      .permissions_pathname as AnyObject;
    if (pathname.length === 1) {
      const firstPath = permissions[pathname[0]];
      const secondPathWithMain = firstPath.main;
      const hasAction = Object.keys(secondPathWithMain).includes(i);
      setShow(hasAction);
    } else {
      const firstPath = permissions[pathname[0]];
      const secondPath = firstPath?.[pathname[1]];
      const hasAction = Object.keys(secondPath).includes(i);
      setShow(hasAction);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return show ? children : null;
};

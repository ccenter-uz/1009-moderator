import { Divider, Flex } from "antd";
import { FC } from "react";

import { Product } from "./product";
import { Service } from "./service";

export const ManageProductServicesPage: FC = () => {
  return (
    <Flex vertical>
      <div style={{ flex: 1 }}>
        <Product />
      </div>
      <Divider />
      <div style={{ flex: 1 }}>
        <Service />
      </div>
    </Flex>
  );
};

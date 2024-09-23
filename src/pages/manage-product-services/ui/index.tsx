import { Divider, Flex } from "antd";
import { FC, useState } from "react";

import { ItableBasicData } from "@shared/types";

import { Product } from "./product";
import { Service } from "./service";

export const ManageProductServicesPage: FC = () => {
  const [subData, setSubData] = useState<ItableBasicData[]>([]);

  return (
    <Flex vertical>
      <div style={{ flex: 1 }}>
        <Product setSubData={setSubData} />
      </div>
      <Divider />
      <div style={{ flex: 1 }}>
        <Service data={subData} />
      </div>
    </Flex>
  );
};

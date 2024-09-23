import { Flex, Divider } from "antd";
import { FC, useState } from "react";

import { ItableBasicData } from "@shared/types";

import { Category } from "./category";
import { SubCategory } from "./sub-category";

export const ManageCategoryPage: FC = () => {
  const [subData, setSubData] = useState<ItableBasicData[]>([]);

  return (
    <Flex vertical>
      <div style={{ flex: 1 }}>
        <Category setSubData={setSubData} />
      </div>
      <Divider />
      <div style={{ flex: 1 }}>
        <SubCategory data={subData} />
      </div>
    </Flex>
  );
};

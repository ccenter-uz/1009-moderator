import { Flex, Divider } from "antd";
import { FC } from "react";

import { Category } from "./category";
import { SubCategory } from "./sub-category";

export const ManageCategoryPage: FC = () => {
  return (
    <Flex vertical>
      <div style={{ flex: 1 }}>
        <Category />
      </div>
      <Divider />
      <div style={{ flex: 1 }}>
        <SubCategory />
      </div>
    </Flex>
  );
};

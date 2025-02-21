import { Table, Flex } from "antd";
import { FC } from "react";

import { attrColumns, subCategoryColumns } from "@shared/lib/helpers";

type TAttr = {
  id?: number;
  Phone: {
    phone: string;
    isSecret: boolean;
    PhoneTypes: { name: { [key: string]: string } };
  }[];

  ProductServices: {
    ProductServiceSubCategory: { name: { [key: string]: string } };
  }[];
};
type TSubCategory = {
  ProductServiceSubCategory: string;
};

type Props = {
  attrData: TAttr[];
  subCategoryData: TSubCategory[];
  isLoading: boolean;
};

export const SearchBottomTable: FC<Props> = (props) => {
  const { attrData, subCategoryData, isLoading } = props;

  return (
    <Flex align={"flex-start"} style={{ width: "100%", marginBottom: 30 }} wrap>
      <div
        style={{
          width: "65%",
          resize: "horizontal",
          overflow: "auto",
          border: "1px solid lightgrey",
        }}
      >
        <Table
          loading={isLoading}
          columns={attrColumns}
          dataSource={attrData}
          pagination={false}
          bordered
          scroll={{ y: 55 * 5 }}
        />
      </div>
      <div
        style={{
          flex: 1,
          overflow: "auto",
          border: "1px solid lightgrey",
        }}
      >
        <Table
          loading={isLoading}
          columns={subCategoryColumns}
          dataSource={subCategoryData}
          bordered
          pagination={false}
          scroll={{ y: 55 * 5 }}
        />
      </div>
    </Flex>
  );
};

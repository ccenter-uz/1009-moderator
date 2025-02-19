import { Row, Col, Table } from "antd";
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
    <Row align={"top"} gutter={[8, 8]} style={{ marginBottom: 30 }}>
      <Col span={16}>
        <Table
          loading={isLoading}
          columns={attrColumns}
          dataSource={attrData}
          pagination={false}
          bordered
          size="small"
        />
      </Col>
      <Col span={8}>
        <Table
          loading={isLoading}
          columns={subCategoryColumns}
          dataSource={subCategoryData}
          bordered
          size="small"
          pagination={false}
          scroll={{ y: 55 * 5 }}
        />
      </Col>
    </Row>
  );
};

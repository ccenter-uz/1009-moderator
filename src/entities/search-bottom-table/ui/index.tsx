import { Row, Col, Table } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { FC } from "react";

import { attrColumns, subCategoryColumns } from "@shared/lib/helpers";

type Props = {
  attrData: AnyObject[];
  subCategoryData: AnyObject[];
};

export const SearchBottomTable: FC<Props> = (props) => {
  const { attrData, subCategoryData } = props;

  return (
    <Row align={"top"} gutter={[8, 8]} style={{ marginBottom: 30 }}>
      <Col span={16}>
        <Table
          columns={attrColumns}
          dataSource={attrData}
          pagination={false}
          bordered
          size="small"
        />
      </Col>
      <Col span={8}>
        <Table
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

import { Row, Col, Table, Flex } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import { t } from "i18next";
import { FC, useState } from "react";
import { FaEnvelope, FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import { DeleteTableItemUI } from "@features/delete-table-item";

import { phoneColumns, setLocalStorage } from "@shared/lib/helpers";
import { usePaginate } from "@shared/lib/hooks";
import { Can } from "@shared/ui";

type Props = {
  data: AnyObject[];
  setAttrData: (data: AnyObject[]) => void;
  phonesData: AnyObject[];
  onOpen: () => void;
  totalItems: number;
  isLoading?: boolean;
};

export const SearchTopTable: FC<Props> = (props) => {
  const { data, totalItems, isLoading, setAttrData, phonesData, onOpen } =
    props;
  const { page, pageSize, setPage, setPageSize } = usePaginate({
    pageName: "page",
    limitName: "limit",
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<number>(0);

  const handleEditLocalDatas = (record: AnyObject) => {
    setLocalStorage("editingData", record);
  };

  const columns: ColumnsType<AnyObject> = [
    {
      title: t("code"),
      dataIndex: "inn",
      key: "inn",
      width: 80,
      align: "center",
    },
    {
      width: 400,
      title: t("abonent"),
      dataIndex: "name",
      key: "name",
      render: (text: string) => <p style={{ margin: 0 }}>{text}</p>,
    },
    {
      title: t("sms"),
      dataIndex: "sms",
      key: "sms",
      width: 20,
      align: "center",
      render: (text: string, record: AnyObject) => (
        <FaEnvelope
          color="#4e9eff"
          cursor={"pointer"}
          title={t("sms")}
          onClick={() => {
            onOpen(), setSelectedRowKeys(record.id);
          }}
        />
      ),
    },
    {
      width: 400,
      title: t("address"),
      dataIndex: "address",
      key: "address",
    },
    {
      width: 80,
      title: t("action"),
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (text: string, record: AnyObject) => (
        <Flex justify="center" align="center" gap={8}>
          <Can i="update">
            <Link to={{ pathname: `/orgs/edit/${record.id}` }}>
              <FaPencilAlt
                onClick={() => handleEditLocalDatas(record)}
                color="grey"
                fontSize={16}
                cursor={"pointer"}
                title={t("edit")}
              />
            </Link>
          </Can>
          <Can i="delete">
            <DeleteTableItemUI fetch={() => null} />
          </Can>
        </Flex>
      ),
    },
  ];

  return (
    <Row align={"top"} gutter={[8, 8]}>
      <Col span={16}>
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={data}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: totalItems,
            showTotal(total, range) {
              return `${range[0]}-${range[1]} из ${total} элементов`;
            },
            showSizeChanger: true,
            onShowSizeChange: (current, size) => setPageSize(size),
            onChange: (current) => setPage(current),
          }}
          bordered
          onRow={(row: AnyObject) => ({
            onClick: () => {
              setSelectedRowKeys(row.id), setAttrData([row]);
            },
          })}
          rowClassName={(row) =>
            row.id === selectedRowKeys ? "selected-row" : ""
          }
        />
      </Col>
      <Col span={8}>
        <Table
          columns={phoneColumns}
          dataSource={phonesData}
          bordered
          size="small"
          pagination={false}
          scroll={{ y: 55 * 5 }}
        />
      </Col>
    </Row>
  );
};

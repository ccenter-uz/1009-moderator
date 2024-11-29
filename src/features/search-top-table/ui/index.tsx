import { Row, Col, Table, Flex } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import { t } from "i18next";
import { FC, useState } from "react";
import { FaEnvelope, FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import { DeleteTableItemUI } from "@features/delete-table-item";

import { phoneColumns } from "@shared/lib/helpers";
import { usePaginate } from "@shared/lib/hooks";
import { Can } from "@shared/ui";

/**
 * SearchTopTable
 *
 * This component is used to display search result in the search widget
 * of the Manage pages.
 *
 * It has the following functionality:
 *
 * - Displays a table with columns and data
 * - Displays a DeleteTableItemUI component to delete selected rows
 * - Displays a button to open the modal to add or edit the data
 *
 * It takes the following props:
 *
 * - `data`: The data to display in the table. It should contain the following fields:
 *   - `code`: The code of the abonent.
 *   - `abonent`: The name of the abonent.
 *   - `sms`: The count of sms.
 * - `setAttrData`: A function to set the data of attributes.
 * - `phonesData`: The data of phones.
 * - `onOpen`: A function to open the modal to add or edit the data.
 *
 * @param {Object} props - The props of the component.
 * @param {AnyObject[]} props.data - The data to display in the table.
 * @param {Function} props.setAttrData - A function to set the data of attributes.
 * @param {AnyObject[]} props.phonesData - The data of phones.
 * @param {Function} props.onOpen - A function to open the modal to add or edit the data.
 *
 * @returns {JSX.Element} - The JSX element of the component.
 */

type Props = {
  data: AnyObject[];
  setAttrData: (data: AnyObject[]) => void;
  phonesData: AnyObject[];
  onOpen: () => void;
};

export const SearchTopTable: FC<Props> = (props) => {
  const { data, setAttrData, phonesData, onOpen } = props;
  const { page, pageSize, setPage, setPageSize } = usePaginate();
  const [selectedRowKeys, setSelectedRowKeys] = useState<number>(0);

  const columns: ColumnsType<AnyObject> = [
    {
      title: t("code"),
      dataIndex: "code",
      key: "code",
      width: 80,
      align: "center",
    },
    {
      width: 400,
      title: t("abonent"),
      dataIndex: "abonent",
      key: "abonent",
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
            <Link to={{ pathname: `/orgs/edit/${record.id}` }} state={record}>
              <FaPencilAlt
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
          columns={columns}
          dataSource={data}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: 0,
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

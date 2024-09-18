import { Flex, Popconfirm, Table } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { FC } from "react";
import "./style.css";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

import { usePaginate } from "@shared/hooks/usePaginate";

type Props = {
  title: string;
  searchPart: JSX.Element;
  addPart: JSX.Element;
  columns: AnyObject[];
  data: AnyObject[];
  onDelete: (id: number | string) => void;
  totalItems: number;
};

export const ManageWrapperBox: FC<Props> = (props) => {
  const {
    onDelete,
    title,
    searchPart,
    addPart,
    columns = [],
    data = [],
    totalItems = 0,
  } = props;
  const { page, pageSize, pageSizeOptions, setPage, setPageSize } =
    usePaginate();

  const overColumns = [
    ...columns,
    {
      flex: 0.5,
      title: "Действия",
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (t: string, record: { id: number | string }) => (
        <Flex justify="center" align="center" gap={8}>
          <FaPencilAlt
            color="grey"
            fontSize={16}
            cursor={"pointer"}
            title="Редактировать"
          />
          <Popconfirm
            title="Удалить?"
            onConfirm={() => onDelete(record?.id)}
            okText="Да"
            cancelText="Нет"
          >
            <FaTrashAlt
              color="crimson"
              fontSize={16}
              cursor={"pointer"}
              title="Удалить"
            />
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  return (
    <div className="manage-wrapper-box">
      <h1 className="manage-wrapper-box__title">{title}</h1>
      <div className="manage-wrapper-box__search">{searchPart}</div>
      <div className="manage-wrapper-box__add">{addPart}</div>
      <div className="manage-wrapper-box__table">
        <Table
          columns={overColumns}
          dataSource={data}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: totalItems,
            showTotal: (total) => `Total ${total} items`,
            showSizeChanger: true,
            pageSizeOptions: pageSizeOptions,
            onShowSizeChange: (current, size) => {
              setPageSize(size);
            },
            onChange: (current) => {
              setPage(current);
            },
          }}
        />
      </div>
    </div>
  );
};

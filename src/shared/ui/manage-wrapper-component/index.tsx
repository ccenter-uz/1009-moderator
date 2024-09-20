import { Button, Table } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { FC } from "react";
import "./style.css";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";

import { usePaginate } from "@shared/hooks/usePaginate";

type Props = {
  title: string;
  searchPart: JSX.Element;
  add: () => void;
  modalPart?: JSX.Element;
  columns: AnyObject[];
  data: AnyObject[];
  totalItems: number;
};

export const ManageWrapperBox: FC<Props> = (props) => {
  const {
    title,
    searchPart,
    modalPart,
    add,
    columns = [],
    data = [],
    totalItems = 0,
  } = props;
  const { page, pageSize, pageSizeOptions, setPage, setPageSize } =
    usePaginate();
  const { t } = useTranslation();

  return (
    <div className="manage-wrapper-box">
      <h1 className="manage-wrapper-box__title">{title}</h1>
      <div className="manage-wrapper-box__search">{searchPart}</div>
      <div className="manage-wrapper-box__add">
        <Button type="primary" icon={<FaPlus />} onClick={add}>
          {t("add")}
        </Button>
      </div>
      <div className="manage-wrapper-box__table">
        <Table
          size="small"
          columns={columns}
          dataSource={data}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: totalItems,
            showTotal: (total) => `${total} ${t("piece")}`,
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
      {modalPart}
    </div>
  );
};

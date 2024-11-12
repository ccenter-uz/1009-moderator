import { Flex, Table } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FaPen } from "react-icons/fa";

import { AdditionalExpandPartUI } from "@features/additional-expand-part";
import { DeleteTableItemUI } from "@features/delete-table-item";

type Props = {
  data: AnyObject[];
};

export const AdditionalTablePartUI: FC<Props> = (props) => {
  const { data } = props;
  const { t } = useTranslation();

  const columns = [
    {
      title: t("title"),
      dataIndex: "title",
      key: "title",
      render: (t: string, record: AnyObject) => record?.title?.ru,
    },
    {
      title: t("action"),
      dataIndex: "action",
      key: "action",
      render: (text: string, record: AnyObject) => (
        <Flex align="center" gap={5}>
          <FaPen cursor={"pointer"} color="grey" title={t("edit")} />
          <DeleteTableItemUI id={record?.id} href={"/delete"} />
        </Flex>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      size="small"
      expandable={{
        expandedRowRender: (record) => (
          <AdditionalExpandPartUI record={record} />
        ),
      }}
    />
  );
};

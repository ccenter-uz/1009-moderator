import { Flex, Table } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FaPen } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";

import { AdditionalExpandPartUI } from "@features/additional-expand-part";
import { DeleteTableItemUI } from "@features/delete-table-item";

import { ADDITIONAL_EDIT_STEPS, setLocalStorage } from "@shared/lib/helpers";

type Props = {
  data: AnyObject[];
};

export const AdditionalTablePartUI: FC<Props> = (props) => {
  const { data } = props;
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const onEditClick = (record: AnyObject) => {
    const firstStep = {
      "mention-ru": record?.mention?.ru,
      "mention-uz": record?.mention?.uz,
      "mention-cyrill": record?.mention?.cy,
      "warning-ru": record?.warning?.ru,
      "warning-uz": record?.warning?.uz,
      "warning-cyrill": record?.warning?.cy,
      "title-ru": record?.title?.ru,
      "title-uz": record?.title?.uz,
      "title-cyrill": record?.title?.cy,
    };
    const secondStep = record?.table;
    const thirdStep = record?.content;
    setLocalStorage(
      ADDITIONAL_EDIT_STEPS.ADDITIONAL_EDIT_FIRST_STEP,
      firstStep,
    );
    setLocalStorage(
      ADDITIONAL_EDIT_STEPS.ADDITIONAL_EDIT_SECOND_STEP,
      secondStep,
    );
    setLocalStorage(
      ADDITIONAL_EDIT_STEPS.ADDITIONAL_EDIT_THIRD_STEP,
      thirdStep,
    );
  };

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
          <Link
            onClick={() => onEditClick(record)}
            to={`/additional/edit/${record?.id}`}
            state={{
              category: searchParams.get("category"),
            }}
          >
            <FaPen cursor={"pointer"} color="grey" title={t("edit")} />
          </Link>
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

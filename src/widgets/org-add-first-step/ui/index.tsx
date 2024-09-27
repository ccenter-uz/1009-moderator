import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Popconfirm,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import { AnyObject } from "antd/es/_util/type";
import FormItemLabel from "antd/es/form/FormItemLabel";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaTrashAlt } from "react-icons/fa";

import { SingleInputWithModalUI } from "@shared/ui/single-input-with-modal";

type selectedDataType = {
  id: number | string;
  label: string;
  value: string;
  name: string;
};

export const OrgAddFirstStepUI: FC = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<selectedDataType[] | []>([]);
  const [selectOptions, setSelectOptions] = useState<selectedDataType[]>([
    {
      id: 1,
      label: "test",
      value: "test",
      name: "test",
    },
    {
      id: 2,
      label: "test2",
      value: "test2",
      name: "test2",
    },
  ]);
  const [data, setData] = useState<selectedDataType[]>([]);
  const columns = [
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("action"),
      dataIndex: "action",
      key: "action",
      render: (text: string, record: selectedDataType) => (
        <Popconfirm
          title={t("delete")}
          onConfirm={() => onDelete(record.id, record)}
          okText="Да"
          cancelText="Нет"
        >
          <FaTrashAlt
            color="crimson"
            fontSize={16}
            cursor={"pointer"}
            title={t("delete")}
          />
        </Popconfirm>
      ),
    },
  ];

  const onDelete = async (id: string | number, record: selectedDataType) => {
    setData(data.filter((item: AnyObject) => item.id !== id));
    setSelectOptions([...selectOptions, record]);
  };

  const addSubCategory = () => {
    const selectedIds = selected.map(
      (item: Pick<selectedDataType, "id">) => item.id,
    );
    setSelectOptions(
      selectOptions.filter(
        (item: Pick<selectedDataType, "id">) => !selectedIds.includes(item.id),
      ),
    );
    const uniqueData = data.filter((item) => !selectedIds.includes(item.id));
    setData([...uniqueData, ...selected]);
  };

  const onSelect = (value: string, option: selectedDataType | unknown) => {
    setSelected([...selected, option as selectedDataType]);
  };

  return (
    <>
      <Row justify={"space-between"} gutter={24}>
        <Col span={12}>
          <Form.Item name={"abonent"} label={t("abonent")}>
            <Input type="text" placeholder={t("abonent")} allowClear />
          </Form.Item>
          <Form.Item name={"org-name"} label={t("org-name")}>
            <Input type="text" placeholder={t("org-name")} allowClear />
          </Form.Item>
          <Form.Item name={"category"} label={t("category")}>
            <SingleInputWithModalUI
              value={""}
              label={""}
              dataFetcher={() => [{}]}
              columns={[]}
              searchHref={""}
            />
          </Form.Item>
          <Form.Item name={"sub-category"} label={t("sub-category")}>
            <SingleInputWithModalUI
              value={""}
              label={""}
              dataFetcher={() => [{}]}
              columns={[]}
              searchHref={""}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={"main-org"} label={t("main-org")}>
            <SingleInputWithModalUI
              value={""}
              label={""}
              dataFetcher={() => [{}]}
              columns={[]}
              searchHref={""}
            />
          </Form.Item>
          <Form.Item name={"secret"} label={t("Секрет")}>
            <Input type="text" placeholder={t("Секрет")} allowClear />
          </Form.Item>
        </Col>
      </Row>
      <Flex
        vertical
        gap={16}
        className="org-add-table-category-and-sub-category"
      >
        <Typography.Title aria-level={4} level={4} style={{ margin: 0 }}>
          {t("product-services")}
        </Typography.Title>
        <Row gutter={16} align={"middle"}>
          <Col span={11}>
            <Flex align="center" gap={8}>
              <label htmlFor="category-tu">{t("category-tu")}</label>
              <Select
                showSearch
                id="category-tu"
                onChange={onSelect}
                options={selectOptions}
                style={{ flex: 1 }}
              />
            </Flex>
          </Col>
          <Col span={11}>
            <Flex align="center" gap={8}>
              <label htmlFor="sub-category-tu">{t("sub-category-tu")}</label>
              <Select
                showSearch
                id="sub-category-tu"
                onChange={onSelect}
                options={selectOptions}
                style={{ flex: 1 }}
              />
            </Flex>
          </Col>
          <Col span={2}>
            <Button type="primary" onClick={addSubCategory}>
              {t("add")}
            </Button>
          </Col>
        </Row>

        <Table
          bordered
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ y: 300 }}
        />
      </Flex>
    </>
  );
};

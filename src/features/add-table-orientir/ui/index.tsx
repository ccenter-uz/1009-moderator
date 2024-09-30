import {
  Flex,
  Typography,
  Row,
  Col,
  Select,
  Button,
  Table,
  Popconfirm,
  Input,
} from "antd";
import { AnyObject } from "antd/es/_util/type";
import { t } from "i18next";
import { FC, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

export const AddTableOrientirUI: FC = () => {
  const [selectedNearbyCategory, setSelectedNearbyCategory] = useState<
    AnyObject[] | []
  >([]);
  const [selectedNearby, setSelectedNearby] = useState<AnyObject[] | []>([]);
  const [nearbyCategoryOptions, setNearbyCategoryOptions] = useState<
    AnyObject[]
  >([
    {
      id: 1,
      key: 1,
      label: "Категория ориентир 1",
      value: "nearby-category",
      "nearby-category": "Категория ориентир 1",
    },
    {
      id: 2,
      key: 2,
      label: "Категория ориентир 2",
      value: "nearby-category 2",
      "nearby-category": "Категория ориентир 2",
    },
  ]);
  const [nearbyOptions, setNearbyOptions] = useState<AnyObject[] | null>(null);
  const [data, setData] = useState<AnyObject[]>([]);
  const [description, setDescription] = useState<string>("");
  const columns = [
    {
      title: t("nearby-category"),
      dataIndex: "nearby-category",
      key: "nearby-category",
    },
    {
      title: t("nearby"),
      dataIndex: "nearby",
      key: "nearby",
    },
    {
      title: t("description"),
      dataIndex: "description",
      key: "description",
    },
    {
      title: t("action"),
      dataIndex: "action",
      key: "action",
      render: (text: string, record: AnyObject) => (
        <Popconfirm
          title={t("delete")}
          onConfirm={() => onDelete(record.id)}
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

  const onDelete = async (id: string | number) => {
    setData(data.filter((item: AnyObject) => item.id !== id));
  };

  const addSubCategory = () => {
    setData([
      ...data,
      {
        ...selectedNearbyCategory[0],
        ...selectedNearby[0],
        description,
      },
    ]);
    setSelectedNearby([]);
    setSelectedNearbyCategory([]);
    setDescription("");
  };

  const onSelectNearbyCategory = (
    value: string,
    option: AnyObject | unknown,
  ) => {
    setSelectedNearbyCategory([option as AnyObject]);
    if ((option as AnyObject).id === 1) {
      setNearbyOptions([
        {
          id: 1,
          key: 1,
          label: "Ориентир 1.1",
          value: "sub-category-tu 1.1",
          nearby: "Ориентир 1.1",
        },
        {
          id: 2,
          key: 2,
          label: "Ориентир 1.2",
          value: "nearby 1.2",
          nearby: "Ориентир 1.2",
        },
      ]);
    } else {
      setNearbyOptions([
        {
          id: 1,
          key: 1,
          label: "Ориентир 2.1",
          value: "nearby 2.1",
          nearby: "Ориентир 2.1",
        },
        {
          id: 2,
          key: 2,
          label: "Ориентир 2.2",
          value: "nearby 2.2",
          nearby: "Ориентир 2.2",
        },
      ]);
    }
  };

  const onSelectSubCategory = (value: string, option: AnyObject | unknown) => {
    setSelectedNearby([option as AnyObject]);
  };

  return (
    <Flex vertical gap={16}>
      <Typography.Title aria-level={4} level={4} style={{ margin: 0 }}>
        {t("nearby")}
      </Typography.Title>
      <Row gutter={16} align={"middle"}>
        <Col span={7}>
          <Flex align="center" gap={8}>
            <label htmlFor="nearby-category">{t("nearby-category")}</label>
            <Select
              showSearch
              id="nearby-category"
              value={selectedNearbyCategory[0]?.value}
              onChange={onSelectNearbyCategory}
              options={nearbyCategoryOptions}
              style={{ flex: 1 }}
            />
          </Flex>
        </Col>
        <Col span={7}>
          <Flex align="center" gap={8}>
            <label htmlFor="nearby">{t("nearby")}</label>
            <Select
              disabled={!nearbyOptions}
              showSearch
              id="nearby"
              value={selectedNearby[0]?.value}
              onChange={onSelectSubCategory}
              options={nearbyOptions ?? []}
              style={{ flex: 1 }}
            />
          </Flex>
        </Col>
        <Col span={7}>
          <Flex align="center" gap={8}>
            <label htmlFor="description">{t("description")}</label>
            <Input.TextArea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              disabled={!selectedNearbyCategory}
              id="description"
              style={{ flex: 1 }}
            />
          </Flex>
        </Col>
        <Col span={2}>
          <Button
            disabled={selectedNearby.length === 0}
            type="primary"
            onClick={addSubCategory}
          >
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
  );
};

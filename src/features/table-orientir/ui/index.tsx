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
import { useDispatch } from "react-redux";

type Props = {
  data: AnyObject[];
  setData: any;
};

// MOCKS
const mocks = {
  nearbyCategoryOptions: [
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
  ],
  nearbyOptions: [
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
  ],
  columns: [
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
  ],
};

export const TableOrientirUI: FC<Props> = (props) => {
  const { data, setData } = props;
  const dispatch = useDispatch();
  const [selectedNearby, setSelectedNearby] = useState<AnyObject[]>([]);
  const [selectedNearbyCategory, setSelectedNearbyCategory] = useState<
    AnyObject[]
  >([]);
  const [nearbyOptions, setNearbyOptions] = useState<AnyObject[]>([]);
  const [description, setDescription] = useState<string>("");
  const [nearbyCategoryOptions, setNearbyCategoryOptions] = useState<
    AnyObject[]
  >(mocks.nearbyCategoryOptions || []);
  const overColumns = [
    ...mocks.columns,
    {
      title: t("action"),
      dataIndex: "action",
      key: "action",
      render: (text: string, record: AnyObject) => (
        <Popconfirm
          title={t("delete")}
          onConfirm={() => onDelete(record?.colId)}
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
    const newData = data.filter((item: AnyObject) => item.colId !== id);
    dispatch(setData(newData));
  };

  const addSubCategory = () => {
    const newData = [
      ...data,
      {
        ...selectedNearbyCategory[0],
        ...selectedNearby[0],
        description,
        colId: Date.now(),
      },
    ];
    dispatch(setData(newData));

    setSelectedNearby([]);
    setSelectedNearbyCategory([]);
    setDescription("");
  };

  const onSelectNearbyCategory = (
    value: string,
    option: AnyObject | unknown,
  ) => {
    setSelectedNearbyCategory([option as AnyObject]);
    setNearbyOptions(mocks.nearbyOptions);
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
              disabled={nearbyOptions.length === 0}
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
              disabled={selectedNearbyCategory.length === 0}
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
        columns={overColumns}
        dataSource={data}
        pagination={false}
        scroll={{ y: 300 }}
      />
    </Flex>
  );
};

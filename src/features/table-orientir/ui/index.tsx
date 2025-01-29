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
import i18next, { t } from "i18next";
import { FC, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";

import {
  useGetNearbyCategoryQuery,
  useLazyGetNearbyQuery,
} from "@entities/nearby";

import { allActives, getLocalStorage } from "@shared/lib/helpers";

type Props = {
  data: AnyObject[];
  setData: any;
  type?: "edit";
};

export const TableOrientirUI: FC<Props> = (props) => {
  const { data, setData, type } = props;
  const localGetDataName =
    type === "edit" ? "firstStepDataEdit" : "firstStepData";
  const dispatch = useDispatch();
  const { data: nearbyCategoryOptions, isLoading: isLoadingNearbyCategory } =
    useGetNearbyCategoryQuery(allActives);
  const [triggerNearby, { data: nearbyOptions, isLoading: isLoadingNearby }] =
    useLazyGetNearbyQuery();
  const [selectedNearby, setSelectedNearby] = useState<AnyObject[]>([]);
  const [selectedNearbyCategory, setSelectedNearbyCategory] = useState<
    AnyObject[]
  >([]);
  const [description, setDescription] = useState<string>("");

  const columns = [
    {
      title: t("nearby-category"),
      dataIndex: "nearbyCategoryName",
      key: "nearbyCategoryName",
    },
    {
      title: t("nearby"),
      dataIndex: "nearbyName",
      key: "nearbyName",
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
    const newData = data.filter((item) => item.colId !== id);
    dispatch(setData(newData));
  };

  const addSubCategory = () => {
    const newData = [
      ...data,
      {
        ...selectedNearbyCategory[0],
        ...selectedNearby[0],
        description: description !== "" ? description : "-",
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
    option: { value: string | number; label: string },
  ) => {
    setSelectedNearbyCategory([
      { nearbyCategoryId: value, nearbyCategoryName: option.label },
    ]);

    triggerNearby({
      regionId: getLocalStorage(localGetDataName)?.regionId,
      cityId: getLocalStorage(localGetDataName)?.cityId,
      nearbyCategoryId: value,
      ...allActives,
    });
  };

  const onSelectSubCategory = (
    value: string,
    option: { value: string | number; label: string },
  ) => {
    setSelectedNearby([{ nearbyId: value, nearbyName: option.label }]);
  };

  return (
    <Flex vertical gap={16}>
      <Typography.Title aria-level={4} level={4} style={{ margin: 0 }}>
        {t("nearby")}
      </Typography.Title>
      <Row gutter={16} align={"middle"}>
        <Col span={7}>
          <Flex align="center" gap={8}>
            <label htmlFor="nearbyCategory">{t("nearby-category")}</label>
            <Select
              showSearch
              id="nearbyCategory"
              value={selectedNearbyCategory[0]?.nearbyCategoryId}
              onSelect={onSelectNearbyCategory}
              allowClear
              disabled={isLoadingNearbyCategory}
              options={
                nearbyCategoryOptions?.data.map((item: AnyObject) => ({
                  value: item.id,
                  label: item.name,
                })) || []
              }
              style={{ flex: 1 }}
            />
          </Flex>
        </Col>
        <Col span={7}>
          <Flex align="center" gap={8}>
            <label htmlFor="nearby">{t("nearby")}</label>
            <Select
              disabled={isLoadingNearby}
              showSearch
              id="nearby"
              value={selectedNearby[0]?.nearby}
              onSelect={onSelectSubCategory}
              allowClear
              options={
                nearbyOptions?.data.map((item: AnyObject) => ({
                  value: item.id,
                  label: item.name[i18next.language],
                })) || []
              }
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
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ y: 300 }}
      />
    </Flex>
  );
};

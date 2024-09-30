import {
  Popconfirm,
  Flex,
  Typography,
  Row,
  Col,
  Select,
  Input,
  Button,
  Table,
  Checkbox,
} from "antd";
import { AnyObject } from "antd/es/_util/type";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { t } from "i18next";
import { FC, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

export const OrgAddThirdStepUI: FC = () => {
  const [selectedPhoneType, setSelectedPhoneType] = useState<AnyObject[] | []>(
    [],
  );
  const [phoneTypeOptions, setPhoneTypeOptions] = useState<AnyObject[] | []>([
    {
      id: 1,
      key: 1,
      label: "Тип телефона 1",
      value: "phone-type 1",
      "phone-type": "Тип телефона 1",
    },
    {
      id: 2,
      key: 2,
      label: "Тип телефона 2",
      value: "phone-type 2",
      "phone-type": "Тип телефона 2",
    },
  ]);
  const [data, setData] = useState<AnyObject[]>([]);
  const [phone, setPhone] = useState<string>("");
  const columns = [
    {
      width: 80,
      title: t("secret"),
      dataIndex: "secret",
      key: "secret",
      render: (text: string, record: AnyObject) => (
        <Checkbox
          checked={!!text}
          onChange={(e: CheckboxChangeEvent) => onSecretCheck(e, record)}
        />
      ),
    },
    {
      title: t("phone-type"),
      dataIndex: "phone-type",
      key: "phone-type",
    },
    {
      title: t("phone"),
      dataIndex: "phone",
      key: "phone",
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

  const onSecretCheck = (e: CheckboxChangeEvent, record: AnyObject) => {
    const filteredData = data?.filter((item) => item.id === record.id);
    if (!filteredData) return null;

    filteredData[0].secret = e.target.checked;
    const filt = { ...data, ...filteredData[0] };

    setData([filt]);
  };

  const onDelete = async (id: string | number) => {
    setData(data.filter((item: AnyObject) => item.id !== id));
  };

  const addSubCategory = () => {
    setData([
      ...data,
      {
        ...selectedPhoneType[0],
        phone,
      },
    ]);
    setSelectedPhoneType([]);
    setPhone("");
  };

  const onSelectType = (value: string, option: AnyObject | unknown) => {
    setSelectedPhoneType([option as AnyObject]);
    console.log(option, "option");
  };

  return (
    <Flex vertical gap={16}>
      <Typography.Title aria-level={4} level={4} style={{ margin: 0 }}>
        {t("phone")}
      </Typography.Title>
      <Row gutter={16} align={"middle"}>
        <Col span={11}>
          <Flex align="center" gap={8}>
            <label htmlFor="phone-type">{t("phone-type")}</label>
            <Select
              showSearch
              id="phone-type"
              value={selectedPhoneType[0]?.value}
              onSelect={onSelectType}
              options={phoneTypeOptions}
              style={{ flex: 1 }}
            />
          </Flex>
        </Col>
        <Col span={11}>
          <Flex align="center" gap={8}>
            <label htmlFor="phone">{t("phone")}</label>
            <Input
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              disabled={!selectedPhoneType}
              id="phone"
              style={{ flex: 1 }}
              type="phone"
            />
          </Flex>
        </Col>
        <Col span={2}>
          <Button
            disabled={phone?.length < 11}
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

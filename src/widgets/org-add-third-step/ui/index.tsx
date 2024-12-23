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
  Form,
} from "antd";
import { AnyObject } from "antd/es/_util/type";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import i18next, { t } from "i18next";
import { FC, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { useGetPhoneTypeQuery } from "@entities/phone";

import { GET_ALL_ACTIVE_STATUS } from "@shared/lib/helpers";
import { RootState } from "@shared/types";

import { setData } from "../model/Slicer";

export const OrgAddThirdStepUI: FC = () => {
  const { data } = useSelector(
    ({ useAddOrgThirdStepSlice }: RootState) => useAddOrgThirdStepSlice,
  );
  const dispatch = useDispatch();
  const { data: phoneTypesData, isLoading: phoneTypesLoading } =
    useGetPhoneTypeQuery({
      all: GET_ALL_ACTIVE_STATUS.all,
      status: GET_ALL_ACTIVE_STATUS.active,
    });
  const [selectedPhoneType, setSelectedPhoneType] = useState<AnyObject[] | []>(
    [],
  );
  const [phone, setPhone] = useState<string>("");

  const columns = [
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
      width: 80,
      title: t("secret"),
      dataIndex: "isSecret",
      key: "isSecret",
      render: (text: string, record: AnyObject) => (
        <Checkbox
          checked={!!text}
          onChange={(e: CheckboxChangeEvent) => onSecretCheck(e, record)}
        />
      ),
    },
    {
      title: t("action"),
      dataIndex: "action",
      key: "action",
      render: (text: string, record: AnyObject) => (
        <Popconfirm
          title={t("delete")}
          onConfirm={() => onDelete(record?.phone)}
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
    const filteredData = data
      ?.filter((item: { phone: string }) => item.phone === record.phone)
      .map((item: { isSecret: boolean }) => ({
        ...item,
        isSecret: e.target.checked,
      }));

    const otherData = data?.filter(
      (item: { phone: string }) => item.phone !== record.phone,
    );
    if (!filteredData) return null;
    const newData = [...otherData, ...filteredData];
    dispatch(setData(newData));
  };

  const onDelete = async (phone: string) => {
    const newData = data.filter((item: AnyObject) => item.phone !== phone);
    dispatch(setData(newData));
  };

  const addSubCategory = () => {
    const newData = [
      ...data,
      {
        ...selectedPhoneType[0],
        phone,
      },
    ];
    dispatch(setData(newData));
    setSelectedPhoneType([]);
    setPhone("");
  };

  const onSelectType = (
    value: string,
    option: { value: string | number; label: string },
  ) => {
    setSelectedPhoneType([{ phoneTypeId: value, "phone-type": option.label }]);
  };

  return (
    <Flex vertical gap={16}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name={"account"} label={t("account")}>
            <Input placeholder={t("account")} />
          </Form.Item>
          <Form.Item name={"mail"} label={t("email")}>
            <Input placeholder={t("email")} />
          </Form.Item>
          <Form.Item name={"index"} label={t("index")}>
            <Input placeholder={t("index")} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={"inn"} label={t("tin")}>
            <Input placeholder={t("tin")} />
          </Form.Item>
          <Form.Item name={"bank_number"} label={t("bank_number")}>
            <Input placeholder={t("bank_number")} />
          </Form.Item>
        </Col>
      </Row>
      <Typography.Title aria-level={4} level={4} style={{ margin: 0 }}>
        {t("phone")}
      </Typography.Title>
      <Row gutter={16} align={"middle"}>
        <Col span={11}>
          <Flex align="center" gap={8}>
            <label htmlFor="phone-type">{t("phone-type")}</label>
            <Select
              loading={phoneTypesLoading}
              allowClear
              showSearch
              id="phone-type"
              value={selectedPhoneType[0]?.phoneTypeId}
              onSelect={onSelectType}
              options={phoneTypesData?.data?.map((item: AnyObject) => ({
                value: item.id,
                label: item.name[i18next.language],
              }))}
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

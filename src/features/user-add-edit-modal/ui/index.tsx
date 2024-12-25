import { Button, Flex, Form, Input, Modal, Select } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { FC, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
  useCreateUserMutation,
  useGetRolesQuery,
  useUpdateUserMutation,
} from "@entities/users";

import { notificationResponse } from "@shared/lib/helpers";

type FormValues = {
  id?: string | number;
  fullName: string;
  phoneNumber: string;
  password: string;
  numericId: string | number;
  roleId?: string | number;
};
type Props = {
  open: boolean;
  onClose: () => void;
  record: FormValues | null;
};

export const UserAddEditModalUI: FC<Props> = (props) => {
  const { open, onClose, record } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { data, isLoading } = useGetRolesQuery({});
  const [createUser, { isLoading: isLoadingCreate }] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const selectOption = useMemo(() => {
    return data?.data.map((item: AnyObject) => ({
      value: item.id,
      label: item.name,
    }));
  }, [data]);

  const onSubmit = async (values: FormValues) => {
    const res = await createUser(values);

    notificationResponse(res, t, onClose);
  };

  const onEdit = async (values: FormValues) => {
    const body = {
      ...values,
      userId: record?.id,
    };
    const res = await updateUser(body);
    notificationResponse(res, t, onClose);
  };

  useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record]);

  return (
    <Modal
      forceRender
      open={open}
      onCancel={onClose}
      title={t("add-edit")}
      footer={null}
    >
      <Form
        onFinish={record ? onEdit : onSubmit}
        disabled={isLoading}
        id="user-add-edit"
        layout="vertical"
        form={form}
      >
        <Form.Item name="roleId" label={t("role")}>
          <Select options={selectOption} loading={isLoadingCreate} />
        </Form.Item>
        <Form.Item name="fullName" label={t("full-name")}>
          <Input disabled={isLoadingCreate} />
        </Form.Item>
        <Form.Item name="phoneNumber" label={t("phone")}>
          <Input disabled={isLoadingCreate} />
        </Form.Item>
        <Form.Item name="password" label={t("password")}>
          <Input disabled={isLoadingCreate} />
        </Form.Item>
        <Form.Item name="numericId" label={t("user-number")}>
          <Input disabled={isLoadingCreate} />
        </Form.Item>
        <Flex align="center" gap={8} justify="end">
          <Button
            loading={isLoadingCreate}
            type="primary"
            htmlType="submit"
            form="user-add-edit"
          >
            {t("save")}
          </Button>
          <Button disabled={isLoadingCreate} onClick={onClose}>
            {t("cancel")}
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};

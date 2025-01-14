import { Modal, Flex, Button, Divider, Input, Form } from "antd";
import { FormInstance } from "antd/es/form";
import i18next from "i18next";
import { FC, useState } from "react";

import { useUpdateUserMutation } from "@entities/users";

import { notificationResponse } from "@shared/lib/helpers";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  data?: {
    fullName: string;
    phoneNumber: string;
    id: string | number;
  };
}

export const SettingsModal: FC<IProps> = (props) => {
  const { isOpen, onClose, data } = props;
  const [form] = Form.useForm();
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const closeModal = () => {
    setIsEditable(true);
    form.resetFields();
    onClose();
  };
  const handleSubmit = async (values: FormInstance) => {
    console.log(values, "values");
    const body = {
      ...values,
      id: data?.id,
    };

    const response = await updateUser(body);

    notificationResponse(response, i18next.t, closeModal);
  };

  return (
    <Modal
      title={i18next.t("settings")}
      open={isOpen}
      onClose={closeModal}
      onCancel={closeModal}
      footer={
        <Flex justify="end" gap={8}>
          {isEditable && (
            <Button
              onClick={() => setIsEditable(!isEditable)}
              loading={isLoading}
            >
              {i18next.t("change")}
            </Button>
          )}
          {!isEditable && (
            <Button
              onClick={closeModal}
              disabled={isEditable}
              loading={isLoading}
            >
              {i18next.t("cancel")}
            </Button>
          )}
          {!isEditable && (
            <Button
              type="primary"
              htmlType="submit"
              form="setting-form"
              loading={isLoading}
            >
              {i18next.t("save")}
            </Button>
          )}
        </Flex>
      }
    >
      <Divider />
      <Form
        onFinish={handleSubmit}
        form={form}
        layout="vertical"
        id="setting-form"
      >
        <Form.Item
          initialValue={data?.fullName}
          name="fullName"
          label={i18next.t("full-name")}
        >
          <Input disabled={isEditable} placeholder={i18next.t("full-name")} />
        </Form.Item>
        <Form.Item
          initialValue={data?.phoneNumber}
          name="phoneNumber"
          label={i18next.t("phone")}
        >
          <Input disabled={isEditable} placeholder={i18next.t("phone")} />
        </Form.Item>
        <Form.Item name="oldPassword" label={i18next.t("old-password")}>
          <Input.Password
            disabled={isEditable}
            placeholder={i18next.t("old-password")}
          />
        </Form.Item>
        <Form.Item name="newPassword" label={i18next.t("new-password")}>
          <Input.Password
            disabled={isEditable}
            placeholder={i18next.t("password")}
          />
        </Form.Item>
        <Form.Item
          name="confirmNewPassword"
          label={i18next.t("confirmPassword")}
          dependencies={["newPassword"]}
        >
          <Input.Password
            disabled={isEditable}
            placeholder={i18next.t("confirmPassword")}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

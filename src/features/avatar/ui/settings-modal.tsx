import { Modal, Flex, Button, Divider, Input, Form } from "antd";
import { FormInstance } from "antd/es/form";
import i18next from "i18next";
import { FC, useState } from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  data?: unknown;
}

export const SettingsModal: FC<IProps> = (props) => {
  const { isOpen, onClose } = props;
  const [form] = Form.useForm();
  const [isEditable, setIsEditable] = useState<boolean>(true);
  //   const [updateUser] = useUpdateUserMutation();

  const handleSubmit = (values: FormInstance) => {
    console.log(values, "values");
    // const body = {
    //   ...values,
    //   id: data?.data.id,
    // };
    // updateUser(body);
  };

  const closeModal = () => {
    setIsEditable(true);
    form.resetFields();
    onClose();
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
            <Button onClick={() => setIsEditable(!isEditable)}>
              {i18next.t("change")}
            </Button>
          )}
          {!isEditable && (
            <Button onClick={closeModal} disabled={isEditable}>
              {i18next.t("cancel")}
            </Button>
          )}
          {!isEditable && (
            <Button type="primary" htmlType="submit" form="setting-form">
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
        <Form.Item name="fullName" label={i18next.t("full-name")}>
          <Input disabled={isEditable} placeholder={i18next.t("full-name")} />
        </Form.Item>
        <Form.Item name="phoneNumber" label={i18next.t("phone")}>
          <Input disabled={isEditable} placeholder={i18next.t("phone")} />
        </Form.Item>
        <Form.Item name="oldPassword" label={i18next.t("old-password")}>
          <Input.Password
            disabled={isEditable}
            placeholder={i18next.t("old-password")}
          />
        </Form.Item>
        <Form.Item name="newPassword" label={i18next.t("password")}>
          <Input.Password
            disabled={isEditable}
            placeholder={i18next.t("password")}
          />
        </Form.Item>
        <Form.Item
          name="confirmNewPassword"
          label={i18next.t("confirmPassword")}
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

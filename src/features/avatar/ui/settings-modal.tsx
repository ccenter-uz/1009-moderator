import { Modal, Flex, Button, Divider, Input, Form } from "antd";
import i18next from "i18next";
import { ChangeEvent, FC, useState } from "react";
import { FaCircle } from "react-icons/fa";

import { useUpdateMeMutation } from "@entities/users";

import { notificationResponse, passwordPattern } from "@shared/lib/helpers";

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
  const [updateMe, { isLoading }] = useUpdateMeMutation();
  const [hasNewPassword, setHasNewPassword] = useState(false);
  const [hasOldPassword, setHasOldPassword] = useState(false);

  const closeModal = () => {
    setIsEditable(true);
    form.resetFields();
    onClose();
  };
  const handleSubmit = async (values: {
    oldPassword: string;
    fullName: string;
    phoneNumber: string;
    newPassword?: string;
    confirmNewPassword?: string;
  }) => {
    const response = await updateMe(values);

    notificationResponse(response, closeModal);
  };

  const handlePasswordChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: string,
  ) => {
    if (type === "old") {
      const { value } = e.target;
      if (value === "") {
        return setHasOldPassword(false);
      }
      return setHasOldPassword(true);
    } else if (type === "new") {
      const { value } = e.target;
      if (value === "") {
        return setHasNewPassword(false);
      }

      return setHasNewPassword(true);
    }
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
        <Form.Item
          name="oldPassword"
          label={i18next.t("old-password")}
          style={{ marginBottom: 8 }}
          rules={[
            {
              message: i18next.t("password-not-correct-format"),
              pattern: passwordPattern,
            },
          ]}
        >
          <Input.Password
            disabled={isEditable}
            placeholder={i18next.t("old-password")}
            onChange={(e) => handlePasswordChange(e, "old")}
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label={i18next.t("new-password")}
          style={{ marginBottom: 8 }}
          rules={[
            {
              required: hasOldPassword,
              message: i18next.t("password-not-correct-format"),
              pattern: passwordPattern,
            },
          ]}
        >
          <Input.Password
            disabled={isEditable}
            placeholder={i18next.t("password")}
            onChange={(e) => handlePasswordChange(e, "new")}
          />
        </Form.Item>
        <Form.Item
          name="confirmNewPassword"
          label={i18next.t("confirmPassword")}
          dependencies={["newPassword"]}
          hasFeedback
          style={{ marginBottom: 8 }}
          rules={[
            {
              required: hasNewPassword,
              message: i18next.t("confirmPassword"),
              pattern: passwordPattern,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value && value !== getFieldValue("newPassword")) {
                  return Promise.reject(
                    new Error(i18next.t("password-is-not-match")),
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input.Password
            disabled={isEditable}
            placeholder={i18next.t("confirmPassword")}
          />
        </Form.Item>
        <Flex vertical style={{ marginBottom: 10 }}>
          <Flex align="center" gap={8}>
            <FaCircle size={8} color="lightgrey" />
            <span
              style={{
                color: "rgba(111, 111, 111, 0.58)",
                fontWeight: 400,
                fontSize: "12px",
              }}
            >
              {i18next.t("password-must-include-one-uppercase")}
            </span>
          </Flex>
          <Flex align="center" gap={8}>
            <FaCircle size={8} color="lightgrey" />
            <span
              style={{
                color: "rgba(111, 111, 111, 0.58)",
                fontWeight: 400,
                fontSize: "12px",
              }}
            >
              {i18next.t("password-must-include-one-digit")}
            </span>
          </Flex>
          <Flex align="center" gap={8}>
            <FaCircle size={8} color="lightgrey" />
            <span
              style={{
                color: "rgba(111, 111, 111, 0.58)",
                fontWeight: 400,
                fontSize: "12px",
              }}
            >
              {i18next.t("password-must-include-one-special-character")}
            </span>
          </Flex>
        </Flex>
      </Form>
    </Modal>
  );
};

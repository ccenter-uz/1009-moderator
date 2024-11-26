import { Button, Flex, Form, Input, notification, Typography } from "antd";
import { FC } from "react";
import "./style.css";
import { useTranslation } from "react-i18next";
import { FaLock, FaUser } from "react-icons/fa";

import { usePostLoginMutation } from "@entities/login";

export const LoginPage: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [postLogin, { isLoading }] = usePostLoginMutation();

  const onLogin = async (values: { phoneNumber: string; password: string }) => {
    const { data } = await postLogin(values);
    if (data?.status === 200) {
      form.resetFields();
      window.location.href = "/";
    } else {
      return notification.error({
        message: data?.message,
        placement: "bottomRight",
      });
    }
  };

  return (
    <Form onFinish={onLogin} id="login" form={form}>
      <Flex vertical className="login-box">
        <Form.Item name="phoneNumber">
          <Input
            prefix={<FaUser />}
            placeholder="Номер телефона"
            className="login-input"
          />
        </Form.Item>
        <Form.Item name="password">
          <Input
            prefix={<FaLock />}
            placeholder="Пароль"
            className="login-input"
          />
        </Form.Item>
        <Button
          className="login-btn"
          htmlType="submit"
          loading={isLoading}
          form="login"
        >
          {t("login")}
        </Button>
        <Typography.Text className="forgot-password">
          {t("forgot-password")}
        </Typography.Text>
      </Flex>
    </Form>
  );
};

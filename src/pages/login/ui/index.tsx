import { Button, Flex, Form, Input, Typography } from "antd";
import { FC } from "react";
import "./style.css";
import { useTranslation } from "react-i18next";
import { FaLock, FaUser } from "react-icons/fa";

import { usePostLoginMutation } from "@entities/login";

import { BASE_URL, setCookie, setLocalStorage } from "@shared/lib/helpers";

export const LoginPage: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  // const [postLogin, { isLoading }] = usePostLoginMutation();

  const onLogin = async (values: { phoneNumber: string; password: string }) => {
    // console.log("Attempting login with values:", values);
    // const response = await postLogin(values);
    // console.log("Post login response:", response);
    try {
      const response = await fetch(BASE_URL + "user/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!data) return null;

      setCookie("access_token", data?.result?.accessToken);
      form.resetFields();
      setLocalStorage("user", {
        permissions_pathname: data?.result?.permissions,
      });
      window.location.href = "/";
    } catch (e) {
      console.error(e);
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
          // loading={isLoading}
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

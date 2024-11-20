import { Button, Flex, Form, Input, Typography } from "antd";
import { FC } from "react";
import "./style.css";
import { useTranslation } from "react-i18next";
import { FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { setCookie, setLocalStorage } from "@shared/lib/helpers";
import { moderatorPermissionsByRole } from "@shared/lib/react-router";

export const LoginPage: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onLogin = (values: { phone: string; password: string }) => {
    console.log(values, "values");
    setCookie("access_token", "true");
    form.resetFields();
    setLocalStorage("user", moderatorPermissionsByRole);
    navigate("/");
  };

  return (
    <Form onFinish={onLogin} id="login" form={form}>
      <Flex vertical className="login-box">
        <Form.Item name="phone">
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
        <Button className="login-btn" htmlType="submit">
          {t("login")}
        </Button>
        <Typography.Text className="forgot-password">
          {t("forgot-password")}
        </Typography.Text>
      </Flex>
    </Form>
  );
};

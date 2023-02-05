import { NextPage } from "next";
import Head from "next/head";

import { Button, Form, Input, message } from "antd";
import { UserType } from "../types";
import { useRouter } from "next/router";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { routers } from "../constants";
import { useUserStore } from "../store/useUserStore";

interface Props {}

const Login: NextPage = (props: Props) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [, forceUpdate] = useState({});
  const [users, setUsers] = useLocalStorage<UserType[]>("users", []);
  const { setUser } = useUserStore();

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values: Pick<UserType, "email" | "password">) => {
    const { email, password } = values;
    const findUser = users.find((user) => user.email === email);

    if (findUser) {
      if (findUser.password === password) {
        setUser(values);
        router.push(routers.HOME);
      } else {
        messageApi.open({
          type: "error",
          content: "Credentials wrong, please try again.",
        });
      }
      return;
    }

    messageApi.open({
      type: "error",
      content: "User does not exist, please register.",
    });
  };

  return (
    <div>
      <Head>
        <title>Login - The Martec</title>
      </Head>

      {contextHolder}

      <div className="fixed w-full h-full flex items-center justify-center py-2">
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          style={{ maxWidth: 800 }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item className="text-center" shouldUpdate>
            {() => (
              <>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !form.isFieldsTouched(true) ||
                    !!form
                      .getFieldsError()
                      .filter(({ errors }) => errors.length).length
                  }
                >
                  Log in
                </Button>

                <Link href={`/register`}>
                  <Button type="link">Register</Button>
                </Link>
              </>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;

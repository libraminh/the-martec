import { NextPage } from "next";
import Head from "next/head";

import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import BaseModal from "../components/BaseModal";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useModalStore } from "../store/useModalStore";
import { UserType } from "../types";
import { useRouter } from "next/router";
import { routers } from "../constants";

interface Props {}

const Register: NextPage = (props: Props) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { showModal, setOpen } = useModalStore();
  const [users, setUsers] = useLocalStorage<UserType[]>("users", []);
  const router = useRouter();

  const showError = () => {
    messageApi.open({
      type: "error",
      content: "User is already exist, please try to login.",
    });
  };

  const onFinish = (values: UserType) => {
    const findUser = users.find(
      (user: UserType) => user.email === values.email
    );

    if (findUser) {
      showError();
      return;
    }

    const usersData = [...users, values];

    setUsers(usersData);
    setOpen(true);
    setTimeout(() => router.push(routers.LOGIN), 2000);
  };

  return (
    <div className="fixed w-full h-full flex items-center justify-center py-2">
      <Head>
        <title>Register - The Martec</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {contextHolder}

      <div>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          style={{ maxWidth: 800 }}
          scrollToFirstError
        >
          <Form.Item
            name="firstname"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="First name" />
          </Form.Item>

          <Form.Item
            name="lastname"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Last name" />
          </Form.Item>

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
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>

      <BaseModal />
    </div>
  );
};

export default Register;

import { NextPage } from "next";
import Head from "next/head";

import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import BaseModal from "../components/BaseModal";
import { routerPaths } from "../constants";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useModalStore } from "../store/useModalStore";
import { UserType } from "../types";
import { v4 as uuidv4 } from "uuid";

const Register: NextPage = () => {
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
    const finduser = users.find(
      (user: UserType) => user.email === values.email
    );

    if (finduser) {
      showError();
      return;
    }

    const usersData = [...users, { ...values, id: uuidv4() }];

    setUsers(usersData);
    setOpen(true);
    setTimeout(() => router.push(routerPaths.LOGIN), 2000);
  };

  return (
    <div>
      <Head>
        <title>Register - The Martec</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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

            <Link href={routerPaths.LOGIN}>
              <Button type="link">Login</Button>
            </Link>
          </Form.Item>
        </Form>
      </div>

      <BaseModal>
        <h2 className="text-xl font-bold text-center">Register Sucessfully!</h2>

        <p className="text-base text-center">
          Thank you for your registration, you will be redirect to the Login
          page soon.
        </p>
      </BaseModal>
      {contextHolder}
    </div>
  );
};

export default Register;

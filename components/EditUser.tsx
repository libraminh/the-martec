import { Button, Form, Input } from "antd";
import BaseModal from "./BaseModal";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useUserStore } from "../store/useUserStore";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { UserType } from "../types";
import { useModalStore } from "../store/useModalStore";

export const EditUser = () => {
  const [form] = Form.useForm();
  const [users, setUsers] = useLocalStorage<UserType[]>("users", []);
  const { sessionUser } = useUserStore();
  const { showModal, setOpen } = useModalStore();
  const currentUser = users?.find((user) => user.email === sessionUser.email);

  const onFinish = async (values: Partial<UserType>) => {
    console.log("values", values);
  };

  return (
    <BaseModal>
      <h2 className="text-lg font-bold">Edit User</h2>

      <Form
        form={form}
        name="edit-user"
        onFinish={onFinish}
        initialValues={currentUser}
        style={{ maxWidth: 800 }}
        scrollToFirstError
      >
        <Form.Item
          name="firstname"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="First name" />
        </Form.Item>

        <Form.Item
          name="lastname"
          rules={[{ required: true, message: "Please input your first name!" }]}
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
                  new Error("The two passwords that you entered do not match!")
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

        <Form.Item>
          <div className="space-x-2 flex justify-end">
            <Button type="primary" htmlType="submit">
              Save
            </Button>

            <Button type="default" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    </BaseModal>
  );
};

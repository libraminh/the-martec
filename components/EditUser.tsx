import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useModalStore } from "../store/useModalStore";
import { useUserStore } from "../store/useUserStore";
import { UserType } from "../types";
import BaseModal from "./BaseModal";

type FormValues = Partial<UserType> & {
  oldPassword: string;
};

export const EditUser = () => {
  const [form] = Form.useForm();
  const { sessionUser, setUser } = useUserStore();
  const { showModal, setOpen } = useModalStore();
  const [users, setUsers] = useLocalStorage<UserType[]>("users", []);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: FormValues) => {
    if (values.oldPassword !== sessionUser.password) {
      messageApi.open({
        type: "error",
        content: "Your old password is wrong, please try again!",
      });
      return;
    }

    const { oldPassword, ...rest } = values;

    const updatedUser = { ...sessionUser, ...rest, confirm: values.password };

    const updatedUsers = users.map((user) =>
      user.email === sessionUser.email ? updatedUser : user
    );

    messageApi.open({
      type: "success",
      content: "Your information is updated!",
    });
    setUsers(updatedUsers as any);
    setUser(updatedUser);
    setOpen(false);
  };

  return (
    <BaseModal>
      <h2 className="text-lg font-bold">Edit User - {sessionUser.email}</h2>

      <Form
        form={form}
        name="edit-user"
        onFinish={onFinish}
        initialValues={{ ...sessionUser, password: "", confirm: "" }}
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
          name="oldPassword"
          rules={[
            {
              required: true,
              message: "Please input your old password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Old Password"
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
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
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

      {contextHolder}
    </BaseModal>
  );
};

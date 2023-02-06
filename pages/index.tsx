import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useUserStore } from "../store/useUserStore";
import { UserType } from "../types";

import { Button, Form, Input, List, message, Tooltip } from "antd";
import { isEmpty } from "lodash";
import Link from "next/link";
import { Octokit } from "octokit";
import { LinkedinShareButton } from "react-share";
import { routerPaths } from "../constants";

const listPageSize = 10;

const Home: NextPage = () => {
  const octokit = new Octokit({
    auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
  });
  const [form] = Form.useForm();
  const [users, setUsers] = useLocalStorage<UserType[]>("users", []);
  const { sessionUser } = useUserStore();
  const loggedInUser =
    users.find((item) => item.email === sessionUser.email) || {};
  const [repos, setRepos] = useState([]);
  const [reposLoading, setReposLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async ({ username }: { username: string }) => {
    setReposLoading(true);
    const repos = await getGithubRepos(username);
    setRepos(repos?.data || []);
    setReposLoading(false);
  };

  const getGithubRepos = async (username: string) => {
    try {
      return await octokit.request("GET /users/{owner}/repos", {
        owner: username,
      });
    } catch (error: any) {
      console.error(error);
      messageApi.open({
        type: "error",
        content: error.response.data.message,
      });
    }
  };

  return (
    <div>
      <Head>
        <title>Dashboard - The Martec</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold">User Information</h2>

          {isEmpty(loggedInUser) ? (
            <div className="mb-5">
              <span className="text-sm md:text-base">
                Please <Link href={routerPaths.LOGIN}>login</Link> to get your
                information.
              </span>
            </div>
          ) : (
            <ul className="text-sm md:text-base space-y-1 list-inside p-0">
              {Object.keys(loggedInUser)?.map((user, userIndex) => (
                <li key={userIndex}>
                  <>
                    <strong className="capitalize">{user}</strong> :{" "}
                    {Object.values(loggedInUser)[userIndex]}
                  </>
                </li>
              ))}
            </ul>
          )}

          <Form
            form={form}
            className="flex flex-col md:flex-row md:items-center md:space-x-5"
            name="login"
            onFinish={onFinish}
            style={{ maxWidth: 800 }}
            scrollToFirstError
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input prefix={<GithubOutlined />} placeholder="Username" />
            </Form.Item>

            <Form.Item>
              <Button loading={reposLoading} type="primary" htmlType="submit">
                Load Repos
              </Button>
            </Form.Item>
          </Form>
        </div>

        <List
          size="small"
          header={<div className="text-xl font-bold up">Github Repos</div>}
          bordered
          dataSource={repos}
          pagination={{
            pageSize: listPageSize,
          }}
          renderItem={(item: { html_url: string; name: string }) => {
            return (
              <List.Item>
                <Link href={item?.html_url} target="_blank">
                  {item?.name}
                </Link>

                <Tooltip title="Share via LinkedIn">
                  <Button type="text">
                    <LinkedinShareButton
                      url={item?.html_url}
                      title={item?.name}
                    >
                      <LinkedinOutlined style={{ fontSize: "20px" }} />
                    </LinkedinShareButton>
                  </Button>
                </Tooltip>
              </List.Item>
            );
          }}
        />
      </div>

      {contextHolder}
    </div>
  );
};

export default Home;

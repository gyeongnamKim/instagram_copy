import React, { useState } from "react";
import { Form, Input, Button, notification, Card } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";
import { useAppContext, setToken } from "store";
import "./Login.scss";
import { parseErrorMessages } from "utils/forms";
import { axiosInstance } from "api";

export default function Login() {
  const { store, dispatch } = useAppContext();
  const history = useHistory();
  const location = useLocation();
  // const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", "");
  const [fieldErrors, setFieldErrors] = useState({});

  const { from: loginRedirectUrl } = location.state || {
    from: { pathname: "/" },
  };

  const onFinish = (values) => {
    async function fn() {
      const { username, password } = values;
      setFieldErrors({});
      const data = { username, password };
      try {
        const response = await axiosInstance.post("/accounts/token/", data);
        const {
          data: { token: jwtToken },
        } = response;
        dispatch(setToken(jwtToken));
        // setJwtToken(jwtToken);

        notification.open({
          message: "로그인 성공",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        history.push(loginRedirectUrl);
      } catch (error) {
        if (error.response) {
          notification.open({
            message: "로그인 실패",
            description: "아이디/암호를 확인해주세요.",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });

          const { data: fieldsErrorMessages } = error.response;
          // fieldsErrorMessages => { username: "m1 m2", password: [] }
          // python: mydict.items()
          setFieldErrors(parseErrorMessages(fieldsErrorMessages));
        }
      }
    }
    fn();
  };
  return (
    <div className="Login">
      <Card title="Login">
        <Form
          {...layout}
          onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
          autoComplete={"false"}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please input your username!" },
              { min: 5, message: "5글자 입력해주세요." },
            ]}
            hasFeedback
            {...fieldErrors.username}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            {...fieldErrors.password}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import "./FormLogin.scss";
import { ButtonOut } from "../Button/Button";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import { loginWithEmail, loginWithGg } from "../../hooks/firebaseFunc";
AOS.init();
function FormLogin() {
  const navigate = useNavigate();

  const signInwithGoogle = async () => {
    await loginWithGg();
    navigate("/");
  };

  async function onFinish(values) {
    const email = values.email;
    const password = values.password;
    await loginWithEmail(email, password);
    navigate("/");
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div data-aos="zoom-in-down" className="formLoginWrap">
      <div>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h1 className="LoginTitle">Hồng Thịnh App Chat</h1>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>

          <ButtonOut />
        </Form>
        <p style={{ textAlign: "center", margin: "10px 0" }}> or</p>
        <button onClick={signInwithGoogle} className="ggLogin">
          <FaGoogle />
          <span> Sign in With Google</span>
        </button>
      </div>
    </div>
  );
}

export default FormLogin;

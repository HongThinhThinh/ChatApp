import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import "./FormLogin.scss";
import { ButtonOut } from "../Button/Button";
import AOS from "aos";
import "aos/dist/aos.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router";
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { FacebookLoginButton } from "react-facebook-login";
AOS.init();
function FormLogin() {
  const signInwithFacebook = () => {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log(result);
        console.log(credential);
        console.log(accessToken);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navigate = useNavigate();

  function onFinish(values) {
    const email = values.email;
    const password = values.password;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/");
      })
      .catch((error) => {});
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div data-aos="zoom-in-down" className="formLoginWrap">
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
      <button onClick={signInwithFacebook}>Login with facebook</button>
    </div>
  );
}

export default FormLogin;

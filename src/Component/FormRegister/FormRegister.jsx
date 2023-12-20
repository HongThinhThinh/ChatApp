import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import "../FormLogin/FormLogin.scss";
import UploadImg from "../UploadImg/UploadImg";
import AOS from "aos";
import "aos/dist/aos.css";
import Arrow from "../Arrow/Arrow";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router";
import { doc, setDoc } from "firebase/firestore";
import uploadFile from "../../hooks/useUpload";

import Loading from "../LoadingAtomic/Loading";
// or via CommonJS
const Swal = require("sweetalert2");
AOS.init();
function FormRegister() {
  const [show, setShow] = useState(true);

  const navigate = useNavigate();

  // const defaultAvatar = "https://pnganime.com/web/images/blog_images/done.webp";
  const onFinish = async (values) => {
    setShow(false);
    const displayName = values.username;
    const email = values.email;
    const password = values.password;
    try {
      let URL;
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (typeof file !== "string") {
        URL = await uploadFile(file);
      } else {
        URL = file;
      }
      await updateProfile(res.user, {
        displayName,
        photoURL: URL,
      });
      //create user on firestore
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: URL,
      });
      // chat của mỗi user, ban đầu là object trống nhưng khi nhắn tin với ai sẽ update
      await setDoc(doc(db, "userChat", res.user.uid), {});
      Swal.fire({
        title: "Good job!",
        text: "SignUp SuccessFully",
        icon: "success",
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: `${error}`,
      });
    }
    setShow(true);
  };
  const [file, setFile] = useState(
    "https://api-private.atlassian.com/users/62ebe5ece9e887b64753f5587dac8926/avatar"
  );

  return (
    <div>
      {!show && <Loading />}
      {show && (
        <div data-aos="zoom-out-up" className="formLoginWrap ">
          <div className="arrow">
            <Arrow />
          </div>
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
            autoComplete="off"
          >
            <h1 className="LoginTitle">Register</h1>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
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
            {/* 2 file khacs nhau , muon submit lay data 1 lan lam sao */}
            <Form.Item
              label="Avatar"
              name="Avatar"
              onChange={(e) => setFile(e.target.files[0])}
            >
              <UploadImg />
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
          </Form>
        </div>
      )}
    </div>
  );
}

export default FormRegister;

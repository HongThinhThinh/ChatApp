import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import "../FormLogin/FormLogin.scss";
import UploadImg from "../UploadImg/UploadImg";
import AOS from "aos";
import "aos/dist/aos.css";
import Arrow from "../Arrow/Arrow";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { useNavigate } from "react-router";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
// or via CommonJS
const Swal = require("sweetalert2");
AOS.init();

function FormRegister() {
  const navigate = useNavigate();

  const defaultAvatar = "https://pnganime.com/web/images/blog_images/done.webp";
  const onFinish = async (values) => {
    console.log(values);
    const displayName = values.username;
    const email = values.email;
    const password = values.password;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res.user);
      const storageRef = ref(storage, displayName);
      //upload file
      await uploadBytesResumable(storageRef, file).then(() => {
        // get file vừa upload
        getDownloadURL(storageRef).then(async (downloadURL) => {
          console.log(downloadURL);
          if (!file) {
            downloadURL = defaultAvatar;
          }
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            Swal.fire({
              title: "Good job!",
              text: "SignUp SuccessFully",
              icon: "success",
            });
            navigate("/login");
          } catch (err) {
            console.log(err);
          }
        });
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: `${error}`,
      });
    }
  };
  const [file, setFile] = useState("");

  return (
    <div>
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
    </div>
  );
}

export default FormRegister;

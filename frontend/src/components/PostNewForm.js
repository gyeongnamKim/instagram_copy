import React, { useState } from "react";
import { Button, Card, Form, Input, Upload, Modal, notification } from "antd";
import { PlusOutlined, FrownOutlined } from "@ant-design/icons";
import { getBase64FromFile } from "utils/base64";
import Axios from "axios";
import { useAppContext } from "store";
import { parseErrorMessages } from "utils/forms";
import { useHistory } from "react-router-dom";

export default function PostNewForm() {
  const history = useHistory();
  const {
    store: { jwtToken },
  } = useAppContext();
  const [fileList, setFileList] = useState([]);
  const [previewPhoto, setPreviewPhoto] = useState({
    visible: false,
    base64: null,
  });
  const [fieldErrors, setFieldErrors] = useState();

  const handleFinish = async (fieldValues) => {
    const {
      caption,
      location,
      photo: { fileList },
    } = fieldValues;

    const formData = new FormData();

    formData.append("caption", caption);
    formData.append("location", location);
    fileList.forEach((file) => {
      formData.append("photo", file.originFileObj);
    });
    const headers = { Authorization: `JWT ${jwtToken}` };
    try {
      const response = await Axios.post(
        "http://localhost:8000/api/posts/",
        formData,
        { headers }
      );
      console.log("success response : ", response);
      history.push("/");
    } catch (error) {
      if (error.response) {
        const { status, data: fieldsErrorMessages } = error.response;
        if (typeof fieldsErrorMessages === "string") {
          notification.open({
            message: "서버 오류",
            description: `에러 ${status} 응답을 받았습니다. 서버 에러를 확인해주세요.`,
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
          });
        } else {
          setFieldErrors(parseErrorMessages(fieldsErrorMessages));
        }
      }
    }
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handlePreviewPhoto = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64FromFile(file.originFileObj);
    }

    setPreviewPhoto({
      visible: true,
      base64: file.url || file.preview,
    });
  };

  return (
    <Form {...layout} onFinish={handleFinish} autoComplete={"false"}>
      <Form.Item
        label="Caption"
        name="caption"
        rules={[{ required: true, message: "Caption을 입력해주세요." }]}
        hasFeedback
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Location"
        name="location"
        rules={[{ required: true, message: "Location을 입력해주세요." }]}
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Photo"
        name="photo"
        rules={[{ required: true, message: "사진을 입력해주세요." }]}
        hasFeedback
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          beforeUpload={() => {
            return false;
          }}
          onChange={handleUploadChange}
          onPreview={handlePreviewPhoto}
        >
          {fileList.length > 0 ? null : (
            <div>
              <PlusOutlined />
              <div className="ant-upload-text">Upload</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

      <Modal
        visible={previewPhoto.visible}
        footer={null}
        onCancel={() => setPreviewPhoto({ visible: false })}
      >
        <img
          src={previewPhoto.base64}
          style={{ width: "100%" }}
          alt="Preview"
        />
      </Modal>
    </Form>
  );
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

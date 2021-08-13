import React, { useState } from "react";
import { Upload, Button, message, Space, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import AppInfoParser from "app-info-parser";

import "./App.css";

const App = () => {
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [note, setNote] = useState("");

  const handleUpload = () => {
    if (!fileList.length) {
      message.warning("请选择要上传的文件");
      return;
    }

    const formData = new FormData();
    formData.append("pkg", fileList[0].originFileObj);
    formData.append("note", note);

    setUploading(true);
    axios({
      method: "post",
      // TODO: change this url
      url: "https://run.mocky.io/v3/2febfdd6-90bf-4714-8ec8-3580da5d85b7",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        setFileList([]);
        message.success("upload successfully.");
        console.log(res);
      })
      .catch((err) => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };
  const props = {
    name: "pkg",
    accept: ".apk,.ipa",
    fileList,
    onChange({ file, fileList }) {
      setFileList(fileList.length ? [fileList[fileList.length - 1]] : []);
    },
    beforeUpload: (f, fList) => {
      return false;
    },
  };

  return (
    <div className="container">
      <Space direction="vertical" align="center">
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>选择文件</Button>
        </Upload>
        <Input
          name="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="请输入备注"
          style={{ minWidth: "300px" }}
        />
        <Button type="primary" onClick={handleUpload} loading={uploading}>
          {uploading ? "上传中" : "上传文件"}
        </Button>
      </Space>
    </div>
  );
};

export default App;

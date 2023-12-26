import React from 'react'
import { Button, Form, Input, } from "antd";

const UpdateCaregoryPage = () => {

  return (
    <Form name="basic" layout="vertical" autoComplete="off" onFinish={onFinish}>
    <Form.Item
      label="Kategori İsmi"
      name="name"
      rules={[
        {
          required: true,
          message: "Lütfen kategori adını girin!",
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Kategori Görseli (Link)"
      name="img"
      rules={[
        {
          required: true,
          message: "Lütfen kategori görsel linkini girin!",
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Button type="primary" htmlType="submit">
      Güncelle
    </Button>
  </Form>
  )
}

export default UpdateCaregoryPage

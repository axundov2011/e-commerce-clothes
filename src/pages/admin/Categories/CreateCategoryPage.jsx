import React, {useState} from 'react'
import { Button, Form, Input, Spin, message } from "antd";
import { useDispatch } from 'react-redux';
import { createCategory } from '../../../redux/slices/category.slice';

const CreateCategoryPage = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const dispatch  = useDispatch();
    const onFinish = async (values) => {
      setLoading(true);
      try {
        const response = await dispatch(createCategory(values));

        if(response.payload){
         message.success("Kategori Başarıyla güncellendi");
         form.resetFieldse();
        } else {
            message.error("Kategori güncellenirken bir hata oluşdu");
        }
      } catch (error) {
       console.log(error); 
      } finally{
        setLoading(false);

      }
    }
  return (
    <Spin spinning={loading}>
    <Form 
    name="basic" 
    layout="vertical"
    onFinish={onFinish}
    form={form}
    >
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
        Oluştur
      </Button>
    </Form>
  </Spin>
  )
}

export default CreateCategoryPage

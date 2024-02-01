import React, {useEffect, useState} from 'react'
import { Button, Form, Input, InputNumber, Select, Spin, message } from "antd";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

import { useDispatch } from 'react-redux';
import { createCategory, fetchCategory } from '../../../redux/slices/category.slice';
import { createProducts, fetchProducts } from '../../../redux/slices/product.slice';
import { createCoupon } from '../../../redux/slices/coupon.slice';


const CreateCouponPage = () => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([])
    const [form] = Form.useForm();
    const dispatch  = useDispatch();
    
 

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = await dispatch(createCoupon(values));

      if (data.payload) {
        message.success("Kupon başarıyla oluşturuldu.");
        setLoading(false);
        form.resetFields();
      } else {
        message.error("Kupon oluşturulurken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Kupon oluşturma hatası:", error);
    } finally {
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
        label="Kupon Koud"
        name="code"
        rules={[
          {
            required: true,
            message: "Lütfen bir kupon kodu girin!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Kupon indirim oranı"
        name="discountPercent"
        rules={[
          {
            required: true,
            message: "Lütfen bir kupon indirim oranı girin!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Oluştur
      </Button>
    </Form>
  </Spin>
  )
}

export default CreateCouponPage

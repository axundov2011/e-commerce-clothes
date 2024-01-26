import React, {useEffect, useState} from 'react'
import { Button, Form, Input, InputNumber, Select, Spin, message } from "antd";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

import { useDispatch } from 'react-redux';
import { createCategory, fetchCategory } from '../../../redux/slices/category.slice';
import { createProducts, fetchProducts } from '../../../redux/slices/product.slice';


const CreateProductPage = () => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([])
    const [form] = Form.useForm();
    const dispatch  = useDispatch();
  

  console.log(categories, 'categories');

  const onFinish = async (values) => {
    console.log(values);
    const imgLinks = values.img.split('\n').map((link) => link.trim());
    const colors = values.colors.split('\n').map((link) => link.trim());
    const sizes = values.sizes.split('\n').map((link) => link.trim());
    setLoading(true);
    try {
      const current = values.current
      const discount = values.discount
      const data = await dispatch(createProducts({
        ...values,
        price: {
          current: current,
          discount: discount,
        },
        colors,
        sizes,
        img: imgLinks,
      }));

      if (data.payload) {
        message.success("Ürün başarıyla oluşturuldu.");
        setLoading(false);
        form.resetFields();
      } else {
        message.error("Ürün oluşturulurken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Ürün oluşturma hatası:", error);
    } finally {
      setLoading(false);
    }
  }

 useEffect(() => {
  const FetchProduct = async () => {
    try {
        const response = await dispatch(fetchCategory());
        if (response.payload) {
            setCategories(response?.payload);
        } else {
            message.error("Məlumatlar gəlmədi!")
        }

    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
}
FetchProduct();
 }, [dispatch])
  
  return (
    <Spin spinning={loading}>
      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Ürün İsmi"
          name="name"
          rules={[
            {
              required: true,
              message: "Lütfen Ürün adını girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ürün Kategorisi"
          name="category"
          rules={[
            {
              required: true,
              message: "Lütfen 1 kategori seçin!",
            },
          ]}
        >
          <Select>
            {categories.map((category) => (
              <Select.Option value={category._id} key={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Fiyat"
          name="current"
          rules={[
            {
              required: true,
              message: "Lütfen ürün fiyatını girin!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="İndirim Oranı"
          name="discount"
          rules={[
            {
              required: true,
              message: "Lütfen bir ürün indirim oranı girin!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Ürün Açıklaması"
          name="description"
          rules={[
            {
              required: true,
              message: "Lütfen bir ürün açıklaması girin!",
            },
          ]}
        >
          <ReactQuill
            theme="snow"
            style={{
              backgroundColor: "white",
            }}
          />
        </Form.Item>
        <Form.Item
          label="Ürün Görselleri (Linkler)"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen en az 4 ürün görsel linki girin!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir görsel linkini yeni bir satıra yazın."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>
        <Form.Item
          label="Ürün Renkleri (RGB Kodları)"
          name="colors"
          rules={[
            {
              required: true,
              message: "Lütfen en az 1 ürün rengi girin!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir RGB kodunu yeni bir satıra yazın."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>
        <Form.Item
          label="Ürün Bedenleri"
          name="sizes"
          rules={[
            {
              required: true,
              message: "Lütfen en az 1 ürün beden ölçüsü girin!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir beden ölçüsünü yeni bir satıra yazın."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Oluştur
        </Button>
      </Form>
    </Spin>
  );
}

export default CreateProductPage

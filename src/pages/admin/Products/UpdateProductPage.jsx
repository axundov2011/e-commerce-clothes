import React, {useEffect, useState} from 'react'
import { Button, Form, Input, InputNumber, Select, Spin, message } from "antd";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

import { useDispatch } from 'react-redux';
import { fetchCategory } from '../../../redux/slices/category.slice';
import { createProducts, fetchProducts, updateFetchProducts } from '../../../redux/slices/product.slice';
import { useNavigate, useParams } from 'react-router-dom';


const UpdateProductPage = () => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [singleProduct, setSingleProduct] = useState([])
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const dispatch  = useDispatch();
    const params = useParams();
    const productsId = params.id;

    useEffect(() => {
      const restFetchProduct = async (values) => {
          setLoading(true);
          try {
              //Birden cox promise islemi etmek istediyimiz de Promiseni bu sekilde yaziriq
              const [categoriesResponse, singleProductDataResponse] = await Promise.all([
                  dispatch(fetchCategory()),
                  dispatch(fetchProducts({productsId, values})),
              ]);
  
              if (!categoriesResponse.payload || !singleProductDataResponse.payload) {
                  message.error("Veri getirme başarısız.");
              }

              const [categoriesData, singleProductsData] = [categoriesResponse.payload, singleProductDataResponse.payload];
              console.log(singleProductsData,"singleProductsData");
  
              setCategories(categoriesData);
              console.log(categoriesData, 'categoriesData');
              setSingleProduct(singleProductsData)

              if (singleProductsData.length > 0) {
                const productToUpdate = singleProductsData.find(product => product._id === productsId);
              
                if (productToUpdate) {
                  form.setFieldsValue({
                    name: productToUpdate.name,
                    // category: productToUpdate.category,
                    current: productToUpdate.price?.current,
                    discount: productToUpdate.price?.discount,
                    description: productToUpdate.description,
                    img: productToUpdate.img.join("\n"),
                    colors: productToUpdate.colors.join("\n"),
                  });
                } else {
                  message.error("Ürün bulunamadı.");
                }
              }
          } catch (error) {
              console.log(error);
          } finally {
              setLoading(false);
          }
      }
      restFetchProduct();
  }, [dispatch, productsId, form]);


  const onFinish = async (values) => {
    console.log(values);
    const imgLinks = values.img.split('\n').map((link) => link.trim());
    const colors = values.colors.split('\n').map((link) => link.trim());
    const sizes = values.sizes.split('\n').map((link) => link.trim());
    setLoading(true);
    try {
      const data = await dispatch(updateFetchProducts({productsId},{
        ...values,
        price: {
          current: values.current,
          discount: values.discount
          , 
        },
        colors,
        sizes,
        img: imgLinks,
      }));
      

      if (data.payload) {
        message.success("Ürün başarıyla güncellendi.");
        setLoading(false);
        navigate("navigate/products")
        form.resetFields();
      } else {
        message.error("Ürün güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Ürün güncelleme hatası:", error);
    } finally {
      setLoading(false);
    }
  }



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
            {categories && categories.map((category) => (
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
          update
        </Button>
      </Form>
    </Spin>
  );
}

export default UpdateProductPage

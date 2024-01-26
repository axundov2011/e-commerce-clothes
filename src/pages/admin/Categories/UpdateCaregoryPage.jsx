import React, {useCallback, useEffect, useState} from 'react'
import { Button, Form, Input, message, Spin } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory } from '../../../redux/slices/category.slice';
import { useParams } from 'react-router-dom';

const UpdateCaregoryPage = () => {

    const [loading, setLoading] = useState(false);
    const params = useParams();
    const categoryId = params.id;
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [initialValues, setInitialValues] = useState({});

    console.log(categoryId, 'categoryId' );

    const onFinish = async(values) => {
        setLoading(true)
        console.log(values,'values');
       try {
        const response  = await dispatch(updateCategory({categoryId,values}));
        console.log(categoryId,'categoryId');
        if(response.payload){
            message.success("Category müvəffəqiyyətlə yeniləndi!")
            form.setFieldsValue();
        } else {
            message.error("Category yenilənirkən bir xəta ilə qarşılaşdı!")
        }
       } catch (error) {
        console.log("Category yeniləmə xətası");
       } finally {
        setLoading(false);
       }
    }
   

      useEffect(() => {
        const restFethcSignleCategory = async (values) => {
            setLoading(true);
            try {
              const response = await dispatch(updateCategory({categoryId,values}));
              if (!response.payload) {
                throw new Error("Dataları getirme xətası")
              } 
              const data = response.payload;
              if(data){
                const {name, img} = data;
                form.setFieldsValue({
                    name: name,
                    img: img,
                });
                setInitialValues({
                    name,
                    img
                })
              }
              
            } catch (error) {
              console.log(error);
            } finally {
              setLoading(false);
            }
          };
        restFethcSignleCategory();
      }, [categoryId, dispatch, form])
  return (
    <Spin spinning={loading}>
        <Form 
        form={form} 
        name="basic" 
        layout="vertical" 
        autoComplete="off" 
        onFinish={onFinish}>
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
    </Spin>
  )
}

export default UpdateCaregoryPage

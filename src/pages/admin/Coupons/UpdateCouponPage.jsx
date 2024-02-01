import React, {useCallback, useEffect, useState} from 'react'
import { Button, Form, Input, InputNumber, message, Spin } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory } from '../../../redux/slices/category.slice';
import { useParams } from 'react-router-dom';
import { fetchCoupon,  updateCoupons } from '../../../redux/slices/coupon.slice';

const UpdateCouponPage = () => {

    const [loading, setLoading] = useState(false);
    const params = useParams();
    const couponId = params.id;
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [initialValues, setInitialValues] = useState({});


    const onFinish = async(values) => {
        setLoading(true)
      
       try {
        const response  = await dispatch(updateCoupons({couponId,values}));
        if(response.payload){
            message.success("Kupon müvəffəqiyyətlə yeniləndi!")
            form.resetFields()
        } else {
            message.error("Kupon yenilənirkən bir xəta ilə qarşılaşdı!")
        }
       } catch (error) {
        console.log("Kupon yeniləmə xətası");
       } finally {
        setLoading(false);
       }
    }
   

      useEffect(() => {
        const restFethcSignleCoupon = async (values) => {
            setLoading(true);
            try {
              const response = await dispatch(updateCoupons({couponId,values}));
              if (!response.payload) {
                throw new Error("Dataları getirme xətası")
              } 
              const data = response.payload;
              if(data){
                const {code, discountPercent} = data;
                form.setFieldsValue({
                    code: code,
                    discountPercent: discountPercent,
                });
                setInitialValues({
                    code,
                    discountPercent
                })
              }
              
            } catch (error) {
              throw error
            } finally {
              setLoading(false);
            }
          };
          restFethcSignleCoupon();
      }, [couponId, dispatch, form])
  return (
    <Spin spinning={loading}>
        <Form 
        form={form} 
        name="basic" 
        layout="vertical" 
        autoComplete="off" 
        onFinish={onFinish}>
    <Form.Item
      label="Koupon İsmi"
      name="code"
      rules={[
        {
          required: true,
          message: "Lütfen bir koupon kodu girin!",
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Kategori Görseli (Link)"
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
      Güncelle
    </Button>
  </Form>
    </Spin>
  )
}

export default UpdateCouponPage

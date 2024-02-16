import { Spin, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import api from "../../components/api/Auth.services"
import axios from 'axios';
const OrderPage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const MY_STRIPE_SECRET_KEY = import.meta.env.VITE_API_STRIPE_SECRET_KEY
    const columns = [
        {
            title: "Müştəri Email",
            dataIndex: "receipt_email",
            key:"receipt_email"
            // render: (imgSrc) => <img src={imgSrc} alt='Image' width={100} />
        },
        {
            title: "Sipariş Qiyməti",
            dataIndex: "amount",
            key: "amount",
            render: (record) => <b>${(record / 100).toFixed(2)}</b>
        }
    ]

    useEffect(() => {
     const fethData = async() => {
        setLoading(true);

        try {
          const response = await axios.get("https://api.stripe.com/v1/payment_intents",{
            headers: {
                Authorization: `Bearer ${MY_STRIPE_SECRET_KEY}`,
            }
          }
          );

          if(response){
            //Eger gelen datanin icerisinde yene data varsa birde data.data yazmaq yerine 
            //skopun icerisinde bir defe data yazmaq yeterlidir
            const {data} = response.data;
            setDataSource(data);
          } else {
            message.error("Veri getirme başarısız.");
          }
        } catch (error) {
            console.log("Veri hatası:", error);

        } finally {
            setLoading(false)
        }
     }
     fethData();
    }, [MY_STRIPE_SECRET_KEY])

    console.log(dataSource);
    return (

        <Spin spinning={loading}>
             <Table
                dataSource={dataSource}
                columns={columns}
                rowKey={(record) => record._id}
                loading={loading}
            />
        </Spin>
    )
}

export default OrderPage

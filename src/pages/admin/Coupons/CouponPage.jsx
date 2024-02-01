import React, { useEffect, useState, useCallback } from 'react'
import { Button, Popconfirm, Table, Space } from 'antd';
// import { deleteUsers, fetchUsers } from '../../../redux/slices/users.lice';
import { useDispatch } from 'react-redux';
import { message } from "antd";
import { deleteCategory, fetchCategory } from '../../../redux/slices/category.slice';
import { useNavigate } from 'react-router-dom';
import { deleteCoupon, fetchCoupon } from '../../../redux/slices/coupon.slice';



const CouponPage = () => {

    const [dataSoruce, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const columns = [
        {
            title: "Kupon Kodu",
            dataIndex: "code",
            key: "code",
            render: (code) => (
               <b>{code}</b>
            )
        },
        {
            title: "İndirim Oranı",
            dataIndex: "discountPercent",
            key: "discountPercent",
            render: (text) => <span>%{text}</span>
        },
    
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
    
                <Space size="large">
                    <Button type='primary' onClick={() => navigate(`/admin/coupons/update/${record._id}`)}>
                        Duzenle
                    </Button>
                    <Popconfirm
                        title="İstifadəçini sil"
                        description="İstifadəçini silmək istədiyinizdən əminsiniz mi?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => restFetchDeleteCoupon(record._id)}
                    >
                        <Button danger>Sil</Button>
                    </Popconfirm>
                </Space>
    
            )
        },
    
    ];
    const restFetchCoupon = useCallback(async () => {
        setLoading(true);
        try {
            const response = await dispatch(fetchCoupon());
            if (response.payload) {
                setDataSource(response.payload);
            } else {
                message.error("Məlumatlar gəlmədi!")
            }

        } catch (error) {
            throw error
        } finally {
            setLoading(false);
        }
    }, [dispatch]);
    
    const restFetchDeleteCoupon = async (couponId) => {
        try {
            const response = await dispatch(deleteCoupon(couponId));
            if (response.payload) {
                message.success("Kupon müvəffəqiyyətlə silindi!")
                restFetchCoupon();
            } else {
                message.error("Silmə xətası!")
            }

        } catch (error) {
            throw error
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        restFetchCoupon()
    }, [restFetchCoupon,])




 
    return (

        <Table
            dataSource={dataSoruce}
            columns={columns}
            rowKey={(record) => record._id}
            loading={loading}
        />

    )
}

export default CouponPage

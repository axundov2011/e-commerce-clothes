import React, { useEffect, useState, useCallback } from 'react'
import { Button, Popconfirm, Table, Space } from 'antd';
// import { deleteUsers, fetchUsers } from '../../../redux/slices/users.lice';
import { useDispatch } from 'react-redux';
import { message } from "antd";
import { deleteCategory, fetchCategory } from '../../../redux/slices/category.slice';
import { useNavigate } from 'react-router-dom';



const CategoryPage = () => {

    const [dataSoruce, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const columns = [
        {
            title: "Kategory Gorseli",
            dataIndex: "img",
            key: "img",
            render: (imgSrc) => (
                <img
                    src={imgSrc}
                    alt="Image"
                    width={100}
                />
            )
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            return: () => <b>{text}</b>
        },
    
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, record) => (
    
                <Space size="large">
                    <Button type='primary' onClick={() => navigate(`/admin/categories/update/${record._id}`)}>
                        Duzenle
                    </Button>
                    <Popconfirm
                        title="İstifadəçini sil"
                        description="İstifadəçini silmək istədiyinizdən əminsiniz mi?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => restFetchDeleteCategory(record._id)}
                    >
                        <Button danger>Sil</Button>
                    </Popconfirm>
                </Space>
    
            )
        },
    
    ];
    const restFetchCategory = useCallback(async () => {
        setLoading(true);
        try {
            const response = await dispatch(fetchCategory());
            if (response.payload) {
                setDataSource(response.payload);
            } else {
                message.error("Məlumatlar gəlmədi!")
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    const restFetchDeleteCategory = async (categoryId) => {
        try {
            const response = await dispatch(deleteCategory(categoryId));
            if (response.payload) {
                message.success("İstifadəçi müvəffəqiyyətlə silindi!")
                restFetchCategory();
            } else {
                message.error("Silmə xətası!")
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    console.log(dataSoruce);
    useEffect(() => {
        restFetchCategory()
    }, [restFetchCategory,])




 
    return (

        <Table
            dataSource={dataSoruce}
            columns={columns}
            rowKey={(record) => record._id}
            loading={loading}
        />

    )
}

export default CategoryPage

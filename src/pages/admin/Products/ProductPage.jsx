import React, { useEffect, useState, useCallback } from 'react'
import { Button, Popconfirm, Table, Space } from 'antd';
// import { deleteUsers, fetchUsers } from '../../../redux/slices/users.lice';
import { useDispatch } from 'react-redux';
import { message } from "antd";
import {fetchCategory } from '../../../redux/slices/category.slice';
import { useNavigate } from 'react-router-dom';
import { deleteProducts, fetchProducts } from '../../../redux/slices/product.slice';



const ProductPage = () => {

    const [dataSoruce, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const columns = [
        {
          title: "Product Görseli",
          dataIndex: "img",
          key: "img",
          
          render: (imgSrc) => (
            console.log("imgSrc:", imgSrc),
            <img src={imgSrc[0]} alt="Image" width={100} />
          ),
        },
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          render: (text) => <b>{text}</b>,
        },
        {
          title: "Kategori",
          dataIndex: "categoryName",
          key: "categoryName",
          render: (text) => <span>{text}</span>,
        },
        {
          title: "Fiyat",
          dataIndex: "price",
          key: "price",
          render: (text) => <span>{text && text.current.toFixed(2)}</span>,
        },
        {
          title: "İndirim",
          dataIndex: "price",
          key: "price",
          render: (text) => <span>%{text && text.discount}</span>,
        },
        {
          title: "Actions",
          dataIndex: "actions",
          key: "actions",
          render: (_, record) => (
            <Space>
              <Button
                type="primary"
                onClick={() => navigate(`/admin/products/update/${record._id}`)}
              >
                Düzenle
              </Button>
              <Popconfirm
                title="Kategoriyi Sil"
                description="Kategoriyi silmek istediğinizden emin misiniz?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => deleteProduct(record._id)}
              >
                <Button type="primary" danger>
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          ),
        },
      ];
    useEffect(() => {
        const restFetchProduct = async () => {
            setLoading(true);
            try {
                //Birden cox promise islemi etmek istediyimiz de Promiseni bu sekilde yaziriq
                const [categoriesResponse, productsResponse] = await Promise.all([
                    dispatch(fetchCategory()),
                    dispatch(fetchProducts()),
                ]);
    
                if (!categoriesResponse.payload || !productsResponse.payload) {
                    message.error("Veri getirme başarısız.");
                }
    
                const [categoriesData, productsData] = [categoriesResponse.payload, productsResponse.payload];
                console.log("productsData:", productsData);
    
                const productsWithCategories = productsData.map((product) => {
                    const categoryId = product.category;
                    const category = categoriesData.find(
                        (item) => item._id === categoryId
                    );
                    return {
                        ...product,
                        categoryName: category ? category.name : "",
                    };
                });
    
                setDataSource(productsWithCategories);
    
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        restFetchProduct();
    }, [dispatch]);

    const deleteProduct = async (productId) => {
        try {
            const response = await dispatch(deleteProducts(productId));
            if (response.payload) {
                message.success("İstifadəçi müvəffəqiyyətlə silindi!")
                //Bele oldugunda silennen sora UI de guncellemis oluruq
                setDataSource((prev) => prev.filter((product) =>product._id !== productId));
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


    return (

        <Table
            dataSource={dataSoruce}
            columns={columns}
            rowKey={(record) => record._id}
            loading={loading}
        />

    )
}

export default ProductPage

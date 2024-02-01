import CategoryItem from "./CategoryItem"
import "./Categories.css"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCategory } from "../../redux/slices/category.slice";
import { message } from "antd";

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
const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
  
    useEffect(() => {
        const restFetchCategory = async () => {
            setLoading(true);
            try {
                const response = await dispatch(fetchCategory());
                if (response.payload) {
                    setCategories(response.payload);
                } else {
                    message.error("Məlumatlar gəlmədi!")
                }

            } catch (error) {
           throw error
            } finally {
                setLoading(false);
            }
        };
        restFetchCategory();
    }, [dispatch])
    return (
        <div>
            <section className="categories">
                <div className="container">
                    <div className="section-title">
                        <h2>All Categories</h2>
                        <p>Summer Collection New Morden Design</p>
                    </div>
                    <ul className="category-list">
                        {
                            categories && categories.map((category) => (
                                <CategoryItem key={category._id} category={category} />

                            ))
                        }
                    </ul>
                </div>
            </section>
        </div>
    )
}

export default Categories

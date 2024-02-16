import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Statistic, message } from "antd";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import axios from 'axios';
import api from "../components/api/Auth.services"
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/slices/product.slice';
const DashboardPage = () => {
    const [produtcs, setProducts] = useState([]);
    const [allDataSource, setAllDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const MY_STRIPE_SECRET_KEY = import.meta.env.VITE_API_STRIPE_SECRET_KEY

    const totalRevenue = allDataSource.reduce((total, item) => total + item.amount, 0);

    useEffect(() => {
        const fetchAllProducts = async () => {

            try {
                const response = await dispatch(fetchProducts());

                if (response.payload) {
                    setProducts(response.payload);
                    message.success("Məlumatlar gəldi")
                } else {
                    message.warning("Məlumatlar gəlmədi")
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchAllProducts();

    }, [dispatch])

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
                setAllDataSource(data);
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
   console.log(allDataSource, 'allDataSource');
    console.log(produtcs, 'produtcs');
    const productSalesData = [
        { name: "Ocak", satilanUrunSayisi: allDataSource.length },
        { name: "Şubat", satilanUrunSayisi: allDataSource.length },
        { name: "Mart", satilanUrunSayisi: allDataSource.length },
        { name: "Nisan", satilanUrunSayisi: allDataSource.length },
        { name: "Mayıs", satilanUrunSayisi: allDataSource.length },
        { name: "Haziran", satilanUrunSayisi: allDataSource.length },
    ];

    const customerData = [
        { name: "Ocak", musteriSayisi: allDataSource.length },
        { name: "Şubat", musteriSayisi: allDataSource.length },
        { name: "Mart", musteriSayisi: allDataSource.length },
        { name: "Nisan", musteriSayisi: allDataSource.length },
        { name: "Mayıs", musteriSayisi: allDataSource.length },
        { name: "Haziran", musteriSayisi: allDataSource.length },
    ];
    return (
        <div>
            <Row gutter={16}>
            <Col span={8}>
                    <Card>
                        <Statistic title="Toplam Ürün Satışı" value={allDataSource && allDataSource.length} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="Toplam Müşteri Sayısı" value={allDataSource && allDataSource.length} />
                    </Card>
                </Col>
              
                <Col span={8}>
                    <Card>
                        <Statistic title="Toplam Gelir" value={totalRevenue} prefix="$" />
                    </Card>
                </Col>
            </Row>
            <Card style={{ marginTop: "20px" }}>
                <h2>Son Aydaki Ürün Satış Artışı</h2>
                <LineChart
                    width={600}
                    height={600}
                    data={productSalesData}
                    margin={{ top: 5, right: 30, bottom: 5 }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="satilanUrunSayisi"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </Card>
            <Card style={{ marginTop: "20px" }}>
                <h2>Son Aydaki Müşteri Artışı</h2>
                <LineChart
                    width={600}
                    height={300}
                    data={customerData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="musteriSayisi"
                        stroke="#82ca9d"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </Card>
        </div>
    )
}

export default DashboardPage

import { Button, Result } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setCartItems } from '../redux/slices/cart.slice'

const Success = () => {
    // const cartItems = useSelector((state) => state.cart.cart);
     const dispatch = useDispatch();
    useEffect(() => {
        //Burada sebeti temizleyirik
     dispatch(setCartItems([]))
    },[dispatch])
  return (
    <div className='success-page'> 
<Result
    status="success"
    title="Ödəniş uğurlu oldu!"
    subTitle="Sifarişiniz uğurla tamamlandı"
    extra={[
      <Link to={"/"} key="home">
         <Button type="primary" key="console">
       Ana səhifə
       
        </Button>
      </Link>,
      <Link to={"/admin/orders"} key="home">
         <Button type="primary" key="buy">
       Sifarişlərim
       
        </Button>
      </Link>,
    ]}
  />    </div>
  )
}

export default Success

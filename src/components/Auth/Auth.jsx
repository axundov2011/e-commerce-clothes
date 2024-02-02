import Login from "./Login"
import Register from "./Register"
import "./Auth.css"
import UpdateAccount from "./UpdateAccount"
const Auth = () => {
    const userToken = localStorage.getItem("userToken");
    
    return (
        <div>
            <section className="account-page">
                <div className="container">
                    <div className="account-wrapper">
                       {userToken ? <UpdateAccount/> : <Login/>}
                       {!userToken && <Register/>}
                    </div>
                </div>
            </section>    </div>
    )
}

export default Auth

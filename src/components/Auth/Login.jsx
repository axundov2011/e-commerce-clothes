import React from "react";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spin, message } from "antd";
import { fetchLogin, fetchUsers} from "../../redux/slices/Auth.slice";
import { useForm } from 'react-hook-form';

const Login = () => {
    // const [formData, setFormData] = useState({
    //     email: "",
    //     password: "",
    // });

    // const auth = useSelector(selecthAuth);
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    // const handleLogin = async (e) => {
    //     e.preventDefault();

    //     try {
    //       const authLogin = await dispatch(fetchLogin(formData));

    //       if (authLogin && authLogin) {
    //         const data = await authLogin.payload;
    //        
    //         localStorage.setItem("user", JSON.stringify(data));
    //         message.success("Giriş başarılı.");
    //         navigate("/");
    //     } else {
    //         message.error("Giriş başarısız");
    //     }
    //     } catch (error) {
    //       console.error("Giriş sırasında hata:", error);
    //     }
    //   };
    const [isSubmitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
  
    const restUsers = async (values) => {
        setLoading(true)
        try {
          setSubmitting(true);
      
          // Dispatch login action
          const loginData = await dispatch(fetchLogin(values));
      
          if (!loginData.payload) {
            message.error("Daxil olmaq ugursuz oldu!");
          }
      
          // Check if token is present in the response
          if ("token" in loginData.payload) {
            const userToken = loginData.payload.token;
            const userRole = loginData.payload.role;
      
            window.localStorage.setItem("userToken", userToken);
            window.localStorage.setItem("userRole", userRole);
      
            // Redirect based on user role
            if (userRole === "admin") {
              navigate("/admin");
            } else {
              navigate("/admin");
            }
            message.success("Sehifeye daxil oldunuz :)");
          }
      
          // Fetch user data after successful login
          const userData = await dispatch(fetchUsers(values));
      
          if ('user' in userData.payload) {
            const user = userData.payload.user;
            console.log('User:', user);
            window.localStorage.setItem('user', JSON.stringify(user));
          }
        } catch (error) {
          console.error("Error during login:", error);
        } finally {
          setSubmitting(false);
          setLoading(false);
        }
      };
  
    const loginOptions = {
        name: { required: "Name is required" },
        email: { required: "Email is required" },
        password: {
            required: "Password is required",
            minLength: {
                value: 5,
                message: "Password must have at least 8 characters"
            }
        }
    };


    return (
        <div className="account-column">
            <h2>Login</h2>
           <Spin spinning={loading}>
           <form onSubmit={handleSubmit(restUsers)}>
                <div>
                    <label>
                        <span>Username or email address <span className="required">*</span></span>
                        <input
                            type="text"
                            name="email"
                            required
                            {...register('email', loginOptions.email)}
                        />
                        <small className='text-danger'>
                            {errors?.email && errors.email.message}
                        </small>
                    </label>
                </div>
                <div>
                    <label>
                        <span>Password <span className="required">*</span></span>
                        <input
                            type="password"
                            name="password"
                            required
                            {...register('password', loginOptions.password)}
                        />
                        <small className="text-danger">
                            {errors?.password && errors.password.message}
                        </small>
                    </label>
                </div>
                <p className="remember">
                    <label>
                        <input type="checkbox" />
                        <span>Remember me</span>
                    </label>
                    <button className="btn btn-sm" disabled={isSubmitting}>
                        {isSubmitting ? 'Login': 'Login'}
                    </button>
                </p>
                <a href="#" className="form-link">Lost your password?</a>
            </form>
           </Spin>
        </div>
    )
}

export default Login

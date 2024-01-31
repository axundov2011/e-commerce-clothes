import React from "react";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { fetchLogin} from "../../redux/slices/Auth.slice";
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
    //         console.log(data);
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
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
  
    const restUsers = async (values) => {
        try {
            setSubmitting(true);
            const data = await dispatch(fetchLogin(values));

            if (!data.payload) {
                message.error("Daxil olmaq ugursuz oldu!")
            }

            if ("token" in data.payload) {
                const userToken = data.payload.token;
                const userRole = data.payload.role;
                
                window.localStorage.setItem("userToken", data.payload.token);
                window.localStorage.setItem("userRole", userRole);

               if(userRole === "admin"){
                navigate("/admin");
               } else {
                navigate("/");
               }
                message.success("Sehifeye daxil oldunuz :)")
            }
        } catch (error) {
            throw error
            setSubmitting(false);
        }
    }
  
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
            <form onSubmit={handleSubmit(restUsers)}>
                <div>
                    <label>
                        <span>Username or email address <span className="required">*</span></span>
                        <input
                            type="text"
                            name="email"
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
        </div>
    )
}

export default Login

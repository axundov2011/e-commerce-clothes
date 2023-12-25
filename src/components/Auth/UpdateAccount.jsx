import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { upDatePassword, } from "../../redux/slices/Auth.slice";
import { useForm } from 'react-hook-form';

const Login = () => {
    const [isSubmitting, setSubmitting] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const changePasswordAccount = async (values) => {
        try {
            setSubmitting(true);
            const data = await dispatch(upDatePassword(values));

            if (!data.payload) {
                message.error("Daxil olmaq ugursuz oldu!")
            } else if (data.payload && "token" in data.payload) {
                window.localStorage.setItem("userToken", data.payload.token);
                console.log('Token saklandı:', data.payload.token);
                navigate("/");
                message.success("Sehifeye daxil oldunuz :)")
            } else {
                // data.payload tanımlı ancak "token" özelliğine sahip değilse
                message.error("Beklenmeyen cevap formatı");
            }
        } catch (error) {
            console.log(error);
            setSubmitting(false);
        }
    }

    const loginOptions = {
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
            <h2>UpdateAccount</h2>
            <form onSubmit={handleSubmit(changePasswordAccount)}>
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
                        {isSubmitting ? 'Login' : 'Login'}
                    </button>
                </p>
                <a href="#" className="form-link">Lost your password?</a>
            </form>
        </div>
    )
}

export default Login

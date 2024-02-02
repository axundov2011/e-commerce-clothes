import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { fetchRegister, fetchUsers, selecthAuth } from "../../redux/slices/Auth.slice";
import { useForm } from 'react-hook-form';
const Register = () => {
    // const [formData, setFormData] = useState({
    //     username: "",
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

    // const handleRegister = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const resData = await dispatch(fetchRegister(formData));

    //         if (resData) {
    //             const data = await resData;
    //             localStorage.setItem("user", JSON.stringify(data));
    //             message.success("Kayıt başarılı.");
    //             navigate("/");
    //         } else {
    //             message.error("Kayıt başarısız");
    //         }
    //     } catch (error) {
    //         console.error("Kayıt sırasında hata:", error);
            
    //     }
    // };

    const [isSubmitting, setSubmitting] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit, formState:{errors}} = useForm()

    
   
    const restFetchRegister = async (values) => {
        try {
          const data = await dispatch(fetchRegister(values));
      
          if (!data.payload) {
            return message.error('Qeydiyyat uğursuz oldu!');
          }
      
          if ('token' in data.payload) {
            const userToken = data.payload.token;
            window.localStorage.setItem('userToken', userToken);
           
            const userRole = data.payload.role || "user";
            window.localStorage.setItem("userRole", userRole)
             
            if(userRole === "admin"){
                navigate("/admin");
            } else {
                navigate("/");
            }
                
            message.success('Qeydiyyat uğurlu oldu');
          } else {
            message.error('Bu qeydiyyatdan keçib');
          }
      
          // Fetch user data after successful registration
          const userData = await dispatch(fetchUsers(values));
      
          if ('user' in userData.payload) {
            const user = userData.payload.user;
            console.log('User:', user);
            window.localStorage.setItem('user', JSON.stringify(user));
          }
        } catch (error) {
          console.error('Error during registration:', error);
          message.error('Qeydiyyat sırasında bir hata oluştu');
        }
      };

    const registerOptions = {
        username: {required: 'username is required'},
        email: {required: 'email is  required'},
        password:{
          required:"Password is required",
          minLength: {
            value: 5,
            message: "Password must have at least 8 characters"
          }
        }
      };



  return (
    <div className="account-column">
    <h2>Register</h2>
    <form onSubmit={handleSubmit(restFetchRegister)}>
        <div>
            <label>
                <span>Username <span className="required">*</span></span>
                <input 
                type="text" 
                name="username" 
                {...register('username', registerOptions?.name)}
                />
                <small className="text-danger">
                 {errors?.username && errors?.username.message}
                </small>
            </label>
        </div>
        <div>
            <label>
                <span>Email address <span className="required">*</span></span>
                <input 
                type="email" 
                name="email" 
                {...register('email', registerOptions?.email)}                
                />
                <small className="text-danger">
                    {errors?.email && errors?.email.message}
                </small>
            </label>
        </div>
        <div>
            <label>
                <span>Password <span className="required">*</span></span>
                <input 
                type="password" 
                name="password" 
                {...register('password', registerOptions?.password)}
                />
                <small className="text-denger">
                    {errors?.password && errors?.password.message}
                </small>
            </label>
        </div>
        <div className="privacy-policy-text remember">
            <p>
                Your personal data will be used to support your experience throughout this website, to
                manage access to your account, and for other purposes described in our <a
                    href="#">privacy policy.</a>
            </p>
            <button className="btn btn-sm" disabled={isSubmitting}>
                {isSubmitting ? 'Registering' : 'Register'}
            </button>
        </div>

    </form>
</div>
  )
}

export default Register

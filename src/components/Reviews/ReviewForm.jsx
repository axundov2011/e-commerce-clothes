import axios from "axios";
import { useState } from "react"
import api from "../../components/api/Auth.services"
import { useDispatch } from "react-redux";
import UpdateProductPage from "../../pages/admin/Products/UpdateProductPage";
import { message } from "antd";
const ReviewForm = ({singleProduct, setSignleProduct}) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const dispatch = useDispatch();
    const userTokenFromLocalStorage = localStorage.getItem("userToken");
    const user = userTokenFromLocalStorage ? { userToken: userTokenFromLocalStorage } : null;
   



    const handleChangeStars = (e, newRating) => {
      e.preventDefault();
      setRating(newRating);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const formData = {
            
            reviews: [
              ...singleProduct.reviews,
              {
                text: review,
                rating: parseInt(rating),
                user: user.id,
              },
            ],
          };
      
        try {
          const data = await api.put(`/products/${singleProduct._id}`,formData); 
          console.log('Response from server:', data?.data);
          if (data?.data) {
            setSignleProduct(data?.data);
            setRating(0);
            setReview("");
            message.success("Yorum başarıyla eklendi");
          }
        } catch (error) {
          message.error("Bir şeyler yanlış gitti");
        }
      
        console.log(formData);
        console.log(singleProduct,'singleProduct');
      };


  return (
    <div>
          <form className="comment-form" onSubmit={handleSubmit}>
                    <p className="comment-notes">
                        Your email address will not be published. Required fields are marked
                        <span className="required">*</span>
                    </p>
                    <div className="comment-form-rating">
                        <label>
                            Your rating
                            <span className="required">*</span>
                        </label>
                        <div className="stars">
                            <a href="#" className={`star ${rating === 1 && "active"}`} onClick={(e) => handleChangeStars(e, 1) }>
                                <i className="bi bi-star-fill"></i>
                            </a>
                            <a href="#" className={`star ${rating === 2 && "active"}`} onClick={(e) => handleChangeStars(e, 2)}>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                            </a>
                            <a href="#" className={`star ${rating === 3 && "active"}`} onClick={(e) => handleChangeStars(e, 3)}>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                            </a>
                            <a href="#" className={`star ${rating === 4 && "active"}`} onClick={(e) => handleChangeStars(e, 4)}>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                            </a>
                            <a href="#" className={`star ${rating === 5 && "active"}`} onClick={(e) => handleChangeStars(e, 5)}>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                            </a>
                        </div>
                    </div>
                    <div className="comment-form-comment form-comment">
                        <label htmlFor="comment">
                            Your review
                            <span className="required">*</span>
                        </label>
                        <textarea id="comment" cols="50" rows="10" onChange={(e) => setReview(e.target.value)} value={review}></textarea>
                    </div>
                
                    <div className="comment-form-cookies">
                        <input id="cookies" type="checkbox" />
                        <label htmlFor="cookies">
                            Save my name, email, and website in this browser for the next time I
                            comment.
                            <span className="required">*</span>
                        </label>

                    </div>
                    <div className="form-submit">
                        <input type="submit" className="btn submit" />
                    </div>
                </form>
    </div>
  )
}

export default ReviewForm

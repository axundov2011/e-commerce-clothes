import { Fragment, useEffect, useState } from "react"
import ReviewForm from "./ReviewForm"
import ReviewItem from "./ReviewItem"
import "./Reviews.css"
import { message } from "antd"
import { useDispatch } from "react-redux"
import { fetchUsers } from "../../redux/slices/auth.slice"
const Reviews = ({ active, singleProduct, setSignleProduct }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    // const thisReview = [];
   

    useEffect(() => {
        const restFetchUser = async () => {
            setLoading(true);
            try {
              const response = await dispatch(fetchUsers());
              if (response.payload) {
                setUsers(response.payload);
              } else {
                message.error("Məlumatlar gəlmədi!")
              }
        
            } catch (error) {
              throw error
            }
          };

          restFetchUser();
    }, [dispatch])

    console.log(users,'users');

  //  singleProduct.reviews.forEach((review) => {
  //   const matchingUsers = users?.filter((user) => user.userToken  === review.user);

  //   matchingUsers.forEach((matchingUser) => {
  //     thisReview.push({
  //       review: review,
  //       user: matchingUser,
  //     });
  //   });
  //  });

   const usersMap = users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
   }, {});

   const thisReview = singleProduct.reviews.map((review) => {
    const user = usersMap[review.user];
    return {
      review: review,
      user: user || null,
    }
   })
   
    return (
        <div className={`tab-panel-reviews ${active}`}>
            <h3>2 reviews for Basic Colored Sweatpants With Elastic Hems</h3>
            {singleProduct.reviews.length > 0 ? (
                    <div className="comments">
                        <ol className="comment-list">
                            <>
                            {thisReview && thisReview.map((item, index) => (
                                <ReviewItem key={index} item={item} reviewItem={item} />))}
                            </>

                        </ol>
                    </div>
            ) : (
                <h3>Hiç yorum yok</h3>
            )}

            <div className="review-form-wrapper">
                <h2>Add a review</h2>
                <ReviewForm singleProduct={singleProduct} setSignleProduct={setSignleProduct} />
            </div>

        </div>
    )
}

export default Reviews

import { Fragment } from "react"
import ReviewForm from "./ReviewForm"
import ReviewItem from "./ReviewItem"
import "./Reviews.css"
const Reviews = ({ active, singleProduct, setSignleProduct }) => {
    return (
        <div className={`tab-panel-reviews ${active}`}>
            <h3>2 reviews for Basic Colored Sweatpants With Elastic Hems</h3>
            {singleProduct.reviews.length > 0 ? (
                    <div className="comments">
                        <ol className="comment-list">
                            <>
                            {singleProduct.reviews && singleProduct.reviews.map((review, index) => (
                                <ReviewItem key={index} review={review} revieItem={review} singleProduct={singleProduct}  setSignleProduct={setSignleProduct}/>))}
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

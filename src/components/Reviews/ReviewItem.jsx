

const ReviewItem = ({ reviewItem}) => {
    const {review, user} = reviewItem
    const {text, createdAt, rating} = review
   
 
    //Bir yorumun gonderilme tarixini backendden cekmek
    const options = {year: "numeric", month: "long", day: "numeric"}
    const formattedDate = new Date(createdAt).toLocaleDateString("tr-TR", options)
  return (
    <div>
        <li className="comment-item">
                        <div className="comment-avatar">
                            <img src={user?.avatar} width={60} height={60} alt="" />
                        </div>
                        <div className="comment-text">
                            <ul className="comment-star">
                                {/*Burada ulduzlarin sayini ayarlayiriq
                                 Eger misal 5 ulduz vermisikse hemin status
                                 5 ulduzlu olacaq
                                */}
                               {Array.from(({length: rating}), (_, index) => {
                                return (
                                    <li key={index}>
                                    <i className="bi bi-star-fill"></i>
                                </li>
                                )
                               })}
                            
                            </ul>
                            <div className="comment-meta">
                                <strong>{user?.username}</strong>
                                <span>-</span>
                                <time>{formattedDate}</time>
                            </div>
                            <div className="comment-description">
                                <p>{text}</p>
                            </div>
                        </div>
                    </li>
    </div>
  )
}

export default ReviewItem

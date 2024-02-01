

const ReviewItem = ({singleProduct, revieItem}) => {
    console.log(revieItem, 'revieItem');

    const {text, createdAt} = revieItem

    //Bir yorumun gonderilme tarixini backendden cekmek
    const formattedDate = new Date(createdAt).toLocaleDateString("AZE")
  return (
    <div>
        <li className="comment-item">
                        <div className="comment-avatar">
                            <img src="/img/avatars/avatar1.jpg" alt="" />
                        </div>
                        <div className="comment-text">
                            <ul className="comment-star">
                                <li>
                                    <i className="bi bi-star-fill"></i>
                                </li>
                                <li>
                                    <i className="bi bi-star-fill"></i>
                                </li>
                                <li>
                                    <i className="bi bi-star-fill"></i>
                                </li>
                                <li>
                                    <i className="bi bi-star-fill"></i>
                                </li>
                                <li>
                                    <i className="bi bi-star-fill"></i>
                                </li>
                            </ul>
                            <div className="comment-meta">
                                <strong>{singleProduct?.name}</strong>
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

import BlogItem from "./BlogItem"
import "./Blogs.css"
const Blogs = () => {
    return (
        <div>
            <section className="blogs">
                <div className="container">
                    <div className="section-title">
                        <h2>From Our Blog</h2>
                        <p>Summer Collection New Morden Design</p>
                    </div>
                    <ul className="blog-list">
                        <BlogItem />
                        <BlogItem />
                        <BlogItem />
                    </ul>
                </div>
            </section>
        </div>
    )
}

export default Blogs

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BlogList = () => {
    const blogs = useSelector((state) => state.blogs);
    const blogComponents = blogs.map((blog) => (
        <div key={blog.id} style={{border: "1px solid black", margin: "5px", padding: "5px"}}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> by {blog.author}
        </div>
    ));

    return <div>{blogComponents}</div>;
};

export default BlogList;

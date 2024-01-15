import { useState } from 'react'

const Blog = ({ blog }) => {
  const [detailVisible, setDetailVisible] = useState(false)
  const showWhenOpen = { display: detailVisible ? '' : 'none' }

  const toggleDetail = () => setDetailVisible(!detailVisible)
  console.log(blog)

  const blogDiv = {
    border: 'solid 2px',
    margin: '10px auto',
    padding: '5px'
  }

  const blogP = {
    display: 'inline-block',
    margin: '5px 10px 5px 0'
  }

  const block = { display: 'block' }

  return (
    <div style={blogDiv}>
      <p style={blogP}>&apos;{blog.title}&apos; by {blog.author}</p>
      <div style={showWhenOpen}>
        <a href={blog.url} style={block}>{blog.url}</a>
        <p style={blogP}>likes: {blog.likes}</p>
        <button>Like</button><br/>
        <p style={blogP}>Added by {blog.creator.username}</p>
      </div>
      <button onClick={toggleDetail}>{detailVisible ? 'Hide' : 'View'}</button>
    </div>  
  )
}

export default Blog
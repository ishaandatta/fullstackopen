import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, username, fetchBlogs }) => {

  const [view, setView] = useState(false)

  const toggleView = () => {
    setView(!view)
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      const resp = await blogService.remove(blog.id)
      fetchBlogs()
      console.log(resp)
    }
  }

  const like = async() => {
    const obj = {
      title:blog.title,
      author:blog.author,
      url:blog.url,
      likes:blog.likes+1
    }
    const resp = await blogService.update(blog.id, obj)
    console.log(resp)
    // blog.likes=blog.likes+1
    fetchBlogs()
  }

  // const showWhenVisible = { display : view ? '': 'none' }
  // const hideWhenVisible = { display : view ? 'none': '' }
  const showIfCreator = { display : (blog.user.username === username) ? '' : 'none' }

  return (
    <div className='blog'>
      { view ? (
        // <div style={showWhenVisible}>
        <div>
          {blog.title} {blog.author} <br></br>
          {blog.url} <br></br>
          {blog.likes} Likes
          <button onClick={like}>like</button>
          <br></br>
          {blog.user === null ? '' : blog.user.username}
          <br></br>
          <button onClick={toggleView}>hide</button>
          <button style={showIfCreator} onClick={handleRemove}>remove</button>
        </div> )
        : (
          // <div style={hideWhenVisible}>
          <div>
            {blog.title} {blog.author} <br></br>
            <button onClick={toggleView}>view</button>
            <button style={showIfCreator} onClick={handleRemove}>remove</button>
          </div>
        )}
    </div>
  )
}

export default Blog
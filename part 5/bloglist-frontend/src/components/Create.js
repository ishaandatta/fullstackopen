import { useState } from 'react'
import blogService from '../services/blogs'

const CreateForm = (props) => {
  const { blogs, setBlogs, setMessage, setErrorMessage, fetchBlogs } = props

  const [title, setTitle] = useState([])
  const [author, setAuthor] = useState([])
  const [url, setUrl] = useState([])

  const handleCreate = async(event) => {
    event.preventDefault()
    const blogObject = { title:title, author:author, url:url }
    console.log('Creating new blog: ', blogObject)

    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
      //   fetchBlogs()
      //   refe.current.toggleVisible()

      setMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch(exception) {
      fetchBlogs()
      setErrorMessage('Error: ', exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className='createBlogForm'>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
            title: <input id="title" type="text" value={title} name="Title" onChange={ ({ target }) => setTitle(target.value)} /> <br></br>
            author: <input id='author' type="text" value={author} name="Author" onChange={ ({ target }) => setAuthor(target.value)} /> <br></br>
            url: <input id='url' type="text" value={url} name="Url" onChange={ ({ target }) => setUrl(target.value)} /> <br></br>
        <button id='create' type="submit">create</button>

      </form>

    </div>
  )
}


export default CreateForm
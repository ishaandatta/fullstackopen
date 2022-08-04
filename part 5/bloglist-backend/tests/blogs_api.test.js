const { toLength, split } = require('lodash')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

let user = { username:"testuser", name:"testuser", password:"abc123" }
let token

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: "ishaan",
    url: "abc.com",
    likes: 3
  },
  {
    title: 'Browser can execute only Javascript',
    author: "ishaan",
    url: "def.com",
    likes: 12
  },
  {
    title: 'Testing testing',
    author: "JEST",
    url: "jest.com"
  }
]


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()

  await User.deleteMany({})
  // let userObject = new User(user)

  let userResp = await api.post('/api/users').send(user)
  // console.log(JSON.stringify(userResp))

  let resp = await api.post('/api/login').send({username: "testuser", password: "abc123"})
  token = resp.body.token

})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)


test('there are three blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(3)
}, 100000)


test('the first blog is a test blog', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].title).toBe('HTML is easy')
}, 100000)


test('documents have id field', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
}, 100000)

test('Documents without likes specified have default 0', async () => {
  const response = await api.get('/api/blogs')
  const checkArr = response.body.map(b => {
    expect(b.likes).toBeDefined()
    return b.likes
  })
  // console.log(checkArr)

}, 100000)

test('New blog can be added', async () => {
  
  const blog = {
    title: "POST Test",
    author: "ishaan",
    url: "ishaan.datta.com",
    likes: 20
  }

  await api.post('/api/blogs')
  .send(blog)
  .set({'authorization': `bearer ${token}`})
  .expect(201).expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  const body = response.body.map(r => r.title)

  expect(response.body).toHaveLength(4)
  expect(body).toContain("POST Test")

  // expect(response.status).toBe()
})

test('Missing fields validation', async () => {

  const blog = {
    // title: "asd",
    author: "Missing Title",
    url: "ishaan.datta.com",
    likes: 77
  }
  
  await api
  .post('/api/blogs')
  .send(blog)
  .set({'authorization': `bearer ${token}`})
  .expect(400)

  const b = {
    title: "Missing URL",
    author: "ishaan datta",
    // url: "fd",
    likes: 78
  }

  await api
  .post('/api/blogs')
  .send(b)
  .set({'authorization': `bearer ${token}`})
  .expect(400)

  const x = await api.get('/api/blogs')
  console.log("After adding:", x.body)

})


test('Delete a post', async () => {

  const tmp = {
    title: "TEST DELETE",
    author: "FUNCTION",
    url: "NODE.JS",
    likes: 100
  }
  
  await api
  .post('/api/blogs')
  .set({'authorization': `bearer ${token}`})
  .send(tmp)

  let blog = await api.get('/api/blogs')
  blog = blog.body.find(b => b.title === 'TEST DELETE')
  
  await api
  .delete('/api/blogs/'+blog.id)
  .set({'authorization': `bearer ${token}`})
  .expect(200)

  blog = await api.get('/api/blogs')
  expect(blog.body).toHaveLength(initialBlogs.length)
  console.log("After delete: ", blog.body)

})

test('Update validation', async () => {

  let tmp = {
    title: "TEST UPDATE",
    author: "FUNCTION",
    url: "NODE.JS",
    likes: 29
  }

  await api
  .post('/api/blogs')
  .send(tmp)
  .set({'authorization': `bearer ${token}`})


  let blog = await api.get('/api/blogs')
  console.log("Before Update: ", blog.body)

  blog = blog.body.find(b => b.title === 'TEST UPDATE')
  blog.title = "UPDATED!!!!"
  blog.likes = blog.likes+10

  await api
  .put('/api/blogs/'+blog.id)
  .send(blog)
  .set({'authorization': `bearer ${token}`})
  .expect(200)
  
  blog = await api.get('/api/blogs')
  expect(blog.body).toHaveLength(initialBlogs.length+1)
  console.log("After Update: ", blog.body)

})

afterAll(() => {
  mongoose.connection.close()
})












// const listHelper = require('../utils/list_helper')


// test('Dummy test', () => {
//     const blogs = []

//     expect(listHelper.dummy(blogs)).toBe(1)
// })


// describe('Total likes', () => {

//     test('For empty list is zero', () => {
//         const blogs = []
//         expect(listHelper.totalLikes(blogs)).toBe(0)
//     })

//     test('For list size of 1 result is its number of likes', () => {
//         const blogs = [{
//             title: "Title",
//             author: "Test case creator",
//             url: "jest.services.com",
//             likes: 7
//         }]

//         expect(listHelper.totalLikes(blogs)).toBe(7)
//     })

//     test('For bigger lists result is correct', () => {
//         const blogs = [{
//             title: "blog 1",
//             author: "Test case creator",
//             url: "jest.services.com",
//             likes: 2
//         },
//         {
//             title: "blog 2",
//             author: "Test case creator",
//             url: "jest.services.com",
//             likes: 3
//         },
//         {
//             title: "blog 3",
//             author: "Test case creator",
//             url: "jest.services.com",
//             likes: 11
//         }]

//         expect(listHelper.totalLikes(blogs)).toBe(16)
//     })

//     test('Get favourite blog', () => {
//         const blogs = [{
//             title: "blog 1",
//             author: "Test case creator",
//             url: "jest.services.com",
//             likes: 2
//         },
//         {
//             title: "blog 2",
//             author: "Test case creator",
//             url: "jest.services.com",
//             likes: 3
//         },
//         {
//             title: "blog 3",
//             author: "Test case creator",
//             url: "jest.services.com",
//             likes: 11
//         }]

//         expect(listHelper.favouriteBlog(blogs).title).toBe("blog 3")
//     })

//     test('Get author with most blogs', () => {
//         const blogs = [{
//             title: "blog 1",
//             author: "JEST",
//             url: "jest.services.com",
//             likes: 2
//         },
//         {
//             title: "blog 2",
//             author: "ishaan",
//             url: "jest.services.com",
//             likes: 3
//         },
//         {
//             title: "blog 3",
//             author: "ishaan",
//             url: "jest.services.com",
//             likes: 11
//         }]

//         expect(listHelper.mostBlogs(blogs)[0]).toBe("ishaan")
//     })

//     test('Get author with most likes', () => {
//         const blogs = [{
//             title: "blog 1",
//             author: "JEST",
//             url: "jest.services.com",
//             likes: 2
//         },
//         {
//             title: "blog 2",
//             author: "ishaan",
//             url: "jest.services.com",
//             likes: 3
//         },
//         {
//             title: "blog 3",
//             author: "ishaan",
//             url: "jest.services.com",
//             likes: 11
//         }]

//         expect(listHelper.mostLikes(blogs).author).toBe("ishaan")
//     })

// })



